import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';
import { Score } from './Score.gts';
export const TopBar = <template>
  <div class="navbar bg-base-100 shadow">
    <div class="navbar-start">
      <div class="dropdown">
        <button
          type="button"
          class="btn btn-ghost lg:hidden"
          aria-label="Toggle menu"
          tabindex="0"
        >
          ☰
        </button>
        <nav
          aria-label="Mobile navigation"
          class="menu menu-sm dropdown-content mt-3 w-60 rounded-box bg-base-100 p-4 shadow lg:hidden"
        >
          <div class="mb-3 border-b border-base-300 pb-2">
            <span
              class="menu-title uppercase tracking-wide text-xs text-base-content/70"
            >Plain</span>
            <ul class="mt-2 space-y-1">
              <Link @route="te-form">て form</Link>
              <li><a class="capitalize" href="#">past form</a></li>
              <li><a class="capitalize" href="#">negative</a></li>
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
      <span class="btn btn-ghost text-xl normal-case">Japanese Form Practice</span>
      <Score />
    </div>

    <div class="navbar-center hidden lg:flex">
      <nav
        aria-label="Desktop navigation"
        class="flex items-center gap-10 text-sm"
      >
        <div class="flex items-center gap-3">
          <span
            class="uppercase tracking-wide text-xs text-base-content/70"
          >Plain</span>
          <ul class="flex items-center gap-3">
            <Link @route="te-form">て form</Link>
            <li><a class="link link-hover capitalize" href="#">past form</a></li>
            <li><a class="link link-hover capitalize" href="#">negative</a></li>
            <li><a class="link link-hover capitalize" href="#">past negative</a></li>
          </ul>
        </div>
        <div class="flex items-center gap-3">
          <span
            class="uppercase tracking-wide text-xs text-base-content/70"
          >Polite</span>
          <ul class="flex items-center gap-3">
            <li><a class="link link-hover capitalize" href="#">polite</a></li>
            <li><a class="link link-hover capitalize" href="#">past</a></li>
            <li><a class="link link-hover capitalize" href="#">negative</a></li>
            <li><a class="link link-hover capitalize" href="#">past negative</a></li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>;

interface Link {
  Args: {
    route: string;
  };
  Blocks: {
    default: [];
  };
}
const Link: TemplateOnlyComponent<Link> = <template>
  <li><LinkTo
      class="px-4 py-2 rounded"
      @route={{@route}}
    >{{yield}}</LinkTo></li>
</template>;
