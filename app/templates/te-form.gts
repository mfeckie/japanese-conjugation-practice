import { QuizCard } from 'japanese-conjugation-practice-ember/components/QuizCard.gts';
import { TeQuiz } from 'japanese-conjugation-practice-ember/components/TeQuiz.gts';

const page = <template>
  <QuizCard>
    <:title>て Form Quiz</:title>
    <:body>
      <TeQuiz />
    </:body>
  </QuizCard>
</template>;

export default page;
