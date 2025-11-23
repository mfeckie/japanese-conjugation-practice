import type { FormRules, TransformationHint, Verb } from './verbs';

export const form_types = {
  te: 'て form',
  past: 'た form',
  negative: 'ない form',
  past_negative: 'なかった form',
};

export function getFormTitle(form_type: keyof typeof form_types): string {
  return form_types[form_type];
}

export function deriveTeForm(verb: Verb): string {
  const { hiragana, type, endingGroup } = verb;

  if (type === 'irregular') {
    const rule = teFormRules.irregular[hiragana];
    if (rule) {
      return hiragana.replace(rule.pattern, rule.replacement);
    }
    // Handle compound する verbs (e.g., りょこうする → りょこうして)
    if (hiragana.endsWith('する')) {
      return `${hiragana.slice(0, -2)}して`;
    }
  }

  if (type === 'ichidan') {
    return `${hiragana.slice(0, -1)}て`;
  }

  if (type === 'godan' && endingGroup) {
    const rule = teFormRules.godan[endingGroup];

    if (rule) {
      return `${hiragana.slice(0, -rule.pattern.length)}${rule.replacement}`;
    }
  }

  // If no rule applies, return empty string or throw error
  return '';
}

export function teFormExplanation(verb: Verb): TransformationHint {
  const { type, hiragana, endingGroup } = verb;
  const teForm = deriveTeForm(verb);

  switch (type) {
    case 'ichidan':
      return {
        step1: `1. Identify: ${hiragana} is an ichidan verb (ends in る)`,
        step2: `2. Remove る from ${hiragana}`,
        step3: `3. Add て to get ${teForm}`,
        rule: 'Ichidan Rule: Remove る and add て',
        example: `${hiragana} → ${hiragana.slice(0, -1)}て = ${teForm}`,
      };

    case 'irregular':
      if (hiragana === 'する') {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: する → して`,
          rule: 'Irregular Rule: する becomes して',
          example: `${hiragana} → ${teForm}`,
        };
      } else if (hiragana === 'くる') {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: くる → きて`,
          rule: 'Irregular Rule: くる becomes きて',
          example: `${hiragana} → ${teForm}`,
        };
      } else if (hiragana === 'いく') {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: いく → いって`,
          rule: 'Irregular Rule: いく becomes いって (special case)',
          example: `${hiragana} → ${teForm}`,
        };
      } else if (hiragana.endsWith('する')) {
        return {
          step1: `1. Identify: ${hiragana} is a compound verb with する`,
          step2: `2. Change する to して`,
          rule: 'Compound Rule: Replace する with して',
          example: `${hiragana} → ${hiragana.slice(0, -2)}して = ${teForm}`,
        };
      } else {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special form: ${teForm}`,
          rule: 'Irregular Rule: Must be memorized',
          example: `${hiragana} → ${teForm}`,
        };
      }

    case 'godan':
      switch (endingGroup) {
        case 'mu':
          return {
            step1: `1. Identify: ${hiragana} ends in む (godan verb)`,
            step2: `2. Change む to ん`,
            step3: `3. Add で to get ${teForm}`,
            rule: 'む → んで rule (sound convenience: /m/ + て → んで)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`,
          };

        case 'bu':
          return {
            step1: `1. Identify: ${hiragana} ends in ぶ (godan verb)`,
            step2: `2. Change ぶ to ん`,
            step3: `3. Add で to get ${teForm}`,
            rule: 'ぶ → んで rule (sound convenience: /b/ + て → んで)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`,
          };

        case 'nu':
          return {
            step1: `1. Identify: ${hiragana} ends in ぬ (godan verb)`,
            step2: `2. Change ぬ to ん`,
            step3: `3. Add で to get ${teForm}`,
            rule: 'ぬ → んで rule (sound convenience: /n/ + て → んde)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}んで = ${teForm}`,
          };

        case 'ku':
          return {
            step1: `1. Identify: ${hiragana} ends in く (godan verb)`,
            step2: `2. Change く to い`,
            step3: `3. Add て to get ${teForm}`,
            rule: 'く → いて rule (consonant removal: /k/ → /i/ + て)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}いて = ${teForm}`,
          };

        case 'gu':
          return {
            step1: `1. Identify: ${hiragana} ends in ぐ (godan verb)`,
            step2: `2. Change ぐ to い`,
            step3: `3. Add で to get ${teForm}`,
            rule: 'ぐ → いで rule (consonant removal: /g/ → /i/ + で)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}いで = ${teForm}`,
          };

        case 'su':
          return {
            step1: `1. Identify: ${hiragana} ends in す (godan verb)`,
            step2: `2. Change す to し`,
            step3: `3. Add て to get ${teForm}`,
            rule: 'す → して rule (direct substitution)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}して = ${teForm}`,
          };

        case 'tsu':
          return {
            step1: `1. Identify: ${hiragana} ends in つ (godan verb)`,
            step2: `2. Change つ to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: 'つ → って rule (double consonant: /t/ + て → って)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`,
          };

        case 'u':
          return {
            step1: `1. Identify: ${hiragana} ends in う (godan verb)`,
            step2: `2. Change う to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: 'う → って rule (historical /w/ sound + て → って)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`,
          };

        case 'ru':
          return {
            step1: `1. Identify: ${hiragana} ends in る (godan verb - NOT ichidan!)`,
            step2: `2. Change る to っ`,
            step3: `3. Add て to get ${teForm}`,
            rule: 'Godan る → って rule (different from ichidan verbs)',
            example: `${hiragana} → ${hiragana.slice(0, -1)}って = ${teForm}`,
          };

        default:
          return {
            step1: `1. Identify: ${hiragana} is a godan verb`,
            step2: `2. Apply godan conjugation pattern`,
            rule: 'Godan Rule: Follow specific ending patterns',
            example: `${hiragana} → ${teForm}`,
          };
      }

    default:
      return {
        step1: `1. Analyze the verb: ${hiragana}`,
        step2: `2. Apply appropriate rule`,
        rule: 'General conjugation rule',
        example: `${hiragana} → ${teForm}`,
      };
  }
}

export const teFormRules: FormRules = {
  ichidan: {
    pattern: 'る',
    replacement: 'て',
    description: 'For ichidan verbs, simply replace る with て',
  },
  irregular: {
    する: {
      pattern: 'する',
      replacement: 'して',
      description: 'する becomes して (irregular)',
    },
    くる: {
      pattern: 'くる',
      replacement: 'きて',
      description: 'くる becomes きて (irregular)',
    },
    いく: {
      pattern: 'いく',
      replacement: 'いって',
      description: 'いく becomes いって (irregular)',
    },
    ある: {
      pattern: 'ある',
      replacement: 'あって',
      description: 'ある becomes あって (irregular)',
    },
  },
  godan: {
    u: {
      pattern: 'う',
      replacement: 'って',
      description: 'For verbs ending in う, replace う with って',
    },
    ku: {
      pattern: 'く',
      replacement: 'いて',
      description: 'For verbs ending in く, replace く with いて',
    },
    gu: {
      pattern: 'ぐ',
      replacement: 'いで',
      description: 'For verbs ending in ぐ, replace ぐ with いで',
    },
    su: {
      pattern: 'す',
      replacement: 'して',
      description: 'For verbs ending in す, replace す with して',
    },
    tsu: {
      pattern: 'つ',
      replacement: 'って',
      description: 'For verbs ending in つ, replace つ with って',
    },
    nu: {
      pattern: 'ぬ',
      replacement: 'んで',
      description: 'For verbs ending in ぬ, replace ぬ with んで',
    },
    bu: {
      pattern: 'ぶ',
      replacement: 'んで',
      description: 'For verbs ending in ぶ, replace ぶ with んで',
    },
    mu: {
      pattern: 'む',
      replacement: 'んで',
      description: 'For verbs ending in む, replace む with んで',
    },
    ru: {
      pattern: 'る',
      replacement: 'って',
      description: 'For godan verbs ending in る, replace る with って',
    },
  },
};
