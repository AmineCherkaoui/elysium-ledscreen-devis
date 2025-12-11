import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

export default function useScrollInfo() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");
  const [isOverHero, setIsOverHero] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      const direction = currentScrollY > lastScrollY.current ? "down" : "up";

      if (currentScrollY <= 100) {
        setScrollDirection("up");
      } else if (
        direction !== scrollDirection &&
        Math.abs(currentScrollY - lastScrollY.current) > 10
      ) {
        setScrollDirection(direction);
      }

      setIsOverHero(currentScrollY < 500);

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    updateScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection]);

  return { scrollDirection, isOverHero };
}
