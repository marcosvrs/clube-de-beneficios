export default interface RewardsStateInterface {
  items: RewardStateInterface[];
}

export interface RewardStateInterface {
  id: string;
  image: string;
  name: string;
  description?: string;
  points: number;
}
