import { pageTitle } from 'ember-page-title';
import { TopBar } from 'japanese-conjugation-practice-ember/components/TopBar.gts';

<template>
  {{pageTitle "Japanese Conjugation Practice"}}
  <TopBar />
  <main
    class="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:gap-8 lg:px-8 h-[calc(100dvh-8rem)]"
  >
    {{outlet}}
  </main>
</template>
