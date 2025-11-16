import { service } from '@ember/service';
import Component from '@glimmer/component';
import type QuizService from 'japanese-conjugation-practice-ember/services/quiz';

export class TeQuiz extends Component {
  @service declare quiz: QuizService;

  <template>
    <p>{{this.quiz.remainingQuestions}} verbs remaining</p>
    <p>Question {{this.quiz.currentQuestion.hiragana}}</p>
  </template>
}
