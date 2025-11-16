import { pageTitle } from 'ember-page-title';
import { TopBar } from 'japanese-conjugation-practice-ember/components/TopBar.gts';

<template>
  {{pageTitle "Japanese Conjugation Practice"}}
  <div class="min-h-screen bg-base-200">
    <TopBar />
    <main>
      {{outlet}}
    </main>
  </div>
</template>
