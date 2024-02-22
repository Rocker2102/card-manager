import { getTypeInfo, types as CardType } from "credit-card-type";

// declared as a helper & not in enum.ts because enum values do not have external dependencies
// so keeping it that way until a better solution is found
const CARD_NETWORKS = Object.values(CardType).map(cardType => {
  const brandInfo = getTypeInfo(cardType);

  return {
    id: cardType,
    label: brandInfo.niceType
  };
});

export default CARD_NETWORKS;
