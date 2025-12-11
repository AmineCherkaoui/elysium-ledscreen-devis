"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";
import SectionsHeading from "./section-heading";

export const testimonials = [
  {
    id: 1,
    name: "Yassine Benhaddou",
    company: "TechCorp",
    testimonial:
      "Un service impeccable, l’écran LED a transformé notre événement.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 1,
    name: "Fatima Zahra El Mansouri",
    company: "TechCorp",
    testimonial:
      "Livraison rapide, installation professionnelle et écran de grande qualité.",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
];

export default function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      id="testimonials"
      className=" w-full flex justify-center items-center py-12 sm:py-24 px-6 bg-primary-100 rounded-3xl"
    >
      <div className="w-full">
        <SectionsHeading
          title="Ce que disent nos clients"
          description="Nos clients sont notre meilleure vitrine. Voici
                        ce qu’ils pensent de nos service"
        />
        <div className="container sm:px-12 w-full lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-center">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.name}>
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500  cursor-pointer " />
            <CarouselNext className="hidden sm:flex text-primary-500 border-primary-500 hover:bg-primary-500 hover:text-white hover:border-primary-500  cursor-pointer " />
          </Carousel>
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-3.5 w-3.5 rounded-full border-2 transition-all duration-500 bg-primary-200 border-primary-200",
                  {
                    "hover:bg-primary-200 hover:border-primary-500 cursor-pointer ":
                      current !== index + 1,
                  },
                  {
                    "bg-primary-500 border-primary-500 w-7":
                      current === index + 1,
                  }
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) => (
  <div className="mb-8 rounded-xl py-8 px-2 sm:py-6">
    <div className="flex items-center justify-between gap-20">
      <div className="flex flex-col justify-center items-center w-full">
        <p className="font-medium mt-6 text-xl sm:text-2xl lg:text-[1.75rem] xl:text-3xl leading-normal lg:!leading-normal tracking-tight">
          &quot; {testimonial.testimonial}&quot;
        </p>
        <div className="flex  mt-6 items-center gap-4">
          <Avatar>
            <AvatarImage
              src={testimonial.avatar}
              alt={`${testimonial.name} picture`}
            />
            <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs sm:text-lg">{testimonial.name}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
