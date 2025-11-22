import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ScoreService extends Service {
  @tracked correctAnswers = 0;
  @tracked questionsAnswered = 0;
  @tracked incorrectAnswers = 0;

  resetScore() {
    this.correctAnswers = 0;
    this.questionsAnswered = 0;
    this.incorrectAnswers = 0;
  }

  incrementCorrect() {
    this.correctAnswers++;
  }
  incrementIncorrect() {
    this.incorrectAnswers++;
  }
  incrementAnswered() {
    this.questionsAnswered++;
  }
}
