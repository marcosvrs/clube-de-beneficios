import BenefitsStateInterface from '@/store/Benefits/BenefitsStateInterface';
import RewardsStateInterface from '@/store/Rewards/RewardsStateInterface';
import UserStateInterface from '@/store/User/UserStateInterface';

export default interface RootStateInterface {
  user: UserStateInterface;
  benefits: BenefitsStateInterface;
  rewards: RewardsStateInterface;
}
