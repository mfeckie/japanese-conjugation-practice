export type VerbType = "ichidan" | "godan" | "irregular"
export type ConjugationType = "te-form" | "negative" | "past"

export interface Verb {
  kanji: string
  hiragana: string
  romaji: string
  type: VerbType
  teForm: string
  negativeForm?: string
  pastTenseForm?: string // New property for past tense conjugations
  meaning: string
  endingGroup?: string // For godan verbs (u, ku, gu, su, tsu, nu, bu, mu, ru)
}

export interface TransformationHint {
  step1: string
  step2: string
  step3?: string
  rule: string
  example: string
}

export interface ConjugationRule {
  pattern: string
  replacement: string
  description: string
}

export interface GameState {
  currentVerb: Verb | null
  currentConjugationType: ConjugationType
  userAnswer: string
  isCorrect: boolean | null
  showExplanation: boolean
  showHint: boolean
  score: number
  totalAttempts: number
  correctAnswers: number
}

export interface TeFormRules {
  ichidan: ConjugationRule
  irregular: { [key: string]: ConjugationRule }
  godan: { [key: string]: ConjugationRule }
}

export interface NegativeFormRules {
  ichidan: ConjugationRule
  irregular: { [key: string]: ConjugationRule }
  godan: { [key: string]: ConjugationRule }
}
