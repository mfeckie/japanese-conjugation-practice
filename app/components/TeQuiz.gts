import { service } from '@ember/service';
import Component from '@glimmer/component';
import type QuizService from 'japanese-conjugation-practice-ember/services/quiz';
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import PhInfo from 'ember-phosphor-icons/components/ph-info';

export class TeQuiz extends Component {
  @service declare quiz: QuizService;

  <template>
    <div>
      <VerbInfo @verbType={{this.quiz.currentQuestion.type}} />
    </div>
  </template>
}

const VerbInfo: TemplateOnlyComponent<{ verbType?: string }> = <template>
  <div class="badge badge-md badge-accent py-4">
    {{! <span class="phosphor-info"></span> }}
    <PhInfo @size="1.5em" />
    <span class="inline-flex items-center capitalize">{{@verbType}}</span>
  </div>
</template>;
