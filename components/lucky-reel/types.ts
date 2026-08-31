export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export type Reward = {
  id: string;
  name: string;
  rarity: Rarity;
  image: string;
};
