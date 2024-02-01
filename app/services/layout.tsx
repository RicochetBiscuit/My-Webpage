import Rooting from "@/components/Rooting";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

// export async function generateStaticParams() {
//   const paths = portfolioPageItems.map((item) => ({
//     params: { id: item._id.toLowerCase().replace(/\s+/g, "") },
//   }));

//   return paths;
// }
