import { CardHeroHOC, IOffer } from "./carHeroHOC";

export const render = (props: IOffer) => (
  <CardHeroHOC key={props.product_id} {...props} />
);
