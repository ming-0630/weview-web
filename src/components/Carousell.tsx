import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// Define the props
type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
  // 1. useEmblaCarousel returns a emblaRef and we must attach the ref to a container.
  // EmblaCarousel will use that ref as basis for swipe and other functionality.
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext()
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="flex items-center">
      {/* // Attach ref to a div
      // 2. The wrapper div must have overflow:hidden */}
      <div className="mr-8">
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
      <div className="overflow-hidden w-full h-full flex items-center px-3" ref={emblaRef}>
        {/* 3. The inner div must have a display:flex property */}
        {/* 4. We pass the children as-is so that the outside component can style it accordingly */}
        <div className="flex">{children}</div>
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

  );
};
export default Carousel;