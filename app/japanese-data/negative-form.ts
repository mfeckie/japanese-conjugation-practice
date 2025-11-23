import type { FormRules, TransformationHint, Verb } from './verbs';

export function deriveNegativeForm(verb: Verb): string {
  const { hiragana, type, endingGroup } = verb;

  if (type === 'ichidan') {
    // Apply ichidan rule: remove る and add ない
    if (hiragana.endsWith('る')) {
      return `${hiragana.slice(0, -1)}ない`;
    }
  } else if (type === 'irregular') {
    // Check for irregular rules
    const rule = negativeFormRules.irregular[hiragana];
    if (rule) {
      return hiragana.replace(rule.pattern, rule.replacement);
    }
    // Handle compound する verbs (e.g., りょこうする → りょこうしない)
    if (hiragana.endsWith('する')) {
      return `${hiragana.slice(0, -2)}しない`;
    }
  } else if (type === 'godan' && endingGroup) {
    // Apply godan rule based on ending group
    const rule = negativeFormRules.godan[endingGroup];
    if (rule) {
      return `${hiragana.slice(0, -rule.pattern.length)}${rule.replacement}`;
    }
  }

  // If no rule applies, return empty string
  return '';
}

export function negativeFormExplanation(verb: Verb): TransformationHint {
  const { type, hiragana } = verb;
  const negativeForm = deriveNegativeForm(verb);

  if (!negativeForm) {
    return {
      step1: `1. Negative form for ${hiragana} not available yet`,
      step2: `2. This verb needs negative form data`,
      rule: 'Negative form coming soon',
      example: 'Data being added progressively',
    };
  }

  switch (type) {
    case 'ichidan':
      return {
        step1: `1. Identify: ${hiragana} is an ichidan verb (ends in る)`,
        step2: `2. Remove る from ${hiragana}`,
        step3: `3. Add ない to get ${negativeForm}`,
        rule: 'Ichidan Rule: Remove る and add ない',
        example: `${hiragana} → ${hiragana.slice(0, -1)}ない = ${negativeForm}`,
      };

    case 'irregular':
      if (hiragana === 'する') {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: する → しない`,
          rule: 'Irregular Rule: する becomes しない',
          example: `${hiragana} → ${negativeForm}`,
        };
      } else if (hiragana === 'くる') {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special transformation: くる → こない`,
          rule: 'Irregular Rule: くる becomes こない',
          example: `${hiragana} → ${negativeForm}`,
        };
      } else if (hiragana.endsWith('する')) {
        return {
          step1: `1. Identify: ${hiragana} is a compound verb with する`,
          step2: `2. Change する to しない`,
          rule: 'Compound Rule: Replace する with しない',
          example: `${hiragana} → ${hiragana.slice(
            0,
            -2
          )}しない = ${negativeForm}`,
        };
      } else {
        return {
          step1: `1. Identify: ${hiragana} is an irregular verb`,
          step2: `2. Special form: ${negativeForm}`,
          rule: 'Irregular Rule: Must be memorized',
          example: `${hiragana} → ${negativeForm}`,
        };
      }

    case 'godan': {
      const ending = hiragana.slice(-1);

      return {
        step1: `1. Identify: ${hiragana} is a godan verb (ends in ${ending})`,
        step2: `2. Change ${ending} to あ-sound + ない`,
        step3: `3. Result: ${negativeForm}`,
        rule: 'Godan Rule: Change to あ-column + ない',
        example: `${hiragana} → ${negativeForm}`,
      };
    }

    default:
      return {
        step1: `1. Analyze the verb: ${hiragana}`,
        step2: `2. Apply negative conjugation rule`,
        rule: 'General negative rule',
        example: `${hiragana} → ${negativeForm}`,
      };
  }
}

export const negativeFormRules: FormRules = {
  ichidan: {
    pattern: 'る',
    replacement: 'ない',
    description: 'For ichidan verbs, simply replace る with ない',
  },
  irregular: {
    する: {
      pattern: 'する',
      replacement: 'しない',
      description: 'する becomes しない (irregular)',
    },
    くる: {
      pattern: 'くる',
      replacement: 'こない',
      description: 'くる becomes こない (irregular)',
    },
    いく: {
      pattern: 'いく',
      replacement: 'いかない',
      description: 'いく becomes いかない (regular godan pattern)',
    },
    ある: {
      pattern: 'ある',
      replacement: 'ない',
      description: 'ある becomes ない (special irregular)',
    },
  },
  godan: {
    u: {
      pattern: 'う',
      replacement: 'わない',
      description: 'For verbs ending in う, replace う with わない',
    },
    ku: {
      pattern: 'く',
      replacement: 'かない',
      description: 'For verbs ending in く, replace く with かない',
    },
    gu: {
      pattern: 'ぐ',
      replacement: 'がない',
      description: 'For verbs ending in ぐ, replace ぐ with がない',
    },
    su: {
      pattern: 'す',
      replacement: 'さない',
      description: 'For verbs ending in す, replace す with さない',
    },
    tsu: {
      pattern: 'つ',
      replacement: 'たない',
      description: 'For verbs ending in つ, replace つ with たない',
    },
    nu: {
      pattern: 'ぬ',
      replacement: 'なない',
      description: 'For verbs ending in ぬ, replace ぬ with なない',
    },
    bu: {
      pattern: 'ぶ',
      replacement: 'ばない',
      description: 'For verbs ending in ぶ, replace ぶ with ばない',
    },
    mu: {
      pattern: 'む',
      replacement: 'まない',
      description: 'For verbs ending in む, replace む with まない',
    },
    ru: {
      pattern: 'る',
      replacement: 'らない',
      description: 'For godan verbs ending in る, replace る with らない',
    },
  },
};
