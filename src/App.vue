<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">日本語 て形練習</h1>
        <p class="text-xl text-gray-600 mb-4">Japanese Te-Form Practice</p>
        <div class="flex justify-center gap-4 text-sm">
          <div class="bg-white px-4 py-2 rounded-lg shadow">
            <span class="font-semibold text-green-600"
              >正解: {{ gameState.correctAnswers }}</span
            >
          </div>
          <div class="bg-white px-4 py-2 rounded-lg shadow">
            <span class="font-semibold text-blue-600"
              >試行: {{ gameState.totalAttempts }}</span
            >
          </div>
          <div class="bg-white px-4 py-2 rounded-lg shadow">
            <span class="font-semibold text-purple-600">
              正解率:
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
      <div class="bg-white rounded-xl shadow-xl p-8 mb-6">
        <div v-if="gameState.currentVerb" class="space-y-6">
          <!-- Verb Display -->
          <div class="text-center">
            <div class="mb-4">
              <span
                class="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                :class="getVerbTypeColor(gameState.currentVerb.type)"
              >
                {{ gameState.currentVerb.type.toUpperCase() }}
              </span>
            </div>
            <div class="text-6xl font-bold text-gray-800 mb-2 japanese-font">
              {{ gameState.currentVerb.kanji }}
            </div>
            <div class="text-2xl text-gray-600 mb-1">
              {{ gameState.currentVerb.hiragana }}
            </div>
            <div class="text-lg text-gray-500 mb-2">
              ({{ gameState.currentVerb.romaji }})
            </div>
            <div class="text-base text-gray-700">
              {{ gameState.currentVerb.meaning }}
            </div>
          </div>

          <!-- Question -->
          <div class="text-center">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
              Convert to て-form (te-form):
            </h2>

            <!-- Answer Input -->
            <div class="max-w-md mx-auto">
              <input
                v-model="gameState.userAnswer"
                @keyup.enter="checkUserAnswer"
                @input="clearResults"
                type="text"
                class="w-full text-2xl text-center p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none japanese-font"
                :class="{
                  'border-green-500 bg-green-50': gameState.isCorrect === true,
                  'border-red-500 bg-red-50': gameState.isCorrect === false,
                }"
                placeholder="Enter て-form here..."
                :disabled="gameState.isCorrect === true"
              />

              <!-- Check Answer Button -->
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
              class="bg-green-100 border-l-4 border-green-500 p-4 rounded"
            >
              <div class="text-2xl font-bold text-green-800 mb-2">
                ✅ 正解！ (Correct!)
              </div>
              <div class="text-lg text-green-700">
                {{ gameState.currentVerb.hiragana }} →
                {{ gameState.currentVerb.teForm }}
              </div>
            </div>

            <div
              v-else
              class="bg-red-100 border-l-4 border-red-500 p-4 rounded"
            >
              <div class="text-2xl font-bold text-red-800 mb-2">
                ❌ 間違い (Incorrect)
              </div>
              <div class="text-lg text-red-700 mb-2">
                Your answer:
                <span class="font-semibold">{{ gameState.userAnswer }}</span>
              </div>
              <div class="text-lg text-red-700 mb-4">
                Correct answer:
                <span class="font-semibold japanese-font">{{
                  gameState.currentVerb.teForm
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
                class="bg-blue-50 p-4 rounded-lg text-left"
              >
                <h4 class="font-semibold text-blue-800 mb-2">
                  Rule Explanation:
                </h4>
                <p class="text-blue-700 mb-3">
                  {{ getExplanation(gameState.currentVerb) }}
                </p>

                <div class="text-sm text-blue-600">
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
                <p class="text-yellow-800">
                  Please type the correct answer to continue:
                  <strong class="japanese-font">{{
                    gameState.currentVerb.teForm
                  }}</strong>
                </p>
              </div>
            </div>
          </div>

          <!-- Next Button -->
          <div v-if="gameState.isCorrect" class="text-center">
            <button
              @click="nextVerb"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
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

      <!-- Info Section -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          About Te-Form (て-form)
        </h3>
        <div class="grid md:grid-cols-3 gap-6 text-sm">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-semibold text-blue-800 mb-2">Ichidan Verbs</h4>
            <p class="text-blue-700">Simply replace る with て</p>
            <p class="text-blue-600 text-xs mt-1">Example: 食べる → 食べて</p>
          </div>

          <div class="bg-green-50 p-4 rounded-lg">
            <h4 class="font-semibold text-green-800 mb-2">Godan Verbs</h4>
            <p class="text-green-700">Follow specific ending patterns</p>
            <p class="text-green-600 text-xs mt-1">Example: 読む → 読んで</p>
          </div>

          <div class="bg-red-50 p-4 rounded-lg">
            <h4 class="font-semibold text-red-800 mb-2">Irregular Verbs</h4>
            <p class="text-red-700">Must be memorized individually</p>
            <p class="text-red-600 text-xs mt-1">Example: する → して</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue"
import type { GameState } from "./types"
import { verbs } from "./data"
import {
  getRandomVerb,
  checkAnswer,
  getExplanation,
  getVerbTypeColor,
  getVerbTypeDescription,
} from "./utils"

const gameState = reactive<GameState>({
  currentVerb: null,
  userAnswer: "",
  isCorrect: null,
  showExplanation: false,
  score: 0,
  totalAttempts: 0,
  correctAnswers: 0,
})

function nextVerb() {
  gameState.currentVerb = getRandomVerb(verbs)
  gameState.userAnswer = ""
  gameState.isCorrect = null
  gameState.showExplanation = false
}

function clearResults() {
  if (gameState.isCorrect !== null) {
    gameState.isCorrect = null
    gameState.showExplanation = false
  }
}

function checkUserAnswer() {
  if (!gameState.currentVerb || !gameState.userAnswer.trim()) {
    return
  }

  const isCorrect = checkAnswer(gameState.currentVerb, gameState.userAnswer)
  gameState.isCorrect = isCorrect
  gameState.totalAttempts++

  if (isCorrect) {
    gameState.correctAnswers++
    gameState.score += 10
  }
}

onMounted(() => {
  nextVerb()
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap");

.japanese-font {
  font-family: "Noto Sans JP", sans-serif;
}

input.japanese-font::placeholder {
  font-family: "Noto Sans JP", sans-serif;
}
</style>
