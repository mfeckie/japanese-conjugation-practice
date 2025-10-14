import { verbs, teFormRules, pastTenseRules } from "./data"
import type {
  Verb,
  VerbType,
  TransformationHint,
  ConjugationType,
} from "./types"

export function getRandomVerb(): Verb {
  return verbs[Math.floor(Math.random() * verbs.length)]
}

export function getCorrectAnswer(
  verb: Verb,
  conjugationType: ConjugationType
): string {
  switch (conjugationType) {
    case "te-form":
      return verb.teForm
    case "negative":
      return verb.negativeForm || ""
    case "past":
      return verb.pastTenseForm || ""
    default:
      return ""
  }
}

export function checkAnswer(
  userAnswer: string,
  verb: Verb,
  conjugationType: ConjugationType
): boolean {
  const correctAnswer = getCorrectAnswer(verb, conjugationType)
  return userAnswer.trim() === correctAnswer
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

export function getTransformationHint(
  verb: Verb,
  conjugationType: ConjugationType
): TransformationHint {
  if (conjugationType === "te-form") return getTeFormHint(verb)
  if (conjugationType === "negative") return getNegativeFormHint(verb)
  if (conjugationType === "past") return getPastTenseHint(verb)
  return {
    step1: "Unsupported conjugation type",
    step2: "",
    rule: "",
    example: "",
  }
}

function getTeFormHint(verb: Verb): TransformationHint {
  const { type, hiragana, teForm, endingGroup } = verb

  switch (type) {
    case "ichidan":
      return {
        step1: `1. Identify: ${hiragana} is an ichidan verb (ends in る)`,
        step2: `2. Remove る from ${hiragana}`,
        step3: `3. Add て to get ${teForm}`,
        rule: "Ichidan Rule: Remove る and add て",
        example: `${hiragana} → ${hiragana.slice(0, -1)}て = ${teForm}`,
      }

    case "irregular":
      if (hiragana === "する") {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: する → して`,
          rule: "Irregular Rule: する becomes して",
          example: `${hiragana} → ${teForm}`,
        }
      } else if (hiragana === "くる") {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: くる → きて`,
          rule: "Irregular Rule: くる becomes きて",
          example: `${hiragana} → ${teForm}`,
        }
      } else if (hiragana === "いく") {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: いく → いって`,
          rule: "Irregular Rule: いく becomes いって (special case)",
          example: `${hiragana} → ${teForm}`,
        }
      } else if (hiragana.endsWith("する")) {
        return {
          step1: `1. Identify: ${hiragana} is a compound verb with する`,
          step2: `2. Change する to して`,
          rule: "Compound Rule: Replace する with して",
          example: `${hiragana} → ${hiragana.slice(0, -2)}して = ${teForm}`,
        }
      } else {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special form: ${teForm}`,
          rule: "Irregular Rule: Must be memorized",
          example: `${hiragana} → ${teForm}`,
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
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`,
          }

        case "bu":
          return {
            step1: `1. Identify: ${hiragana} ends in ぶ (godan verb)`,
            step2: `2. Change ぶ to ん`,
            step3: `3. Add で to get ${teForm}`,
            rule: "ぶ → んで rule (sound convenience: /b/ + て → んで)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`,
          }

        case "nu":
          return {
            step1: `1. Identify: ${hiragana} ends in ぬ (godan verb)`,
            step2: `2. Change ぬ to ん`,
            step3: `3. Add で to get ${teForm}`,
            rule: "ぬ → んで rule (sound convenience: /n/ + て → んde)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`,
          }

        case "ku":
          return {
            step1: `1. Identify: ${hiragana} ends in く (godan verb)`,
            step2: `2. Change く to い`,
            step3: `3. Add て to get ${teForm}`,
            rule: "く → いて rule (consonant removal: /k/ → /i/ + て)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}いて = ${teForm}`,
          }

        case "gu":
          return {
            step1: `1. Identify: ${hiragana} ends in ぐ (godan verb)`,
            step2: `2. Change ぐ to い`,
            step3: `3. Add で to get ${teForm}`,
            rule: "ぐ → いで rule (consonant removal: /g/ → /i/ + で)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}いで = ${teForm}`,
          }

        case "su":
          return {
            step1: `1. Identify: ${hiragana} ends in す (godan verb)`,
            step2: `2. Change す to し`,
            step3: `3. Add て to get ${teForm}`,
            rule: "す → して rule (direct substitution)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}して = ${teForm}`,
          }

        case "tsu":
          return {
            step1: `1. Identify: ${hiragana} ends in つ (godan verb)`,
            step2: `2. Change つ to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: "つ → って rule (double consonant: /t/ + て → って)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`,
          }

        case "u":
          return {
            step1: `1. Identify: ${hiragana} ends in う (godan verb)`,
            step2: `2. Change う to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: "う → って rule (historical /w/ sound + て → って)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`,
          }

        case "ru":
          return {
            step1: `1. Identify: ${hiragana} ends in る (godan verb - NOT ichidan!)`,
            step2: `2. Change る to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: "Godan る → って rule (different from ichidan verbs)",
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`,
          }

        default:
          return {
            step1: `1. Identify: ${hiragana} is a godan verb`,
            step2: `2. Apply godan conjugation pattern`,
            rule: "Godan Rule: Follow specific ending patterns",
            example: `${hiragana} → ${teForm}`,
          }
      }

    default:
      return {
        step1: `1. Analyze the verb: ${hiragana}`,
        step2: `2. Apply appropriate rule`,
        rule: "General conjugation rule",
        example: `${hiragana} → ${teForm}`,
      }
  }
}

function getNegativeFormHint(verb: Verb): TransformationHint {
  const { type, hiragana, negativeForm } = verb

  if (!negativeForm) {
    return {
      step1: `1. Negative form for ${hiragana} not available yet`,
      step2: `2. This verb needs negative form data`,
      rule: "Negative form coming soon",
      example: "Data being added progressively",
    }
  }

  switch (type) {
    case "ichidan":
      return {
        step1: `1. Identify: ${hiragana} is an ichidan verb (ends in る)`,
        step2: `2. Remove る from ${hiragana}`,
        step3: `3. Add ない to get ${negativeForm}`,
        rule: "Ichidan Rule: Remove る and add ない",
        example: `${hiragana} → ${hiragana.slice(0, -1)}ない = ${negativeForm}`,
      }

    case "irregular":
      if (hiragana === "する") {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: する → しない`,
          rule: "Irregular Rule: する becomes しない",
          example: `${hiragana} → ${negativeForm}`,
        }
      } else if (hiragana === "くる") {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: くる → こない`,
          rule: "Irregular Rule: くる becomes こない",
          example: `${hiragana} → ${negativeForm}`,
        }
      } else if (hiragana.endsWith("する")) {
        return {
          step1: `1. Identify: ${hiragana} is a compound verb with する`,
          step2: `2. Change する to しない`,
          rule: "Compound Rule: Replace する with しない",
          example: `${hiragana} → ${hiragana.slice(
            0,
            -2
          )}しない = ${negativeForm}`,
        }
      } else {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special form: ${negativeForm}`,
          rule: "Irregular Rule: Must be memorized",
          example: `${hiragana} → ${negativeForm}`,
        }
      }

    case "godan":
      const ending = hiragana.slice(-1)

      return {
        step1: `1. Identify: ${hiragana} is a godan verb (ends in ${ending})`,
        step2: `2. Change ${ending} to あ-sound + ない`,
        step3: `3. Result: ${negativeForm}`,
        rule: "Godan Rule: Change to あ-column + ない",
        example: `${hiragana} → ${negativeForm}`,
      }

    default:
      return {
        step1: `1. Analyze the verb: ${hiragana}`,
        step2: `2. Apply negative conjugation rule`,
        rule: "General negative rule",
        example: `${hiragana} → ${negativeForm}`,
      }
  }
}

function getPastTenseHint(verb: Verb): TransformationHint {
  const { type, hiragana, pastTenseForm, endingGroup } = verb

  if (!pastTenseForm) {
    return {
      step1: `1. Past tense for ${hiragana} not available yet`,
      step2: "2. This verb needs past tense data",
      rule: "Past tense form missing",
      example: "Data being added",
    }
  }

  switch (type) {
    case "ichidan":
      return {
        step1: `1. Identify: ${hiragana} is an ichidan verb (ends in る)`,
        step2: `2. Remove る and add た to get ${pastTenseForm}`,
        rule: "Ichidan past tense: る → た",
        example: `${hiragana} → ${hiragana.slice(0, -1)}た = ${pastTenseForm}`,
      }
    case "irregular":
      if (hiragana === "する") {
        return {
          step1: "1. Identify: する irregular",
          step2: "2. する → した",
          rule: "Irregular: する → した",
          example: `する → した`,
        }
      } else if (hiragana === "くる") {
        return {
          step1: "1. Identify: くる irregular",
          step2: "2. くる → きた",
          rule: "Irregular: くる → きた",
          example: `くる → きた`,
        }
      } else if (hiragana === "いく") {
        return {
          step1: "1. Identify: いく special irregular",
          step2: "2. いく → いった",
          rule: "Special: いく → いった",
          example: `いく → いった`,
        }
      } else if (hiragana.endsWith("する")) {
        return {
          step1: `1. Identify: ${hiragana} is a する compound`,
          step2: `2. Replace する with した`,
          rule: "Compound: する → した",
          example: `${hiragana} → ${hiragana.slice(
            0,
            -2
          )}した = ${pastTenseForm}`,
        }
      } else {
        return {
          step1: `1. Identify: irregular verb`,
          step2: `2. Memorize form: ${pastTenseForm}`,
          rule: "Irregular: must memorize",
          example: `${hiragana} → ${pastTenseForm}`,
        }
      }
    case "godan":
      if (!endingGroup) {
        return {
          step1: `1. Identify: godan verb`,
          step2: `2. Apply ending group rule`,
          rule: "Godan past: use ending rule",
          example: `${hiragana} → ${pastTenseForm}`,
        }
      }
      // Summarize rule from pastTenseRules
      const godanMap = pastTenseRules.godan as Record<
        string,
        { pattern: string; replacement: string; description: string }
      >
      const rule = godanMap[endingGroup]
      if (!rule) {
        return {
          step1: `1. Identify: ${hiragana} (godan)`,
          step2: `2. Use memorized past: ${pastTenseForm}`,
          rule: "Fallback: unspecified godan ending",
          example: `${hiragana} → ${pastTenseForm}`,
        }
      }
      return {
        step1: `1. Identify: ${hiragana} ends in ${rule.pattern}`,
        step2: `2. Replace ${rule.pattern} with ${rule.replacement}`,
        rule: rule.description.replace("For verbs ending in", "Past tense:"),
        example: `${hiragana} → ${hiragana.slice(0, -1)}${
          rule.replacement
        } = ${pastTenseForm}`,
      }
    default:
      return {
        step1: `1. Analyze: ${hiragana}`,
        step2: `2. Apply past tense rule`,
        rule: "General past tense rule",
        example: `${hiragana} → ${pastTenseForm}`,
      }
  }
}
