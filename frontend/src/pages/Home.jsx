import React from "react";
import HeroSection from "@/components/HeroSection";
import Feature from "@/components/Feature";
import HowToUse from "@/components/HowToUse";
import Design from "@/components/Design";

export default function Home() {
  const features = [
    {
      avatar: "search.png",
      title: `Sequence Input`,
      desc: `

                CRISPRnase accepts gene sequences through direct input or file
                upload, supporting various file formats.

`,
    },
    {
      avatar: "analyze.png",
      title: `Analysis`,
      desc: `

                Our advanced algorithms analyze the sequence, identifying key
                features and potential CRISPR target sites.
`,
    },
    {
      avatar: "results.png",
      title: `
   Results
`,
      desc: `
                CRISPRnase provides detailed insights, including potential
                off-target effects and efficiency predictions.

`,
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        <div>
          <Design />
        </div>

        <Feature />

        <section id="whatweprovide">
          <div className="flex items-center justify-center">
            <p className="hr  mt-12 text-3xl font-semibold text-blue-600">
              How CRISPRnase Works
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-[var(--screen-max)]">
            <ul className="grid place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
              {features.map((item, idx) => (
                <li key={idx} className="w-full bg-[#2561c1]  p-4  rounded-lg">
                  <div className="mx-auto h-24 w-24 rounded-full bg-white p-2">
                    <img
                      src={item.avatar}
                      className="h-full w-full rounded-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="font-semibold text-white sm:text-lg ">
                      {item.name}
                    </h4>
                    <p className="text-center text-2xl font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-white font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container max-w-[80%] mx-auto" id="howtouse">
          <div className="flex items-center justify-center">
            <p className="hr  mt-12 text-4xl font-semibold text-blue-500 ">
              How to use
            </p>
          </div>

          <HowToUse />
        </section>
      </main>
    </div>
  );
}
