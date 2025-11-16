import { pageTitle } from 'ember-page-title';
import { TopBar } from 'japanese-conjugation-practice-ember/components/TopBar.gts';

<template>
  {{pageTitle "Japanese Conjugation Practice"}}
  <div class="min-h-screen bg-base-200">
    <TopBar />
    <main
      class="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:gap-8 lg:grid-cols-2 lg:px-8"
    >
      {{outlet}}
    </main>
  </div>
</template>
