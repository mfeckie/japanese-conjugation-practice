import type { FormRules, TransformationHint, Verb } from './verbs';

export function derivePastTenseForm(verb: Verb): string {
  const { hiragana, type, endingGroup } = verb;

  if (type === 'ichidan') {
    // Apply ichidan rule: remove る and add た
    if (hiragana.endsWith('る')) {
      return `${hiragana.slice(0, -1)}た`;
    }
  } else if (type === 'irregular') {
    // Check for irregular rules
    const rule = pastTenseRules.irregular[hiragana];
    if (rule) {
      return hiragana.replace(rule.pattern, rule.replacement);
    }
    // Handle compound する verbs (e.g., りょこうする → りょこうした)
    if (hiragana.endsWith('する')) {
      return `${hiragana.slice(0, -2)}した`;
    }
  } else if (type === 'godan' && endingGroup) {
    // Apply godan rule based on ending group
    const rule = pastTenseRules.godan[endingGroup];
    if (rule) {
      return `${hiragana.slice(0, -rule.pattern.length)}${rule.replacement}`;
    }
  }

  // If no rule applies, return empty string
  return '';
}

export function pastFormExplanation(verb: Verb): TransformationHint {
  const { type, hiragana, endingGroup } = verb;
  const pastTenseForm = derivePastTenseForm(verb);

  if (!pastTenseForm) {
    return {
      step1: `1. Past tense for ${hiragana} not available yet`,
      step2: '2. This verb needs past tense data',
      rule: 'Past tense form missing',
      example: 'Data being added',
    };
  }

  switch (type) {
    case 'ichidan':
      return {
        step1: `1. Identify: ${hiragana} is an ichidan verb (ends in る)`,
        step2: `2. Remove る and add た to get ${pastTenseForm}`,
        rule: 'Ichidan past tense: る → た',
        example: `${hiragana} → ${hiragana.slice(0, -1)}た = ${pastTenseForm}`,
      };
    case 'irregular':
      if (hiragana === 'する') {
        return {
          step1: '1. Identify: する irregular',
          step2: '2. する → した',
          rule: 'Irregular: する → した',
          example: `する → した`,
        };
      } else if (hiragana === 'くる') {
        return {
          step1: '1. Identify: くる irregular',
          step2: '2. くる → きた',
          rule: 'Irregular: くる → きた',
          example: `くる → きた`,
        };
      } else if (hiragana === 'いく') {
        return {
          step1: '1. Identify: いく special irregular',
          step2: '2. いく → いった',
          rule: 'Special: いく → いった',
          example: `いく → いった`,
        };
      } else if (hiragana.endsWith('する')) {
        return {
          step1: `1. Identify: ${hiragana} is a する compound`,
          step2: `2. Replace する with した`,
          rule: 'Compound: する → した',
          example: `${hiragana} → ${hiragana.slice(
            0,
            -2
          )}した = ${pastTenseForm}`,
        };
      } else {
        return {
          step1: `1. Identify: irregular verb`,
          step2: `2. Memorize form: ${pastTenseForm}`,
          rule: 'Irregular: must memorize',
          example: `${hiragana} → ${pastTenseForm}`,
        };
      }
    case 'godan': {
      if (!endingGroup) {
        return {
          step1: `1. Identify: godan verb`,
          step2: `2. Apply ending group rule`,
          rule: 'Godan past: use ending rule',
          example: `${hiragana} → ${pastTenseForm}`,
        };
      }
      // Summarize rule from pastTenseRules
      const godanMap = pastTenseRules.godan as Record<
        string,
        { pattern: string; replacement: string; description: string }
      >;
      const rule = godanMap[endingGroup];
      if (!rule) {
        return {
          step1: `1. Identify: ${hiragana} (godan)`,
          step2: `2. Use memorized past: ${pastTenseForm}`,
          rule: 'Fallback: unspecified godan ending',
          example: `${hiragana} → ${pastTenseForm}`,
        };
      }
      return {
        step1: `1. Identify: ${hiragana} ends in ${rule.pattern}`,
        step2: `2. Replace ${rule.pattern} with ${rule.replacement}`,
        rule: rule.description.replace('For verbs ending in', 'Past tense:'),
        example: `${hiragana} → ${hiragana.slice(0, -1)}${
          rule.replacement
        } = ${pastTenseForm}`,
      };
    }
    default:
      return {
        step1: `1. Analyze: ${hiragana}`,
        step2: `2. Apply past tense rule`,
        rule: 'General past tense rule',
        example: `${hiragana} → ${pastTenseForm}`,
      };
  }
}

export const pastTenseRules: FormRules = {
  ichidan: {
    pattern: 'る',
    replacement: 'た',
    description: 'For ichidan verbs, replace る with た',
  },
  irregular: {
    する: {
      pattern: 'する',
      replacement: 'した',
      description: 'する becomes した (irregular)',
    },
    くる: {
      pattern: 'くる',
      replacement: 'きた',
      description: 'くる becomes きた (irregular)',
    },
    いく: {
      pattern: 'いく',
      replacement: 'いった',
      description: 'いく becomes いった (irregular)',
    },
    ある: {
      pattern: 'ある',
      replacement: 'あった',
      description: 'ある becomes あった (irregular)',
    },
  },
  godan: {
    u: {
      pattern: 'う',
      replacement: 'った',
      description: 'For verbs ending in う, replace う with った',
    },
    ku: {
      pattern: 'く',
      replacement: 'いた',
      description: 'For verbs ending in く, replace く with いた',
    },
    gu: {
      pattern: 'ぐ',
      replacement: 'いだ',
      description: 'For verbs ending in ぐ, replace ぐ with いだ',
    },
    su: {
      pattern: 'す',
      replacement: 'した',
      description: 'For verbs ending in す, replace す with した',
    },
    tsu: {
      pattern: 'つ',
      replacement: 'った',
      description: 'For verbs ending in つ, replace つ with った',
    },
    nu: {
      pattern: 'ぬ',
      replacement: 'んだ',
      description: 'For verbs ending in ぬ, replace ぬ with んだ',
    },
    bu: {
      pattern: 'ぶ',
      replacement: 'んだ',
      description: 'For verbs ending in ぶ, replace ぶ with んだ',
    },
    mu: {
      pattern: 'む',
      replacement: 'んだ',
      description: 'For verbs ending in む, replace む with んだ',
    },
    ru: {
      pattern: 'る',
      replacement: 'った',
      description: 'For godan verbs ending in る, replace る with った',
    },
  },
};
