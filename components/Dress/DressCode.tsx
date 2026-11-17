const dressGuides = [
    {
        title: "Gentlemen",
        wearHeading: "Please wear (at a minimum)",
        wear: ["Long sleeve button-up shirt", "Dress pants", "A belt", "Dress shoes"],
        avoid: ["Shorts", "Golf shirts"],
    },
    {
        title: "Ladies",
        wearHeading: "Please wear",
        wear: ["Formal attire"],
        avoid: ["Light blue"],
    },
];

export default function DressCodeSection() {
    return (
        <section className="flex flex-col items-center w-[min(820px,100%_-_2rem)] mx-auto mt-[30px] font-main text-foreground">
            {/* Page heading */}
            <h1 className="text-center text-[56px] max-[600px]:text-[44px] font-(family-name:--font-monsieur-la-doulaise)">
                Dress Code
            </h1>
            <p className="text-center text-[16px] uppercase tracking-[0.12em] opacity-75">
                Formal Attire
            </p>

            {/* Small decorative divider */}
            <div className="flex items-center gap-3 my-6 w-40" aria-hidden="true">
                <span className="h-px flex-1 bg-foreground opacity-40" />
                <span className="size-1.5 rotate-45 bg-foreground opacity-60" />
                <span className="h-px flex-1 bg-foreground opacity-40" />
            </div>

            <p className="text-center text-[18px] leading-relaxed max-w-[520px] mb-10">
                We can&apos;t wait to celebrate with you! Here&apos;s a little guide to help you plan your outfit.
            </p>

            {/* Cards: stacked on phones, side by side on wider screens */}
            <div className="grid w-full gap-6 sm:grid-cols-2">
                {dressGuides.map((guide) => (
                    <article
                        key={guide.title}
                        className="flex flex-col rounded-xl border border-foreground bg-background px-8 py-7 text-center shadow-[0_4px_16px_rgba(15,27,57,0.1)]"
                    >
                        <h2 className="text-[30px]">{guide.title}</h2>

                        <h3 className="mt-5 mb-2 text-[14px] uppercase tracking-[0.12em] opacity-75">{guide.wearHeading}</h3>
                        <ul className="space-y-1 text-[18px]">
                            {guide.wear.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>

                        <h3 className="mt-6 mb-2 text-[14px] uppercase tracking-[0.12em] opacity-75">Please avoid</h3>
                        <ul className="space-y-1 text-[18px] italic">
                            {guide.avoid.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}
