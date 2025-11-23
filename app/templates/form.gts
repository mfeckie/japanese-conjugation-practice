import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { ContentWrapper } from 'japanese-conjugation-practice-ember/components/ContentWrapper.gts';
import { Quiz } from 'japanese-conjugation-practice-ember/components/Quiz.gts';

interface Signature {
  Args: {
    model: {
      form_title: string;
    };
  };
  Blocks: {};
}

const page: TemplateOnlyComponent<Signature> = <template>
  <ContentWrapper>
    <:title>{{@model.form_title}}</:title>
    <:body>
      <Quiz />
    </:body>
  </ContentWrapper>
</template>;

export default page;
