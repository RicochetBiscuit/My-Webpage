'use client';
import Image from 'next/image';
import IconButton from '../Buttons/IconButton';
import { footerLinks } from '@/constants';
import FooterColumn from './FooterColumn';
import Contact from './Contact';
import { IconProps, IconSchema } from '@/schemas';
import { useMemo } from 'react';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import Credits from './Credits';

const Footer = () => {
  const path = usePathname();
  const { t } = useTranslation('index');
  const { data, loading, error } = useSupabaseFetch<IconProps>(
    'public',
    'social_icons',
    `*`,
    IconSchema,
  );

  if (error) {
    console.log(error);
  }
  const filteredData = useMemo(() => {
    return data && data.length > 1 && data.sort((a, b) => a.id - b.id);
  }, [data]);
  return loading || !filteredData ? (
    <></>
  ) : path.includes('blog') ? (
    <div className="bg-base-100 curosr-auto">
      <Credits data={filteredData} />
    </div>
  ) : (
    <div className="relative !cursor-none flex justify-center w-full footerCust pt-24 bg-white shadow-inner shadow-black !select-none">
      <div className="overflow-hidden">
        <div className="flex flexCenter py-24 pb-26 lg:px-14 px-8 bg-neutral-950">
          <div className="flex lg:flexBetween flex-col w-full h-auto z-10 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row lg:justify-between justify-center lg:items-end items-center lg:gap-4 gap-8 w-full">
              <div className="flex flex-col justify-between lg:items-start items-center z-10 lg:w-1/4 w-full">
                <Image
                  src="/large-logo-w.svg"
                  width={250}
                  height={100}
                  loading={'eager'}
                  alt="Flexibble"
                  className="w-full max-w-[180px] h-auto lg:pb-6 pb-0"
                />
                <div className="flex flex-col lg:items-start items-center w-full gap-5">
                  <p className="text-stone-200 text-l w-auto font-medium whitespace-normal max-lg:text-center text-start">
                    {t('footer.title')}
                  </p>
                  <p className="text-stone-200 text-sm font-normal max-lg:text-center text-start max-lg:max-w-[300px]">
                    {t('footer.description')}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-8 text-end justify-center">
                <FooterColumn Links={footerLinks[0].links} />
                <div className="flex-1 flex flex-col gap-4 text-start">
                  <FooterColumn Links={footerLinks[1].links} />
                </div>
              </div>
              <div className="flex lg:justify-end justify-center h-auto lg:w-2/5 w-full">
                <div className="flex flex-col items-end justify-end max-lg:items-center w-full lg:max-w-[580px] max-w-[400px]">
                  <Contact />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white text-stone-900 !cursor-none">
          <Credits data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
