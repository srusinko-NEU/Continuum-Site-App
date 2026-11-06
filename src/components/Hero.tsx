import React from 'react';
import { HeroSpot25s, HeroSpot25sProps } from './HeroSpot25s';

export type HeroProps = HeroSpot25sProps;

export const Hero: React.FC<HeroProps> = (props) => {
  return <HeroSpot25s {...props} />;
};

export { HeroSpot25s };
