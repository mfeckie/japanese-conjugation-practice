import { derivePoliteNegativeForm } from './negative-polite-form';
import { derivePoliteForm } from './polite-form';
import type { TransformationHint, Verb } from './verbs';

export function derivePastPoliteNegativeForm(verb: Verb): string {
  // We can build from polite negative: ません → ませんでした
  const neg = derivePoliteNegativeForm(verb);
  return neg.endsWith('ません') ? neg + 'でした' : neg + 'でした';
}

export function pastPoliteNegativeFormExplanation(
  verb: Verb
): TransformationHint {
  const polite = derivePoliteForm(verb);
  const politeNeg = derivePoliteNegativeForm(verb);
  const pastPoliteNeg = derivePastPoliteNegativeForm(verb);
  return {
    step1: `1. Form the polite (ます) form: ${polite}`,
    step2: `2. Make it negative: ます → ません → ${politeNeg}`,
    step3: `3. Add でした to mark past: ${politeNeg} → ${pastPoliteNeg}`,
    rule: 'Past polite negative: ます → ません → ませんでした',
    example: `${polite} → ${politeNeg} → ${pastPoliteNeg}`,
  };
}
