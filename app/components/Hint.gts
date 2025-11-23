import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { PhInfo, PhLightbulb } from 'ember-phosphor-icons';
import type QuizService from 'japanese-conjugation-practice-ember/services/quiz';

interface Signature {
  Args: never;
  Blocks: { default: [] };
}

export class Hint extends Component<Signature> {
  @service declare quiz: QuizService;
  @tracked showHint: boolean = false;

  closeModal = () => {
    this.showHint = false;
  };

  <template>
    <button class="btn btn-info mt-3" type="button" onclick="hint.showModal()">
      Show hint
      <PhLightbulb @size="1.5rem" @weight="duotone" />
    </button>
    <dialog id="hint" class="modal modal-bottom">
      <div class="modal-box">
        <PhInfo @size="1.5em" class="text-info mb-2" />
        <h3 class="text-lg font-bold">{{this.quiz.hintText.rule}}</h3>
        <ul class="list">
          <li class="list-row">{{this.quiz.hintText.step1}}</li>
          <li class="list-row">{{this.quiz.hintText.step2}}</li>
          {{#if this.quiz.hintText.step3}}
            <li class="list-row">{{this.quiz.hintText.step3}}</li>
          {{/if}}
          <li class="list-row"><span class="font-bold">Example:</span>
            {{this.quiz.hintText.example}}</li>
        </ul>
        <div class="modal-action">
          <form method="dialog">
            <button type="submit" class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </template>
}
