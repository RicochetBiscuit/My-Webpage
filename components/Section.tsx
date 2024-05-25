"use client";
import { createRef, useEffect, useRef, useState } from "react";
import { SectionData } from "@/app/common.types";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { handleScroll } from "@/utils/handleScroll";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ArrowButton } from "./Buttons/ArrowButton";

const Section = ({ sectionsData }: { sectionsData: SectionData[] }) => {
  const sectionRefs = useRef(sectionsData.map(() => createRef<HTMLDivElement>()));
  const [currentIndex, setCurrentIndex] = useState(() => 0);
  const { scrollY } = useScroll();
  const isScrollEnabled = useSelector((state: RootState) => state.isScrollEnabled.enabled);
  const isTouch = useSelector((state: RootState) => state.isTouch.touch);
  const y = useTransform(scrollY, [0, 2000], [0, -900]);
  const scrollPosition = useSelector((state: RootState) => state.scrollSlice.scrollPosition);
  const [scrollEnabled, setScrollState] = useState(true);
  
  useEffect(() => {
    sectionRefs.current.forEach((ref, index) => {
      const sectionTop = ref.current?.offsetTop ?? 0;
      const sectionHeight = ref.current?.clientHeight ?? 0;
      if (
        scrollPosition >= sectionTop - sectionHeight / 2 &&
        scrollPosition < sectionTop + sectionHeight / 2
      ) {
        setCurrentIndex(index);
      }
    });
    console.log(currentIndex)
  }, [scrollPosition]);

  useEffect(() => {
    if (!isTouch) {
      const handleScrollEvent = (event: WheelEvent) => {
        if (isScrollEnabled && !(event.deltaY<0 && currentIndex===1) && currentIndex!==0 && scrollEnabled) {
          handleScroll({
            event,
            currentIndex,
            sectionsData,
            sectionRefs: sectionRefs.current,
            setScrollState
          });  
        }
      };
      window.addEventListener("wheel", handleScrollEvent);
      
      return () => {
      window.removeEventListener("wheel", handleScrollEvent);
      };
    }
  }, [currentIndex, sectionRefs, sectionsData, isTouch, isScrollEnabled, scrollEnabled]);
 

  return (
    <div>
      {sectionsData.map((section, index) => (
        <section
          key={index}
          ref={sectionRefs.current[index]}
          className={`
            ${section.className} 
            w-full min-w-[350px] flex items-center justify-center overflow-hidden
            ${section.parallax ? "sticky top-0 z-0 " : " relative"} 
          `}
        >
          {section.background && (
            <Image
              src={section.background}
              alt={section.background}
              quality={100}
              width={2000}
              height={2000}
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
              }}
            />
          )}
          {section.children}
          {section.topImage && (
            <motion.div
              style={{
                y,
                width: "100%",
                height: "auto",
                minHeight: "100%",
                minWidth: "350px",
                pointerEvents: "none",
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 10,
                overflow: "hidden",
              }}
              key={section.topImage}
              className="relative"
            >
              <Image
                src={section.topImage}
                alt={section.topImage}
                quality={100}
                width={2000}
                height={2000}
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                className="galata1 absolute bottom-0 pointer-events-none"
              />
            </motion.div>
          )}
          <div className="absolute bottom-0 w-auto flex justify-center z-50">
            {index === 0 && (
              <ArrowButton
                index={1}
                duration={1500}
                arrow={true}
                className="opacity-50 hover:opacity-100 transition-opacity animate-bounce-slow z-10"
                sectionRefs={sectionRefs.current}
                setCurrentIndex={setCurrentIndex}
              />
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Section;