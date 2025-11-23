import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type QuizService from 'japanese-conjugation-practice-ember/services/quiz';
import { form_types } from 'japanese-conjugation-practice-ember/japanese-data/te-form-rules';

export default class FormRoute extends Route {
  @service declare quiz: QuizService;
  beforeModel() {
    this.quiz.setupVerbs();
  }

  model(params: { form_type: keyof typeof form_types }) {
    this.quiz.formType = params.form_type;
    return {
      form_title: form_types[params.form_type],
    };
  }
}
