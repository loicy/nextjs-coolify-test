import Image from "next/image";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { GiPlatform } from "react-icons/gi";
import Testimorials from "./component/index/testimonials";

async function getIndex() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/index?locale=en&populate=services.image_featured&populate[1]=metadata.img`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Services");
  }
  return res.json();
}

async function getTestimonials() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/testimonials?locale=en&populate[1]=picture`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Testimonials");
  }
  return res.json();
}

export default async function Home() {
  const index = await getIndex();
  const testimonials = await getTestimonials();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {index.data.attributes.services.map((service: any) => (
            <Link key={service.id} href={service.href}>
              <div className="group/service flex h-auto flex-col gap-4 rounded-md border border-cyan-500/20 p-4 transition-all dark:border-brand-tertiary/20 hover:bg-gradient-to-b hover:from-cyan-500 hover:to-cyan-600">
                <div className="relative h-48 w-full rounded-md">
                  <Image
                    src={service.image_featured.data.attributes.url}
                    className="object-cover object-center"
                    style={{ objectFit: "cover" }}
                    fill
                    alt={service.title}
                  />
                  <div className="absolute right-2 top-2">
                    <FaArrowAltCircleRight className="hidden size-5 -rotate-45 text-white group-hover/service:block" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <GiPlatform className="size-6 text-cyan-500 dark:text-brand-tertiary group-hover/service:text-white" />
                    <h2 className="text-xl group-hover/service:text-white">{service.title} </h2>
                  </div>
                  <p className="py-2 line-clamp-5 group-hover/service:text-white">
                    {service.content}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <section className="h-auto w-full">
          <Testimorials
            testimonials={testimonials.data}
            testimonialsTitle="Testimonials"
            testimonialsDescription="blablabla bullshit"
          />
        </section>
      </div>
    </main>
  );
}
