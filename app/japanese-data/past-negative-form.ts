import { deriveNegativeForm } from './negative-form';
import type { TransformationHint, Verb } from './verbs';

export function derivePastNegativeForm(verb: Verb): string {
  // Use our rule-based negative form derivation
  const neg = deriveNegativeForm(verb);
  if (!neg) return ''; // fallback
  return neg.endsWith('ない')
    ? neg.slice(0, -2) + 'なかった'
    : neg + 'なかった';
}

export function pastNegativeFormExplanation(verb: Verb): TransformationHint {
  const { hiragana, type } = verb;
  const neg = deriveNegativeForm(verb);
  const pastNeg = derivePastNegativeForm(verb);
  if (!neg || !pastNeg) {
    return {
      step1: `1. Form negative not available for ${hiragana}`,
      step2: `2. Cannot derive past negative`,
      rule: 'Missing negative base',
      example: hiragana,
    };
  }

  let step1 = '1. Form the plain negative';
  const step2 = '2. Replace ない with なかった';
  const rule = 'Past negative: ない → なかった';
  const example = `${neg} → ${pastNeg}`;

  if (type === 'ichidan' && hiragana.endsWith('る')) {
    step1 = `1. Ichidan: remove る add ない → ${hiragana.slice(0, -1)}ない`;
  } else if (type === 'godan') {
    const end = hiragana.slice(-1);
    step1 = `1. Godan: change ${end} to its あ-row + ない → ${neg}`;
  } else if (type === 'irregular') {
    step1 = `1. Irregular negative (memorize): ${neg}`;
  }

  return {
    step1,
    step2,
    step3: `3. Result: ${pastNeg}`,
    rule,
    example,
  };
}
