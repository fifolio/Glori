import { useState } from 'react';

// UI components
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function Hero() {
  // Current month for seasonal messaging
  const currentMonth: number = new Date().getMonth();

  // Show loading skeleton
  const [skeleton] = useState<boolean>(true);

  // Determine the season
  const getSeason = (month: number): string => {
    if ([2, 3, 4].includes(month)) return 'Spring';
    if ([5, 6, 7].includes(month)) return 'Summer';
    if ([8, 9, 10].includes(month)) return 'Autumn';
    return 'Winter';
  };

  const season = getSeason(currentMonth);

  return (
    <section className="py-12 md:py-24 lg:py-12">
      <div className="grid gap-6 md:gap-8 px-4 md:px-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to Our {season} Collection
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Discover our latest selection of cozy and stylish {season}-inspired Perfumes.
          </p>
        </div>

        <Carousel className="w-full hover:cursor-w-resize">
          <CarouselContent>
            <Skeleton className={`md:h-[400px] h-[155px] w-full rounded-xl ${skeleton ? '' : 'hidden'}`} />
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
