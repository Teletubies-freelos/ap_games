import { Stack } from "@mui/material";
import { useMemo } from "react";
import CarouselHero from "../../../../packages/ui/src/layout/CarouselHero";

interface ResponsiveCarouselProps<T> {
  data: T[];
  itemRender: (item: T) => JSX.Element;
  groupSize?: number;
}

function groupBy<T>(items: T[], groupSize: number) {
  const HeroItemsGroup: T[][] = [];
  for (let i = 0; i < items.length; i += groupSize)
    HeroItemsGroup.push(items.slice(i, i + 3));

  return HeroItemsGroup;
}

export default function ResponsiveCarousel<T>({
  data,
  itemRender,
  groupSize = 3,
}: ResponsiveCarouselProps<T>) {
  const HeroItems = useMemo(() => data?.map(itemRender) ?? [], [data]);

  const HeroItemsGroup = useMemo(
    () => groupBy(HeroItems ?? [], groupSize),
    [HeroItems],
  );

  return (
    <Stack sx={{ paddingX: "1rem" }}>
      <CarouselHero
        sx={{
          display: { md: "block", xs: "none" },
        }}
      >
        {HeroItemsGroup.map((items, index) => (
          <Stack gap={2} direction="row" key={index} justifyContent="center">
            {items}
          </Stack>
        ))}
      </CarouselHero>
      <CarouselHero sx={{ display: { md: "none", xs: "block" } }}>
        {HeroItems}
      </CarouselHero>
    </Stack>
  );
}
