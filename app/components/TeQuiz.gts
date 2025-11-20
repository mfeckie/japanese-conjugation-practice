import { service } from '@ember/service';
import Component from '@glimmer/component';
import type QuizService from 'japanese-conjugation-practice-ember/services/quiz';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import PhInfo from 'ember-phosphor-icons/components/ph-info';
import PhLightbulb from 'ember-phosphor-icons/components/ph-lightbulb';
import { KanaInput } from './KanaInput.gts';
import type { InputStateService } from 'japanese-conjugation-practice-ember/services/input-state-service';

export class TeQuiz extends Component {
  @service declare quiz: QuizService;
  @service declare inputStateService: InputStateService;

  handleEnter = (value: string) => {
    const isCorrect = this.quiz.teForm == value;

    if (isCorrect) {
      this.inputStateService.correctAnswer();
    } else {
      this.inputStateService.incorrectAnswer();
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
      <h4 class="text-3xl">Convert to て form</h4>
      <button class="btn btn-warning text-base-100" type="button">
        Show hint
        <PhLightbulb @size="1.5rem" @weight="duotone" />
      </button>
      <KanaInput @onEnter={{this.handleEnter}} />
    </div>
  </template>
}

const VerbInfo: TemplateOnlyComponent<{ verbType?: string }> = <template>
  <div class="badge badge-md badge-accent py-4 rounded-full">
    <PhInfo @size="1.5em" />
    <span class="inline-flex items-center capitalize">{{@verbType}}</span>
  </div>
</template>;
