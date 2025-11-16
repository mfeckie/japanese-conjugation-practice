import Route from '@ember/routing/route';
import { randomVerbs } from 'japanese-conjugation-practice-ember/japanese-data/verbs';

export default class TeFormRoute extends Route {
  model() {
    const shuffledVerbs = randomVerbs();
    return shuffledVerbs;
  }
}
