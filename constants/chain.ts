import {
  // base,
  baseSepolia,
  Chain,
} from 'viem/chains';

export const chain =
  process.env.NODE_ENV === 'production' ? baseSepolia : (baseSepolia as Chain);
