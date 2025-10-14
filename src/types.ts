export type VerbType = "ichidan" | "godan" | "irregular"

export interface Verb {
  kanji: string
  hiragana: string
  romaji: string
  type: VerbType
  teForm: string
  meaning: string
  endingGroup?: string // For godan verbs (u, ku, gu, su, tsu, nu, bu, mu, ru)
}

export interface ConjugationRule {
  pattern: string
  replacement: string
  description: string
}

export interface GameState {
  currentVerb: Verb | null
  userAnswer: string
  isCorrect: boolean | null
  showExplanation: boolean
  score: number
  totalAttempts: number
  correctAnswers: number
}

export interface TeFormRules {
  ichidan: ConjugationRule
  irregular: { [key: string]: ConjugationRule }
  godan: { [key: string]: ConjugationRule }
}
