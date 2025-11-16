import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type QuizService from 'japanese-conjugation-practice-ember/services/quiz';

export default class TeFormRoute extends Route {
  @service declare quiz: QuizService;
  beforeModel() {
    this.quiz.setupVerbs();
  }
}
