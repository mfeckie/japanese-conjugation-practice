import type { FormRules, Verb } from './verbs';

export const form_types = {
  te: 'て form',
  past: 'だ form',
  negative: 'negative form',
  past_negative: 'past negative form',
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

export function teFormExplanation(verb?: Verb): string {
  if (!verb) return '';
  const { type, hiragana } = verb;
  const teForm = deriveTeForm(verb);

  switch (type) {
    case 'ichidan':
      return `${hiragana} is an ichidan verb. ${teFormRules.ichidan.description}. So ${hiragana} becomes ${teForm}.`;

    case 'irregular': {
      const irregularRule = teFormRules.irregular[hiragana];
      if (irregularRule) {
        return `${hiragana} is an irregular verb. ${irregularRule.description}.`;
      }
      return `${hiragana} is an irregular verb with a special て-form: ${teForm}.`;
    }

    case 'godan': {
      const endingGroup = verb.endingGroup;
      if (endingGroup && teFormRules.godan[endingGroup]) {
        const rule = teFormRules.godan[endingGroup];
        return `${hiragana} is a godan verb. ${rule.description}. So ${hiragana} becomes ${teForm}.`;
      }
      return `${hiragana} is a godan verb that becomes ${teForm} in て-form.`;
    }

    default:
      return `The て-form of ${hiragana} is ${teForm}.`;
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
