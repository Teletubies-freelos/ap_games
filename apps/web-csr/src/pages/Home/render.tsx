import { CardHeroHOC, IFeatured } from './carHeroHOC';

export const render = (props: IFeatured) => (
  <CardHeroHOC key={props.featured_id} {...props} />
);
