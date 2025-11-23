import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { PhInfo, PhLightbulb } from 'ember-phosphor-icons';
import type Owner from '@ember/owner';
import type StateService from 'japanese-conjugation-practice-ember/services/state-service';
import { service } from '@ember/service';

interface Signature {
  Args: never;
  Blocks: { default: [] };
}

export class Hint extends Component<Signature> {
  @tracked showHint: boolean = false;
  @service declare stateService: StateService;

  constructor(owner: Owner, args: Signature['Args']) {
    super(owner, args);

    this.stateService.closeHint = this.closeModal;
  }

  showModal = () => {};

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
        <PhInfo @size="1.5em" class="text-info" />
        <div class="mt-4 flex justify-center">
          <span class="text-2xl text-center">
            {{yield}}
          </span>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button type="submit" class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </template>
}
