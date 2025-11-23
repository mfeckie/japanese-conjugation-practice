import { TrackedArray } from 'tracked-built-ins';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {
  randomVerbs,
  type TransformationHint,
  type Verb,
} from 'japanese-conjugation-practice-ember/japanese-data/verbs';
import {
  deriveTeForm,
  form_types,
  getFormTitle,
  teFormExplanation,
} from 'japanese-conjugation-practice-ember/japanese-data/te-form-rules';
import {
  derivePastTenseForm,
  pastFormExplanation,
} from 'japanese-conjugation-practice-ember/japanese-data/past-form-rules';
import {
  deriveNegativeForm,
  negativeFormExplanation,
} from 'japanese-conjugation-practice-ember/japanese-data/negative-form';

const noHint: TransformationHint = {
  step1: 'No hint available',
  step2: '',
  rule: '',
  example: '',
};

export default class QuizService extends Service {
  @tracked correctAnswers = 0;
  @tracked questionsAnswered = 0;
  @tracked currentQuestion?: Verb;
  @tracked verbs: Verb[] = new TrackedArray();
  @tracked formType: keyof typeof form_types = 'te';

  get remainingQuestions() {
    return this.verbs.length;
  }

  get score() {
    return `${this.correctAnswers} / ${this.questionsAnswered}`;
  }

  reset() {
    this.correctAnswers = 0;
    this.questionsAnswered = 0;
  }

  setupVerbs() {
    const shuffledVerbs = randomVerbs();
    this.verbs = new TrackedArray(shuffledVerbs);
    this.nextQuestion();
  }

  nextQuestion() {
    this.currentQuestion = this.verbs.pop();
  }

  get conjugatedForm() {
    if (!this.currentQuestion) return;

    switch (this.formType) {
      case 'te':
        return deriveTeForm(this.currentQuestion);
      case 'past':
        return derivePastTenseForm(this.currentQuestion);
      case 'negative':
        return deriveNegativeForm(this.currentQuestion);
    }
  }

  get formTitle() {
    return getFormTitle(this.formType);
  }

  get hintText(): TransformationHint {
    if (!this.currentQuestion) return noHint;

    switch (this.formType) {
      case 'te':
        return teFormExplanation(this.currentQuestion);
      case 'past':
        return pastFormExplanation(this.currentQuestion);
      case 'negative':
        return negativeFormExplanation(this.currentQuestion);
      default:
        return noHint;
    }
  }
}
