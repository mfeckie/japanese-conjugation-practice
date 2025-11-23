import { derivePoliteForm } from './polite-form';
import type { TransformationHint, Verb } from './verbs';

export function derivePoliteNegativeForm(verb: Verb): string {
  const polite = derivePoliteForm(verb);
  return polite.endsWith('ます')
    ? polite.slice(0, -2) + 'ません'
    : polite + 'ません';
}

export function politeNegativeFormExplanation(verb: Verb): TransformationHint {
  const polite = derivePoliteForm(verb);
  const politeNeg = derivePoliteNegativeForm(verb);
  return {
    step1: `1. Form the polite (ます) form: ${polite}`,
    step2: `2. Replace ます with ません to make it negative polite`,
    step3: `3. Result: ${politeNeg}`,
    rule: 'Polite negative: ます → ません',
    example: `${polite} → ${politeNeg}`,
  };
}
