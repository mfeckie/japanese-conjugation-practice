import Service from '@ember/service';
import type QuizService from './quiz';
import { service } from '@ember/service';

export class InputStateService extends Service {
  @service declare quiz: QuizService;
  input?: HTMLInputElement;

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
    this.input.classList.add('animate-correct');
    await new Promise((resolve) => setTimeout(resolve, 200));
    this.input.value = '';
    this.quiz.nextQuestion();
    this.reset();
  }
}

export default InputStateService;
