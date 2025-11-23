import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import {
  PhArrowBendDownLeft,
  PhCheckCircle,
  PhXCircle,
} from 'ember-phosphor-icons';
import type ScoreService from 'japanese-conjugation-practice-ember/services/score-service';

export class Score extends Component {
  @service declare scoreService: ScoreService;

  <template>
    <div class="flex border border-secondary rounded-md py-2 px-4 gap-2">
      <div class="flex items-center text-success font-bold h-6">
        <span class="pb-0.5">{{this.scoreService.correctAnswers}}</span>
        <PhCheckCircle class="ml-2" />
      </div>
      <div class="border-l"></div>
      <div class="flex items-center text-error font-bold h-6">
        <span class="pb-0.5">{{this.scoreService.incorrectAnswers}}</span>
        <PhXCircle class="ml-2" />
      </div>
    </div>
    <div class="ml-2">
      <button
        class="btn btn-neutral btn-square btn-sm"
        title="Reset score"
        type="button"
        {{on "click" this.scoreService.resetScore}}
      >
        <PhArrowBendDownLeft />
      </button>
    </div>
  </template>
}
