import type { CreditCardType } from "credit-card-type/dist/types";

/**
 * Card number should not contain spaces or any other special characters
 */
export default function prettyCardNumber(cardNumber: string, cardType: CreditCardType) {
  const offsets = [0, ...cardType.gaps, cardNumber.length];
  const components = [];

  for (let i = 0; offsets[i] < cardNumber.length; i++) {
    const start = offsets[i];
    const end = Math.min(offsets[i + 1], cardNumber.length);
    components.push(cardNumber.substring(start, end));
  }

  return components.join(" ");
}
