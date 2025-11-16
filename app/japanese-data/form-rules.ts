import type { Verb } from './verbs';

export interface FormRule {
  pattern: string;
  replacement: string;
  description: string;
}

export interface TeFormRules {
  ichidan: FormRule;
  irregular: { [key: string]: FormRule };
  godan: { [key: string]: FormRule };
}

export function deriveTeForm(verb: Verb): string {
  const { hiragana, type, endingGroup } = verb;

  if (type === 'ichidan') {
    // Apply ichidan rule: remove る and add て
    if (hiragana.endsWith('る')) {
      return `${hiragana.slice(0, -1)}て`;
    }
  } else if (type === 'irregular') {
    // Check for irregular rules
    const rule = teFormRules.irregular[hiragana];
    if (rule) {
      return hiragana.replace(rule.pattern, rule.replacement);
    }
    // Handle compound する verbs (e.g., りょこうする → りょこうして)
    if (hiragana.endsWith('する')) {
      return `${hiragana.slice(0, -2)}して`;
    }
  } else if (type === 'godan' && endingGroup) {
    // Apply godan rule based on ending group
    const rule = teFormRules.godan[endingGroup];
    if (rule) {
      return `${hiragana.slice(0, -rule.pattern.length)}${rule.replacement}`;
    }
  }

  // If no rule applies, return empty string or throw error
  return '';
}

export const teFormRules: TeFormRules = {
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
