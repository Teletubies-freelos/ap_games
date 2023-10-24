import { FeaturedDTO } from '../../../../migrations/src/types/tables';
import { CardHeroHOC } from './carHeroHOC';

export const render = (props: FeaturedDTO) => (
  <CardHeroHOC key={props.featured_id} {...props} />
);
