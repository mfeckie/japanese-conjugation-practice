import Component from '@glimmer/component';
import * as wanakana from 'wanakana';
import { modifier } from 'ember-modifier';
import { service } from '@ember/service';
import type { StateService } from 'japanese-conjugation-practice-ember/services/state-service';
import { on } from '@ember/modifier';
import { PhCheckFat } from 'ember-phosphor-icons';

type InputEvent = (event: Event) => void;

const wanakanaModifier = modifier(
  (
    element: HTMLInputElement,
    [onKeyup, inputService]: [InputEvent, StateService]
  ) => {
    wanakana.bind(element);

    inputService.input = element;

    element.addEventListener('keydown', () => {
      element.classList.remove('animate-shake');
      element.classList.remove('input-error');
    });
    element.addEventListener('keyup', onKeyup);

    return () => {
      wanakana.unbind(element);
    };
  }
);

interface Signature {
  Args: {
    onEnter: (value: string) => void;
  };
}

export class KanaInput extends Component<Signature> {
  @service declare stateService: StateService;

  onKeyup = async (event: Event) => {
    this.stateService.reset();
    if ((event as KeyboardEvent).key === 'Enter') {
      const input = event.target as HTMLInputElement;
      if (input.value.trim() === '') {
        return;
      }
      this.args.onEnter(input.value);
    }
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
  };

  <template>
    <form class="relative" {{on "submit" this.handleSubmit}}>
      <label for="answer">
        {{! template-lint-disable no-autofocus-attribute }}
        <input
          id="answer"
          name="answer"
          class="input input-bordered input-lg w-full max-w-xs text-center text-2xl"
          type="text"
          autofocus
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          placeholder="Type here"
          {{wanakanaModifier this.onKeyup this.stateService}}
        />
      </label>
      {{#if this.stateService.showSuccess}}
        <PhCheckFat
          @size="42"
          class="text-success absolute right-2.5 top-1 z-10 bg-base-100 dark:bg-base-200"
        />
      {{/if}}
    </form>
  </template>
}
