/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: [],
  },
  i18n: {
    locales: ["en", "de", "tr"],
    defaultLocale: "en",
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: "/policies",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
