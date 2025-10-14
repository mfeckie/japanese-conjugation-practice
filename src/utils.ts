import type { Verb, VerbType, TransformationHint } from "./types"
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

export function getTransformationHint(verb: Verb): TransformationHint {
  const { type, hiragana, teForm, endingGroup } = verb

  switch (type) {
    case "ichidan":
      return {
        step1: `1. Identify: ${hiragana} is an ichidan verb (ends in る)`,
        step2: `2. Remove る from ${hiragana}`,
        step3: `3. Add て to get ${teForm}`,
        rule: "Ichidan Rule: Remove る and add て",
        example: `${hiragana} → ${hiragana.slice(0, -1)}て = ${teForm}`
      }

    case "irregular":
      if (hiragana === "する") {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: する → して`,
          rule: "Irregular Rule: する becomes して",
          example: `${hiragana} → ${teForm}`
        }
      } else if (hiragana === "くる") {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: くる → きて`,
          rule: "Irregular Rule: くる becomes きて",
          example: `${hiragana} → ${teForm}`
        }
      } else if (hiragana === "いく") {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: いく → いって`,
          rule: "Irregular Rule: いく becomes いって (special case)",
          example: `${hiragana} → ${teForm}`
        }
      } else if (hiragana.endsWith("する")) {
        return {
          step1: `1. Identify: ${hiragana} is a compound verb with する`,
          step2: `2. Change する to して`,
          rule: "Compound Rule: Replace する with して",
          example: `${hiragana} → ${hiragana.slice(0, -2)}して = ${teForm}`
        }
      } else {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special form: ${teForm}`,
          rule: "Irregular Rule: Must be memorized",
          example: `${hiragana} → ${teForm}`
        }
      }

    case "godan":
      switch (endingGroup) {
        case "mu":
          return {
            step1: `1. Identify: ${hiragana} ends in む (godan verb)`,
            step2: `2. Change む to ん`,
            step3: `3. Add で to get ${teForm}`,
            rule: "む → んで rule (sound convenience: /m/ + て → んで)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`
          }
        
        case "bu":
          return {
            step1: `1. Identify: ${hiragana} ends in ぶ (godan verb)`,
            step2: `2. Change ぶ to ん`,
            step3: `3. Add で to get ${teForm}`,
            rule: "ぶ → んで rule (sound convenience: /b/ + て → んで)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`
          }
        
        case "nu":
          return {
            step1: `1. Identify: ${hiragana} ends in ぬ (godan verb)`,
            step2: `2. Change ぬ to ん`,
            step3: `3. Add で to get ${teForm}`,
            rule: "ぬ → んで rule (sound convenience: /n/ + て → んで)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`
          }
        
        case "ku":
          return {
            step1: `1. Identify: ${hiragana} ends in く (godan verb)`,
            step2: `2. Change く to い`,
            step3: `3. Add て to get ${teForm}`,
            rule: "く → いて rule (consonant removal: /k/ → /i/ + て)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}いて = ${teForm}`
          }
        
        case "gu":
          return {
            step1: `1. Identify: ${hiragana} ends in ぐ (godan verb)`,
            step2: `2. Change ぐ to い`,
            step3: `3. Add で to get ${teForm}`,
            rule: "ぐ → いで rule (consonant removal: /g/ → /i/ + で)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}いで = ${teForm}`
          }
        
        case "su":
          return {
            step1: `1. Identify: ${hiragana} ends in す (godan verb)`,
            step2: `2. Change す to し`,
            step3: `3. Add て to get ${teForm}`,
            rule: "す → して rule (direct substitution)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}して = ${teForm}`
          }
        
        case "tsu":
          return {
            step1: `1. Identify: ${hiragana} ends in つ (godan verb)`,
            step2: `2. Change つ to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: "つ → って rule (double consonant: /t/ + て → って)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`
          }
        
        case "u":
          return {
            step1: `1. Identify: ${hiragana} ends in う (godan verb)`,
            step2: `2. Change う to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: "う → って rule (historical /w/ sound + て → って)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`
          }
        
        case "ru":
          return {
            step1: `1. Identify: ${hiragana} ends in る (godan verb - NOT ichidan!)`,
            step2: `2. Change る to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: "Godan る → って rule (different from ichidan verbs)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`
          }
        
        default:
          return {
            step1: `1. Identify: ${hiragana} is a godan verb`,
            step2: `2. Apply godan conjugation pattern`,
            rule: "Godan Rule: Follow specific ending patterns",
            example: `${hiragana} → ${teForm}`
          }
      }

    default:
      return {
        step1: `1. Analyze the verb: ${hiragana}`,
        step2: `2. Apply appropriate rule`,
        rule: "General conjugation rule",
        example: `${hiragana} → ${teForm}`
      }
  }
}
