import { ContentWrapper } from 'japanese-conjugation-practice-ember/components/ContentWrapper.gts';
import { TeQuiz } from 'japanese-conjugation-practice-ember/components/TeQuiz.gts';

const page = <template>
  <ContentWrapper>
    <:title>て Form Quiz</:title>
    <:body>
      <TeQuiz />
    </:body>
  </ContentWrapper>
</template>;

export default page;
