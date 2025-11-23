import { service } from '@ember/service';
import Component from '@glimmer/component';
import type QuizService from 'japanese-conjugation-practice-ember/services/quiz';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import PhInfo from 'ember-phosphor-icons/components/ph-info';
import { KanaInput } from './KanaInput.gts';
import type { StateService } from 'japanese-conjugation-practice-ember/services/state-service';
import { tracked } from '@glimmer/tracking';
import {
  getExplanation,
  getFormTitle,
} from 'japanese-conjugation-practice-ember/japanese-data/te-form-rules';
import { Hint } from './Hint.gts';
import type ScoreService from 'japanese-conjugation-practice-ember/services/score-service';

export class Quiz extends Component {
  @service declare quiz: QuizService;
  @service declare stateService: StateService;
  @service declare scoreService: ScoreService;

  @tracked showHint: boolean = false;

  handleEnter = async (value: string) => {
    const isCorrect = this.quiz.conjugatedForm == value;

    if (isCorrect) {
      await this.stateService.correctAnswer();
      this.scoreService.incrementCorrect();
      this.scoreService.incrementAnswered();
      this.showHint = false;
    } else {
      this.stateService.incorrectAnswer();
      this.scoreService.incrementIncorrect();
    }

    return isCorrect;
  };
  <template>
    <div class="flex flex-col items-center gap-2">
      <VerbInfo @verbType={{this.quiz.currentQuestion.type}} />
      <h3 class="text-4xl">{{this.quiz.currentQuestion.kanji}}</h3>
      <h4 class="text-2xl text-gray-400">
        {{this.quiz.currentQuestion.hiragana}}
      </h4>
      <h4 class="text-1xl text-gray-400">
        ({{this.quiz.currentQuestion.romaji}})
      </h4>
      <h4 class="text-3xl">
        {{this.quiz.currentQuestion.meaning}}
      </h4>
      <div class="divider"></div>
      <h4 class="text-3xl mb-3">Convert to
        {{getFormTitle this.quiz.formType}}</h4>

      <KanaInput @onEnter={{this.handleEnter}} />
      <Hint>
        {{getExplanation this.quiz.currentQuestion}}
      </Hint>

    </div>
  </template>
}

const VerbInfo: TemplateOnlyComponent<{ verbType?: string }> = <template>
  <div class="badge badge-md badge-accent py-4 rounded-full">
    <PhInfo @size="1.5em" />
    <span class="inline-flex items-center capitalize">{{@verbType}}</span>
  </div>
</template>;
