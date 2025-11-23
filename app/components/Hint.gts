import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import { PhInfo, PhLightbulb } from 'ember-phosphor-icons';
import type Owner from '@ember/owner';
import type StateService from 'japanese-conjugation-practice-ember/services/state-service';
import { service } from '@ember/service';

interface Signature {
  Blocks: { default: [] };
}

export class Hint extends Component<Signature> {
  @tracked showHint: boolean = false;
  @service declare stateService: StateService;

  constructor(owner: Owner, args: Signature['Args']) {
    super(owner, args);

    this.stateService.closeHint = this.closeHint;
  }

  toggleHint = () => {
    this.showHint = !this.showHint;
  };

  closeHint = () => {
    this.showHint = false;
  };

  <template>
    <button
      class="btn btn-info mt-3"
      type="button"
      {{on "click" this.toggleHint}}
    >
      Show hint
      <PhLightbulb @size="1.5rem" @weight="duotone" />
    </button>
    {{#if this.showHint}}
      <div class="alert alert-info shadow-lg mt-4 md:max-w-1/2">
        <PhInfo @size="1.5em" />
        <div>
          <span class="text-xl">
            {{yield}}
          </span>
        </div>
      </div>
    {{/if}}
  </template>
}
