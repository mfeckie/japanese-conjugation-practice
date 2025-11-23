import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';
import { Score } from './Score.gts';
export const TopBar = <template>
  <div class="navbar bg-base-100 shadow">
    <div class="navbar-start">
      <div class="dropdown">
        <button
          type="button"
          class="btn btn-ghost"
          aria-label="Toggle menu"
          tabindex="0"
        >
          ☰
        </button>
        <nav
          aria-label="Mobile navigation"
          class="menu menu-sm dropdown-content mt-4 w-60 rounded-box bg-base-100 p-4 shadow"
        >
          <div class="mb-3 border-b border-base-300 pb-2">
            <span
              class="menu-title uppercase tracking-wide text-xs text-base-content/70"
            >Plain</span>
            <ul class="mt-2 space-y-1">
              <Link @route="form" @model="te">て form</Link>
              <Link @route="form" @model="past">た form (past)</Link>
              <Link @route="form" @model="negative">ない form (negative)</Link>
              <li><a class="capitalize" href="#">past negative</a></li>
            </ul>
          </div>
          <div>
            <span
              class="menu-title uppercase tracking-wide text-xs text-base-content/70"
            >Polite</span>
            <ul class="mt-2 space-y-1">
              <li><a class="capitalize" href="#">polite</a></li>
              <li><a class="capitalize" href="#">past</a></li>
              <li><a class="capitalize" href="#">negative</a></li>
              <li><a class="capitalize" href="#">past negative</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <span class="btn btn-ghost text-xl normal-case hidden md:flex">Japanese
        Form Practice</span>
    </div>

    <div class="navbar-end">
      <Score />
    </div>

  </div>
</template>;

interface LinkArgs {
  Args: {
    route: string;
    model?: string;
  };
  Blocks: {
    default: [];
  };
}
const Link: TemplateOnlyComponent<LinkArgs> = <template>
  <li><LinkTo
      class="px-4 py-2 rounded"
      @route={{@route}}
      @model={{@model}}
    >{{yield}}</LinkTo></li>
</template>;
