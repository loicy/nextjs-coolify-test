import Link from "next/link";


export default function Testimorials({ testimonials, testimonialsTitle, testimonialsDescription }: { testimonials: any; testimonialsTitle: string, testimonialsDescription: string, }) {
    return (
        <div className="container-7">
            <div className="flex flex-col gap-6">
                <div className="flex">
                    <h2 className="bg-heading"> <span className="relative text-brand-tertiary text-5xl">{testimonialsTitle}</span></h2>
                </div>
                <p className="text-cyan-500 font-semibold dark:text-cyan-600">{testimonialsDescription} </p>

            </div>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                {testimonials.map((testimonial: any) => (
                    <div key={testimonial.attributes.id} className="border rounded-md border-cyan-500/20 p-8 flex flex-col gap-6 dark:border-brand-tertiary/20 transition-all">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: testimonial.attributes.content,
                            }} />
                        <div className="grid grid-cols-4 mt-8 md:px-4">
                            <div className="flex items-center col-span-1">
                                <img src={testimonial.attributes.picture.data.attributes.url}
                                    alt={testimonial.attributes.firstname_name}
                                    className="w-16 h-16 rounded-full md:h-20 md:w-20"
                                />
                            </div>
                            <div className="flex items-center col-span-3">
                                {testimonial.attributes.firstname_name} -{" "}
                                {testimonial.attributes.company}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
