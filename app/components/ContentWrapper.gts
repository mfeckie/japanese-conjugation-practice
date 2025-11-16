import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface Signature {
  Args: {};
  Blocks: {
    body: [];
    title: [];
  };
}

export const ContentWrapper: TemplateOnlyComponent<Signature> = <template>
  <div class="card card-md card-border bg-base-100 shadow-md">
    <div class="card-title px-4 py-2">{{yield to="title"}}</div>
    <div class="card-body">{{yield to="body"}}</div>
  </div>
</template>;
