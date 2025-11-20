import Component from '@glimmer/component';
import * as wanakana from 'wanakana';
import { modifier } from 'ember-modifier';
import { service } from '@ember/service';
import type { InputStateService } from 'japanese-conjugation-practice-ember/services/input-state-service';

type InputEvent = (event: Event) => void;

const wanakanaModifier = modifier(
  (
    element: HTMLInputElement,
    [onKeyup, inputService]: [InputEvent, InputStateService]
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
  @service declare inputStateService: InputStateService;

  onKeyup = async (event: Event) => {
    this.inputStateService.reset();
    if ((event as KeyboardEvent).key === 'Enter') {
      const input = event.target as HTMLInputElement;
      this.args.onEnter(input.value);
    }
  };

  <template>
    <label for="answer">Answer</label>
    {{! template-lint-disable no-autofocus-attribute }}
    <input
      id="answer"
      name="answer"
      class="input input-bordered input-lg w-full max-w-xs text-center text-3xl"
      type="text"
      autofocus
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      placeholder="Type here"
      {{wanakanaModifier this.onKeyup this.inputStateService}}
    />
  </template>
}
