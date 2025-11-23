import { derivePoliteForm } from './polite-form';
import type { TransformationHint, Verb } from './verbs';

export function derivePastPoliteForm(verb: Verb): string {
  const polite = derivePoliteForm(verb);
  // Replace final ます with ました (safe assumption all polite forms end with ます)
  return polite.endsWith('ます')
    ? polite.slice(0, -2) + 'ました'
    : polite + 'でした';
}

export function pastPoliteFormExplanation(verb: Verb): TransformationHint {
  const polite = derivePoliteForm(verb);
  const pastPolite = derivePastPoliteForm(verb);
  return {
    step1: `1. Form the polite (ます) form: ${polite}`,
    step2: `2. Replace ます with ました to make it past polite`,
    step3: `3. Result: ${pastPolite}`,
    rule: 'Past polite: polite form ます → ました',
    example: `${polite} → ${pastPolite}`,
  };
}
