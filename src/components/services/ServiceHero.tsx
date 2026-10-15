"use client";


// Same visual language as TitleH1, but sized for the longer, sentence-style
// headlines of the service pages (no uppercase, comfortable line height).
// Rendered without an entrance animation so the H1 (LCP element) is visible immediately.
export default function ServiceHero({ title, intro }: { title: string; intro: string }) {

  return (
    <div className="mb-12 text-center max-w-3xl">
      <h1
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-accent mb-6 transition-colors duration-300`}
      >
        {title}
      </h1>
      <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">{intro}</p>
    </div>
  );
}
