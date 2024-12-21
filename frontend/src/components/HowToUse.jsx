import React from "react";

const HowToUse = () => {
  return (
    <div className=" mx-auto h-full max-w-[var(--screen-max)] ">
      <div className="wrap relative h-full overflow-hidden py-10">
        <div className="border-2-2 absolute left-[50%] h-full border border-gray-700 border-opacity-20"></div>
        <div className="right-timeline mb-8 flex w-full items-center justify-between">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 order-1 flex h-10 w-10 items-center rounded-full bg-gray-800 shadow-xl">
            <h1 className="mx-auto text-lg font-semibold text-white">1</h1>
          </div>
          <div className="order-1 w-5/12 rounded-lg bg-[var(--bg-secondary)] px-6 py-4 shadow-xl">
            <h3 className="mb-3 text-lg font-bold text-gray-800">
              Input Target Gene
            </h3>
            <p className=" leading-snug tracking-wide text-gray-900 text-opacity-100">
              Enter the gene name or transcript ID in the search field. Specify
              the genome (e.g., human, mouse) and promoter type for accurate
              sgRNA design.
            </p>
          </div>
        </div>

        <div className="left-timeline mb-8 flex w-full flex-row-reverse items-center justify-between">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 order-1 flex h-10 w-10 items-center rounded-full bg-gray-800 shadow-xl">
            <h1 className="mx-auto text-xl font-semibold text-white">2</h1>
          </div>
          <div className="bg- order-1 w-5/12 rounded-lg bg-[#2571e1] px-6 py-4 shadow-xl">
            <h3 className="mb-3 text-lg font-bold text-white">
              Generate sgRNA
            </h3>
            <p className="text-base font-medium leading-snug tracking-wide text-white text-opacity-100">
              Click “Submit” to generate potential sgRNA sequences. The tool
              computes and ranks sequences based on efficiency and specificity
              scores.
            </p>
          </div>
        </div>

        <div className="right-timeline mb-8 flex w-full items-center justify-between">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 order-1 flex h-10 w-10 items-center rounded-full bg-gray-800 shadow-xl">
            <h1 className="mx-auto text-lg font-semibold text-white">3</h1>
          </div>
          <div className="order-1 w-5/12 rounded-lg bg-[var(--bg-secondary)] px-6 py-4 shadow-xl">
            <h3 className="mb-3  font-bold text-gray-800">Analyze Results</h3>
            <p className="text-lg leading-snug tracking-wide text-gray-900 text-opacity-100">
              View results in a detailed table or export them. Download sgRNA
              data or visualize top hits in the UCSC Genome Browser.
            </p>
          </div>
        </div>

        <div className="left-timeline mb-8 flex w-full flex-row-reverse items-center justify-between">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 order-1 flex h-10 w-10 items-center rounded-full bg-gray-800 shadow-xl">
            <h1 className="mx-auto text-lg font-semibold text-white">4</h1>
          </div>
          <div className="order-1 w-5/12 rounded-lg bg-[#2571e1] px-6 py-4 shadow-xl">
            <h3 className="mb-3 text-lg font-bold text-white">Select sgRNA</h3>
            <p className="text-lg font-medium leading-snug tracking-wide text-white text-opacity-100 ">
              Choose sgRNAs with the best E+S scores. Use these guides for
              genome editing experiments while considering off-target
              predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
