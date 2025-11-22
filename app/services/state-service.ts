import Service from '@ember/service';
import type QuizService from './quiz';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export class StateService extends Service {
  @service declare quiz: QuizService;
  input?: HTMLInputElement;
  @tracked showSuccess = false;
  closeHint?: () => void;

  incorrectAnswer() {
    if (!this.input) return;
    this.input.classList.add('input-error');
    this.input.classList.add('animate-shake');
  }
  reset() {
    if (!this.input) return;
    this.input.className =
      'input input-bordered input-lg w-full max-w-xs text-center text-3xl';
  }
  async correctAnswer() {
    if (!this.input) return;
    this.input.classList.add('input-success');
    this.input.classList.add('animate-scale');
    this.showSuccess = true;

    await new Promise((resolve) => setTimeout(resolve, 450));

    this.input.value = '';
    this.quiz.nextQuestion();
    this.reset();
    this.showSuccess = false;
    this.closeHint?.();
  }
}

export default StateService;
