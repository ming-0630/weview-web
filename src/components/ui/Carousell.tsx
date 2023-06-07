import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// Define the props
type Props = PropsWithChildren & EmblaOptionsType & {
  hasButtons?: boolean;
  className?: string;
};

const Carousel = ({ children, hasButtons, className, ...options }: Props) => {
  // 1. useEmblaCarousel returns a emblaRef and we must attach the ref to a container.
  // EmblaCarousel will use that ref as basis for swipe and other functionality.
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext()
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect()
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div className="flex flex-col py-5">
      <div className="flex items-center">
        <div>
          <button
            onClick={() => {
              if (prevBtnEnabled) {
                scrollPrev();
              }
            }}
            disabled={!prevBtnEnabled}
            className={classNames({
              "text-gray-500": !prevBtnEnabled,
              "text-black": prevBtnEnabled,
            })}
          >
            <ChevronLeftIcon className='w-10 ml-1' ></ChevronLeftIcon>
          </button>
        </div>

        {/* // Attach ref to a div
      // 2. The wrapper div must have overflow:hidden */}
        <div className={classNames("overflow-hidden w-full h-full flex items-center justify-center", className)} ref={emblaRef}>
          {/* 3. The inner div must have a display:flex property */}
          {/* 4. We pass the children as-is so that the outside component can style it accordingly */}
          <div className="flex w-full">{children}</div>
        </div>

        <div>
          <button
            onClick={() => {
              if (nextBtnEnabled) {
                scrollNext();
              }
            }}
            disabled={!nextBtnEnabled}
            className={classNames({
              "text-gray-500": !nextBtnEnabled,
              "text-black": nextBtnEnabled,
            })}
          >
            <ChevronRightIcon className='w-10 ml-1' ></ChevronRightIcon>
          </button>
        </div>
      </div>
      {
        hasButtons && <div className="flex gap-2 justify-center">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={classNames("bg-gray-500 w-2 h-2 rounded-full", index === selectedIndex ? "!bg-main" : "")}
              type="button"
              onClick={() => scrollTo(index)}
            />
            // <DotButton
            //   key={index}
            //   selected={index === selectedIndex}
            //   onClick={() => scrollTo(index)}
            // />
          ))}
        </div>
      }

    </div>

  );
};
export default Carousel;