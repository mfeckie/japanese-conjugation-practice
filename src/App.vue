<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
    :class="{ 'pb-32': true }" 
  >
    <div class="max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center py-4 md:py-8 mb-4 md:mb-8">
        <h1 class="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
          Japanese Form Practice
        </h1>

        <!-- Mobile Menu Button -->
        <div class="md:hidden mb-4">
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center mx-auto gap-2"
          >
            <span>{{ getCurrentConjugationLabel() }}</span>
            <svg
              :class="{ 'rotate-180': showMobileMenu }"
              class="w-4 h-4 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Mobile Dropdown Menu -->
        <div
          v-if="showMobileMenu"
          class="md:hidden mb-6 bg-white rounded-lg shadow-lg p-4 mx-4"
        >
          <div
            v-for="group in buttonGroups"
            :key="group.label"
            class="mb-4 last:mb-0"
          >
            <div
              class="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-2"
            >
              {{ group.label }}
            </div>
            <div class="grid grid-cols-1 gap-2">
              <button
                v-for="btn in group.items"
                :key="btn.type"
                @click="selectConjugationType(btn.type)"
                :class="[
                  'px-3 py-3 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 text-left',
                  gameState.currentConjugationType === btn.type
                    ? btn.activeClass
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ btn.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop Conjugation Type Selector -->
        <div class="hidden md:block mb-6 space-y-3 text-left">
          <div
            v-for="group in buttonGroups"
            :key="group.label"
            class="bg-gray-200 rounded-lg p-2"
          >
            <div
              class="text-xs font-semibold uppercase tracking-wide text-gray-600 px-1 mb-2"
            >
              {{ group.label }}
            </div>
            <div class="flex flex-wrap gap-1">
              <button
                v-for="btn in group.items"
                :key="btn.type"
                @click="gameState.currentConjugationType = btn.type"
                :aria-pressed="gameState.currentConjugationType === btn.type"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500',
                  gameState.currentConjugationType === btn.type
                    ? btn.activeClass
                    : 'bg-white text-gray-700 hover:bg-gray-300',
                ]"
              >
                {{ btn.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Stats - Compact on Mobile -->
        <div class="flex justify-center gap-2 md:gap-4 text-xs md:text-sm">
          <div class="bg-white px-2 md:px-4 py-1 md:py-2 rounded-lg shadow">
            <span class="font-semibold text-green-600"
              ><span class="hidden sm:inline">Correct: </span>{{ gameState.correctAnswers }}</span
            >
          </div>
          <div class="bg-white px-2 md:px-4 py-1 md:py-2 rounded-lg shadow">
            <span class="font-semibold text-blue-600"
              ><span class="hidden sm:inline">Attempts: </span>{{ gameState.totalAttempts }}</span
            >
          </div>
          <div class="bg-white px-2 md:px-4 py-1 md:py-2 rounded-lg shadow">
            <span class="font-semibold text-purple-600">
              <span class="hidden sm:inline">Accuracy: </span>
              {{
                gameState.totalAttempts > 0
                  ? Math.round(
                      (gameState.correctAnswers / gameState.totalAttempts) * 100
                    )
                  : 0
              }}%
            </span>
          </div>
        </div>
      </div>

      <!-- Game Area -->
      <div class="bg-white rounded-xl shadow-xl p-4 md:p-8 mb-6 md:mb-6">
        <div v-if="gameState.currentVerb" class="space-y-4 md:space-y-6">
          <!-- Verb Display -->
          <div class="text-center">
            <div class="mb-2 md:mb-4">
              <span
                class="inline-block px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium mb-2"
                :class="getVerbTypeColor(gameState.currentVerb.type)"
              >
                {{ gameState.currentVerb.type.toUpperCase() }}
              </span>
            </div>
            <div class="text-4xl md:text-6xl font-bold text-gray-800 mb-2 japanese-font">
              {{ gameState.currentVerb.kanji }}
            </div>
            <div class="text-xl md:text-2xl text-gray-600 mb-1">
              {{ gameState.currentVerb.hiragana }}
            </div>
            <div class="text-sm md:text-lg text-gray-500 mb-2">
              ({{ gameState.currentVerb.romaji }})
            </div>
            <div class="text-sm md:text-base text-gray-700">
              {{ gameState.currentVerb.meaning }}
            </div>
          </div>

          <!-- Question -->
          <div class="text-center">
            <h2 class="text-lg md:text-2xl font-semibold text-gray-800 mb-4">
              Convert to
              {{
                gameState.currentConjugationType === "te-form"
                  ? "て-form (te-form)"
                  : gameState.currentConjugationType === "negative"
                  ? "negative form (～ない)"
                  : gameState.currentConjugationType === "past"
                  ? "past tense (～た)"
                  : gameState.currentConjugationType === "polite"
                  ? "polite form (～ます)"
                  : gameState.currentConjugationType === "past-polite"
                  ? "past polite form (～ました)"
                  : gameState.currentConjugationType === "polite-negative"
                  ? "polite negative form (～ません)"
                  : gameState.currentConjugationType === "past-polite-negative"
                  ? "past polite negative form (～ませんでした)"
                  : "past negative form (～なかった)"
              }}:
            </h2>

            <!-- Hint Section -->
            <div class="mb-4 md:mb-6">
              <button
                @click="gameState.showHint = !gameState.showHint"
                class="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-4"
              >
                {{ gameState.showHint ? "Hide" : "Show" }} Hint 💡
              </button>

              <div
                v-if="gameState.showHint && gameState.currentVerb"
                class="bg-yellow-50 border-l-4 border-yellow-400 p-3 md:p-4 rounded-lg text-left max-w-2xl mx-auto"
              >
                <h4 class="font-semibold text-yellow-800 mb-3 text-sm md:text-base">
                  Step-by-Step Transformation:
                </h4>
                <div class="space-y-2 text-yellow-700">
                  <div class="flex items-start">
                    <span
                      class="font-mono text-xs md:text-sm bg-yellow-200 px-2 py-1 rounded mr-3 leading-tight"
                      >{{
                        getTransformationHint(
                          gameState.currentVerb,
                          gameState.currentConjugationType
                        ).step1
                      }}</span
                    >
                  </div>
                  <div class="flex items-start">
                    <span
                      class="font-mono text-xs md:text-sm bg-yellow-200 px-2 py-1 rounded mr-3 leading-tight"
                      >{{
                        getTransformationHint(
                          gameState.currentVerb,
                          gameState.currentConjugationType
                        ).step2
                      }}</span
                    >
                  </div>
                  <div
                    v-if="
                      getTransformationHint(
                        gameState.currentVerb,
                        gameState.currentConjugationType
                      ).step3
                    "
                    class="flex items-start"
                  >
                    <span
                      class="font-mono text-xs md:text-sm bg-yellow-200 px-2 py-1 rounded mr-3 leading-tight"
                      >{{
                        getTransformationHint(
                          gameState.currentVerb,
                          gameState.currentConjugationType
                        ).step3
                      }}</span
                    >
                  </div>
                </div>
                <div class="mt-3 md:mt-4 p-2 md:p-3 bg-yellow-100 rounded">
                  <div class="font-semibold text-yellow-800 text-xs md:text-sm">Rule:</div>
                  <div class="text-yellow-700 text-xs md:text-sm">
                    {{
                      getTransformationHint(
                        gameState.currentVerb,
                        gameState.currentConjugationType
                      ).rule
                    }}
                  </div>
                </div>
                <div class="mt-2 p-2 md:p-3 bg-yellow-100 rounded">
                  <div class="font-semibold text-yellow-800 text-xs md:text-sm">
                    Example:
                  </div>
                  <div class="text-yellow-600 text-xs md:text-sm font-mono">
                    {{
                      getTransformationHint(
                        gameState.currentVerb,
                        gameState.currentConjugationType
                      ).example
                    }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Input Area -->
            <div class="hidden md:block max-w-md mx-auto">
              <input
                ref="inputRef"
                @keyup.enter="handleEnterKey"
                @keyup="updateGameState"
                @input="filterHiraganaInput"
                type="text"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                class="w-full text-2xl text-center p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none japanese-font"
                :class="{
                  'border-green-500 bg-green-50': gameState.isCorrect === true,
                  'border-red-500 bg-red-50': gameState.isCorrect === false,
                }"
              />

              <!-- Check Answer Button (Desktop) -->
              <button
                @click="checkUserAnswer"
                :disabled="
                  !gameState.userAnswer.trim() || gameState.isCorrect === true
                "
                class="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Check Answer
              </button>
            </div>
          </div>

          <!-- Result -->
          <div v-if="gameState.isCorrect !== null" class="text-center">
            <div
              v-if="gameState.isCorrect"
              class="bg-green-100 border-l-4 border-green-500 p-3 md:p-4 rounded"
            >
              <div class="text-xl md:text-2xl font-bold text-green-800 mb-2">
                ✅ Correct!
              </div>
              <div class="text-base md:text-lg text-green-700">
                {{ gameState.currentVerb.hiragana }} →
                {{
                  getCorrectAnswer(
                    gameState.currentVerb,
                    gameState.currentConjugationType
                  )
                }}
              </div>
            </div>

            <div
              v-else
              class="bg-red-100 border-l-4 border-red-500 p-3 md:p-4 rounded"
            >
              <div class="text-xl md:text-2xl font-bold text-red-800 mb-2">
                ❌ Incorrect
              </div>
              <div class="text-sm md:text-lg text-red-700 mb-2">
                Your answer:
                <span class="font-semibold">{{ gameState.userAnswer }}</span>
              </div>
              <div class="text-sm md:text-lg text-red-700 mb-4">
                Correct answer:
                <span class="font-semibold japanese-font">{{
                  getCorrectAnswer(
                    gameState.currentVerb,
                    gameState.currentConjugationType
                  )
                }}</span>
              </div>

              <!-- Show Explanation Button -->
              <button
                @click="gameState.showExplanation = !gameState.showExplanation"
                class="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mb-4"
              >
                {{ gameState.showExplanation ? "Hide" : "Show" }} Explanation
              </button>

              <!-- Explanation -->
              <div
                v-if="gameState.showExplanation"
                class="bg-blue-50 p-3 md:p-4 rounded-lg text-left"
              >
                <h4 class="font-semibold text-blue-800 mb-2 text-sm md:text-base">
                  Rule Explanation:
                </h4>
                <p class="text-blue-700 mb-3 text-xs md:text-sm">
                  {{ getExplanation(gameState.currentVerb) }}
                </p>

                <div class="text-xs md:text-sm text-blue-600">
                  <strong
                    >{{
                      gameState.currentVerb.type.charAt(0).toUpperCase() +
                      gameState.currentVerb.type.slice(1)
                    }}
                    verbs:</strong
                  >
                  {{ getVerbTypeDescription(gameState.currentVerb.type) }}
                </div>
              </div>

              <!-- Retry prompt -->
              <div
                class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded"
              >
                <p class="text-yellow-800 text-xs md:text-sm">
                  Please type the correct answer to continue:
                  <strong class="japanese-font">{{
                    getCorrectAnswer(
                      gameState.currentVerb,
                      gameState.currentConjugationType
                    )
                  }}</strong>
                </p>
              </div>
            </div>
          </div>

          <!-- Next Button -->
          <div v-if="gameState.isCorrect" class="text-center pb-32 md:pb-0">
            <button
              @click="nextVerb"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 md:px-8 rounded-lg transition-colors text-base md:text-lg"
            >
              Next Verb →
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="text-center py-8">
          <div class="text-xl text-gray-600">Loading next verb...</div>
        </div>
      </div>
    </div>

    <!-- Sticky Bottom Input Area (Mobile) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg safe-area-bottom">
      <div class="p-4">
        <div class="flex gap-3">
          <input
            ref="mobileInputRef"
            @keyup.enter="handleEnterKey"
            @keyup="updateGameState"
            @input="filterHiraganaInput"
            type="text"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            placeholder="Enter answer..."
            class="flex-1 text-lg text-center p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none japanese-font"
            :class="{
              'border-green-500 bg-green-50': gameState.isCorrect === true,
              'border-red-500 bg-red-50': gameState.isCorrect === false,
            }"
          />
          <button
            @click="checkUserAnswer"
            :disabled="
              !gameState.userAnswer.trim() || gameState.isCorrect === true
            "
            class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors whitespace-nowrap"
          >
            ✓
          </button>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import * as wanakana from 'wanakana';
import type { GameState } from './types';

import {
  checkAnswer,
  getCorrectAnswer,
  getExplanation,
  getRandomVerb,
  getTransformationHint,
  getVerbTypeColor,
  getVerbTypeDescription,
} from './utils';

const inputRef = ref<HTMLInputElement | null>(null);
const mobileInputRef = ref<HTMLInputElement | null>(null);
const showMobileMenu = ref(false);

const gameState = reactive<GameState>({
  currentVerb: null,
  currentConjugationType: 'te-form',
  userAnswer: '',
  isCorrect: null,
  showExplanation: false,
  showHint: false,
  score: 0,
  totalAttempts: 0,
  correctAnswers: 0,
});

// Grouped button configuration (ordered logically: Plain, Plain Past, Plain Negative, Plain Past Negative, Polite, Polite Past, Polite Negative, Polite Past Negative)
interface ButtonConfig {
  type: any;
  label: string;
  activeClass: string;
}
interface ButtonGroup {
  label: string;
  items: ButtonConfig[];
}

const buttonGroups: ButtonGroup[] = [
  {
    label: 'Plain',
    items: [
      {
        type: 'te-form',
        label: 'て-form',
        activeClass: 'bg-blue-600 text-white shadow',
      },
      {
        type: 'past',
        label: 'Past (～た)',
        activeClass: 'bg-purple-600 text-white shadow',
      },
      {
        type: 'negative',
        label: 'Negative (～ない)',
        activeClass: 'bg-red-600 text-white shadow',
      },
      {
        type: 'past-negative',
        label: 'Past Negative (～なかった)',
        activeClass: 'bg-orange-700 text-white shadow',
      },
    ],
  },
  {
    label: 'Polite',
    items: [
      {
        type: 'polite',
        label: 'Polite (～ます)',
        activeClass: 'bg-teal-600 text-white shadow',
      },
      {
        type: 'past-polite',
        label: 'Past Polite (～ました)',
        activeClass: 'bg-indigo-700 text-white shadow',
      },
      {
        type: 'polite-negative',
        label: 'Polite Negative (～ません)',
        activeClass: 'bg-rose-600 text-white shadow',
      },
      {
        type: 'past-polite-negative',
        label: 'Past Polite Neg (～ませんでした)',
        activeClass: 'bg-rose-800 text-white shadow',
      },
    ],
  },
];

function getCurrentConjugationLabel(): string {
  const currentType = gameState.currentConjugationType;
  for (const group of buttonGroups) {
    const item = group.items.find((btn) => btn.type === currentType);
    if (item) return item.label;
  }
  return 'Select Form';
}

function selectConjugationType(type: any) {
  gameState.currentConjugationType = type;
  showMobileMenu.value = false;
}

function nextVerb() {
  gameState.currentVerb = getRandomVerb();
  gameState.userAnswer = '';
  gameState.isCorrect = null;
  gameState.showExplanation = false;
  gameState.showHint = false;

  // Clear and focus the appropriate input for the next question
  nextTick(() => {
    const isMobile = window.innerWidth < 768;
    const targetInput = isMobile ? mobileInputRef.value : inputRef.value;

    if (targetInput) {
      targetInput.value = ''; // Clear the input field
      targetInput.focus();
    }
  });
}

function clearResults() {
  if (gameState.isCorrect !== null) {
    gameState.isCorrect = null;
    gameState.showExplanation = false;
  }
}

function filterHiraganaInput() {
  // Clear results when user starts typing again
  clearResults();
}

function updateGameState(event: KeyboardEvent) {
  const target = event.target as HTMLInputElement;

  // Update game state after keyup to ensure wanakana conversion is complete
  gameState.userAnswer = target.value;

  // Sync between mobile and desktop inputs
  const isMobile = window.innerWidth < 768;
  const otherInput = isMobile ? inputRef.value : mobileInputRef.value;
  if (otherInput && otherInput !== target) {
    otherInput.value = target.value;
  }
}

function handleEnterKey() {
  // If we have a correct answer, move to next verb
  if (gameState.isCorrect === true) {
    nextVerb();
    return;
  }

  // Otherwise, check the current answer
  checkUserAnswer();
}

function checkUserAnswer() {
  if (!gameState.currentVerb || !gameState.userAnswer.trim()) {
    return;
  }

  const isCorrect = checkAnswer(
    gameState.userAnswer,
    gameState.currentVerb,
    gameState.currentConjugationType,
  );
  gameState.isCorrect = isCorrect;
  gameState.totalAttempts++;

  if (isCorrect) {
    gameState.correctAnswers++;
    gameState.score += 10;
  }
}

// Remove the watch function that was interfering with romaji input

// Watch for conjugation type changes but KEEP the current verb; just reset answer state
watch(
  () => gameState.currentConjugationType,
  () => {
    // If no current verb yet (initial edge case), fetch one
    if (!gameState.currentVerb) {
      nextVerb();
      return;
    }
    // Otherwise just reset interaction state without changing the verb
    gameState.userAnswer = '';
    gameState.isCorrect = null;
    gameState.showExplanation = false;
    gameState.showHint = false;
    nextTick(() => {
      const isMobile = window.innerWidth < 768;
      const targetInput = isMobile ? mobileInputRef.value : inputRef.value;

      if (targetInput) {
        targetInput.value = '';
        targetInput.focus();
      }
    });
  },
);

onMounted(() => {
  // Ensure browser tab title matches application title
  document.title = 'Japanese Form Practice';
  nextVerb();

  // Setup wanakana for hiragana input on both desktop and mobile inputs
  nextTick(() => {
    if (inputRef.value) {
      // Bind wanakana to convert romaji to hiragana
      wanakana.bind(inputRef.value, { IMEMode: true });
    }
    if (mobileInputRef.value) {
      // Bind wanakana to mobile input too
      wanakana.bind(mobileInputRef.value, { IMEMode: true });
    }

    // Focus the appropriate input based on screen size
    const isMobile = window.innerWidth < 768;
    const targetInput = isMobile ? mobileInputRef.value : inputRef.value;
    if (targetInput) {
      targetInput.focus();
    }
  });
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap");

.japanese-font {
  font-family: "Noto Sans JP", sans-serif;
}

input.japanese-font::placeholder {
  font-family: "Noto Sans JP", sans-serif;
}

/* Safe area handling for mobile devices */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Ensure the mobile input doesn't get covered by virtual keyboard */
@media (max-width: 767px) {
  .min-h-screen {
    min-height: 100vh;
    min-height: 100dvh; /* Use dynamic viewport height on supported browsers */
  }
}

/* Smooth transitions for the mobile menu */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
