"use client";
import CardMaker from "@/components/CardMaker";
import { servicesSectCards } from "@/constants/servicesSectCards";
import SwiperCore from "swiper";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { generateSpans } from "@/components/GenerateSpans";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { slideIn } from "@/utils/motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

SwiperCore.use([Pagination]);

const ServicesSect = () => {
  const [_, setInit] = useState(false);
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }
  const pagination = {
    el: ".custom-pagy",
    clickable: true,
    bulletClass: `swiper-pagination-bullet`,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="flex flex-col items-start h-full w-auto p-16 z-10"
      >
        <motion.h1 variants={slideIn("left", "spring", 0.5, 1)}>
          <div className="text-cool-gray-200 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
            {isMobile || isTablet
              ? t("servicesSect.intro")
              : generateSpans({
                  text: t("servicesSect.intro"),
                  colorType: "vibrantColors",
                  zeroColor: "#737373",
                })}
          </div>
          <div className="text-cool-gray-50 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mb-6">
            {isMobile || isTablet
              ? t("servicesSect.title")
              : generateSpans({
                  text: t("servicesSect.title"),
                  colorType: "vibrantColors",
                })}
          </div>
        </motion.h1>
        <div className="flex flex-wrap justify-center gap-8 w-auto">
          <Swiper
            effect="slide"
            slidesPerView={isMobile ? 1 : isTablet ? 2.5 : 3}
            spaceBetween={30}
            grabCursor={true}
            slidesPerGroup={1}
            centeredSlides
            loop
            modules={[Pagination, Navigation]}
            pagination={pagination}
            onInit={() => setInit(true)}
            className="2xl:w-[1030px] lg:w-[900px] md:w-[700px] w-[340px] h-auto"
          >
            {servicesSectCards.map((section, index) => (
              <SwiperSlide key={index} className="w-[330px] h-auto">
                <CardMaker
                  key={index}
                  cardSections={section}
                  index={index}
                  cardWidth="w-[330px]"
                  cardHeight="h-[520px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>
      <div className="absolute left-0 bottom-0 custom-pagy z-30 flex 2xl:flex-col flex-row justify-center items-center h-auto 2xl:min-h-[100svh] w-full 2xl:max-w-[180px] 2xl:bg-cool-gray-800 2xl:p-40 p-10 2xl:gap-8 gap-4" />
    </div>
  );
};

export default ServicesSect;
