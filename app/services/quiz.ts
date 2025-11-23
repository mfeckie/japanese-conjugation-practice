import { TrackedArray } from 'tracked-built-ins';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import {
  randomVerbs,
  type Verb,
} from 'japanese-conjugation-practice-ember/japanese-data/verbs';
import { deriveTeForm } from 'japanese-conjugation-practice-ember/japanese-data/form-rules';

export default class QuizService extends Service {
  @tracked correctAnswers = 0;
  @tracked questionsAnswered = 0;
  @tracked currentQuestion?: Verb;
  @tracked verbs: Verb[] = new TrackedArray();
  @tracked formType: string = 'te';

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
    return deriveTeForm(this.currentQuestion);
  }
}
