import { on } from '@ember/modifier';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { PhCheckCircle, PhSealQuestion, PhXCircle } from 'ember-phosphor-icons';
import type ScoreService from 'japanese-conjugation-practice-ember/services/score-service';

export class Score extends Component {
  @service declare scoreService: ScoreService;

  <template>
    <div class="flex border border-secondary rounded-md py-2 px-4">
      <div class="flex items-center text-success font-bold h-6">
        <span class="pb-0.5">{{this.scoreService.correctAnswers}}</span>
        <PhCheckCircle class="ml-2" />
        <span class="divider divider-horizontal"></span>
      </div>
      <div class="flex items-center text-error font-bold h-6">
        <span class="pb-0.5">{{this.scoreService.incorrectAnswers}}</span>
        <PhXCircle class="ml-2" />
      </div>
    </div>
    <div class="ml-2">
      <button
        class="btn btn-warning"
        type="button"
        {{on "click" this.scoreService.resetScore}}
      >Reset score</button>
    </div>
  </template>
}
