import appDb from "database/app";

import type { Card } from "database/types";

export const getCardById = async (id: string) => {
  return await appDb.cards.get(id);
};

export const getCards = async () => {
  return await appDb.cards.toArray();
};

export const addCard = async (card: Card) => {
  return await appDb.cards.add(card);
};

export const updateCard = async (card: Partial<Card> & Pick<Card, "id">) => {
  return await appDb.cards.update(card.id, card);
};

export const deleteCard = async (id: string) => {
  return await appDb.cards.delete(id);
};
