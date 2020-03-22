export default interface BenefitsStateInterface {
  items: BenefitStateInterface[];
}

export interface BenefitStateInterface {
  id: string;
  image: string;
  name: string;
  description?: string;
  points: number;
}
