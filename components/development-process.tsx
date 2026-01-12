"use client";

import React from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery & Strategic Planning",
    description: "We analyze your business needs, assess market fit, and create a comprehensive digital strategy and development roadmap.",
  },
  {
    number: "02",
    title: "Design & Prototyping",
    description: "Our designers create intuitive interfaces and interactive prototypes.",
  },
  {
    number: "03",
    title: "Development & Testing",
    description: "We build your solution with clean code and rigorous testing.",
  },
  {
    number: "04",
    title: "Deployment & Optimization",
    description: "We launch your product and continuously optimize for performance.",
  },
  {
    number: "05",
    title: "Maintenance & Growth",
    description: "We provide ongoing support and implement new features for growth.",
  },
];

const TimelineNode = ({ number, isLeft }: { number: string; isLeft: boolean }) => (
  <div className={`flex items-center gap-2 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
    <span className="px-2.5 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-cyan-500 to-pink-500">
      {number}
    </span>
    <div className="w-3 h-3 rounded-full bg-teal-500 border-2 border-white shadow-md z-10"></div>
  </div>
);

const ProcessStepCard = ({ 
  step, 
  index 
}: { 
  step: ProcessStep; 
  index: number;
}) => {
  const isLeft = index % 2 === 0;
  
  return (
    <div className="relative flex items-center justify-center">
      {isLeft ? (
        <>
          <div className="w-5/12 pr-8 text-right">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
          </div>
          <div className="w-2/12 flex justify-center">
            <TimelineNode number={step.number} isLeft={isLeft} />
          </div>
          <div className="w-5/12"></div>
        </>
      ) : (
        <>
          <div className="w-5/12"></div>
          <div className="w-2/12 flex justify-center">
            <TimelineNode number={step.number} isLeft={isLeft} />
          </div>
          <div className="w-5/12 pl-8 text-left">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

const MobileProcessStep = ({ step, isLast }: { step: ProcessStep; isLast: boolean }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <span className="px-2.5 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 mb-2">
        {step.number}
      </span>
      <div className="w-3 h-3 rounded-full bg-teal-500 border-2 border-white shadow-md"></div>
      {!isLast && <div className="w-0.5 h-full bg-teal-400 mt-2"></div>}
    </div>
    <div className="pb-10">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
    </div>
  </div>
);

export default function DevelopmentProcess() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Our Development{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
            Process
          </span>
        </h2>
      </div>

      <div className="hidden md:block max-w-4xl mx-auto relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-teal-400"></div>
        
        <div className="space-y-16">
          {steps.map((step, index) => (
            <ProcessStepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>

      <div className="md:hidden max-w-md mx-auto">
        {steps.map((step, index) => (
          <MobileProcessStep key={step.number} step={step} isLast={index === steps.length - 1} />
        ))}
      </div>
    </section>
  );
}
