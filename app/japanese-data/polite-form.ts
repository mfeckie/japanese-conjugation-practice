import type { TransformationHint, Verb } from './verbs';

export function derivePoliteForm(verb: Verb): string {
  const { hiragana, type } = verb;
  if (type === 'ichidan') {
    // Remove final る and add ます
    if (hiragana.endsWith('る')) return hiragana.slice(0, -1) + 'ます';
  } else if (type === 'irregular') {
    if (hiragana === 'する') return 'します';
    if (hiragana === 'くる') return 'きます';
    if (hiragana === 'いく') return 'いきます'; // regular pattern
    if (hiragana === 'ある') return 'あります';
    if (hiragana.endsWith('する')) {
      // Compound する verb
      return hiragana.slice(0, -2) + 'します';
    }
  } else if (type === 'godan') {
    // Convert final sound to its い-row + ます
    const end = hiragana.slice(-1);
    const stem = hiragana.slice(0, -1);
    const mapping: Record<string, string> = {
      う: 'い',
      く: 'き',
      ぐ: 'ぎ',
      す: 'し',
      つ: 'ち',
      ぬ: 'に',
      ぶ: 'び',
      む: 'み',
      る: 'り',
    };
    const iRow = mapping[end];
    if (iRow) return stem + iRow + 'ます';
  }
  // Fallback (shouldn't normally happen)
  return hiragana + 'ます';
}

export function politeFormExplanation(verb: Verb): TransformationHint {
  const { type, hiragana } = verb;

  switch (type) {
    case 'ichidan':
      return {
        step1: `1. Identify: ${hiragana} is an ichidan verb (ends in る)`,
        step2: `2. Remove る to get the stem: ${hiragana.slice(0, -1)}`,
        step3: `3. Add ます → ${hiragana.slice(0, -1)}ます`,
        rule: 'Ichidan polite: る → ます',
        example: `${hiragana} → ${hiragana.slice(0, -1)}ます`,
      };
    case 'irregular':
      if (hiragana === 'する') {
        return {
          step1: '1. Identify: する irregular',
          step2: '2. する → します',
          rule: 'Irregular: する → します',
          example: 'する → します',
        };
      } else if (hiragana === 'くる') {
        return {
          step1: '1. Identify: くる irregular',
          step2: '2. くる → きます',
          rule: 'Irregular: くる → きます',
          example: 'くる → きます',
        };
      } else if (hiragana === 'いく') {
        return {
          step1: '1. Identify: いく (acts regular for polite)',
          step2: '2. いく → いき + ます',
          rule: 'Polite: stem (き) + ます',
          example: 'いく → いきます',
        };
      } else if (hiragana === 'ある') {
        return {
          step1: '1. Identify: ある irregular',
          step2: '2. ある → あり + ます',
          rule: 'Irregular: ある → あります',
          example: 'ある → あります',
        };
      } else if (hiragana.endsWith('する')) {
        return {
          step1: `1. Identify: ${hiragana} is a する compound`,
          step2: `2. Replace する with します`,
          rule: 'Compound: する → します',
          example: `${hiragana} → ${hiragana.slice(0, -2)}します`,
        };
      }
      return {
        step1: `1. Identify: irregular verb`,
        step2: `2. Memorize polite form`,
        rule: 'Irregular polite form',
        example: `${hiragana} → ${derivePoliteForm(verb)}`,
      };
    case 'godan': {
      const end = hiragana.slice(-1);
      const stem = hiragana.slice(0, -1);
      const mapping: Record<string, { i: string; example: string }> = {
        う: { i: 'い', example: 'う → い' },
        く: { i: 'き', example: 'く → き' },
        ぐ: { i: 'ぎ', example: 'ぐ → ぎ' },
        す: { i: 'し', example: 'す → し' },
        つ: { i: 'ち', example: 'つ → ち' },
        ぬ: { i: 'に', example: 'ぬ → に' },
        ぶ: { i: 'び', example: 'ぶ → び' },
        む: { i: 'み', example: 'む → み' },
        る: { i: 'り', example: 'る → り' },
      };
      const info = mapping[end];
      if (info) {
        return {
          step1: `1. Identify: ${hiragana} is a godan verb (ends in ${end})`,
          step2: `2. Change ${end} to its い-row (${
            info.example.split(' → ')[1]
          }) to form the stem: ${stem}${info.i}`,
          step3: `3. Add ます → ${stem}${info.i}ます`,
          rule: 'Godan polite: final syllable → い-row + ます',
          example: `${hiragana} → ${stem}${info.i}ます`,
        };
      }
      return {
        step1: `1. Identify: godan verb`,
        step2: `2. Change final syllable to い-row + ます`,
        rule: 'Godan polite formation',
        example: `${hiragana} → ${derivePoliteForm(verb)}`,
      };
    }
    default:
      return {
        step1: `1. Analyze: ${hiragana}`,
        step2: `2. Apply polite rule (stem + ます)`,
        rule: 'General polite rule',
        example: `${hiragana} → ${derivePoliteForm(verb)}`,
      };
  }
}
