import type { Verb, VerbType } from "./types"
import { teFormRules } from "./data"

export function getRandomVerb(verbs: Verb[]): Verb {
  const randomIndex = Math.floor(Math.random() * verbs.length)
  return verbs[randomIndex]
}

export function checkAnswer(verb: Verb, userAnswer: string): boolean {
  const normalizedUserAnswer = userAnswer.trim().toLowerCase()
  const correctAnswer = verb.teForm.toLowerCase()
  return normalizedUserAnswer === correctAnswer
}

export function getExplanation(verb: Verb): string {
  const { type, hiragana, teForm } = verb

  switch (type) {
    case "ichidan":
      return `${hiragana} is an ichidan verb. ${teFormRules.ichidan.description}. So ${hiragana} becomes ${teForm}.`

    case "irregular":
      const irregularRule = teFormRules.irregular[hiragana]
      if (irregularRule) {
        return `${hiragana} is an irregular verb. ${irregularRule.description}.`
      }
      return `${hiragana} is an irregular verb with a special て-form: ${teForm}.`

    case "godan":
      const endingGroup = verb.endingGroup
      if (endingGroup && teFormRules.godan[endingGroup]) {
        const rule = teFormRules.godan[endingGroup]
        return `${hiragana} is a godan verb. ${rule.description}. So ${hiragana} becomes ${teForm}.`
      }
      return `${hiragana} is a godan verb that becomes ${teForm} in て-form.`

    default:
      return `The て-form of ${hiragana} is ${teForm}.`
  }
}

export function getVerbTypeColor(type: VerbType): string {
  switch (type) {
    case "ichidan":
      return "bg-blue-100 text-blue-800"
    case "godan":
      return "bg-green-100 text-green-800"
    case "irregular":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getVerbTypeDescription(type: VerbType): string {
  switch (type) {
    case "ichidan":
      return "Ichidan verbs (一段動詞) end in る and the syllable before る is in the i-row (い, き, し, etc.) or e-row (え, け, せ, etc.)"
    case "godan":
      return "Godan verbs (五段動詞) can end in various syllables (う, く, ぐ, す, つ, ぬ, ぶ, む, る) and follow specific patterns"
    case "irregular":
      return "Irregular verbs (不規則動詞) have unique conjugation patterns that must be memorized"
    default:
      return ""
  }
}
