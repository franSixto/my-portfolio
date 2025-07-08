"use client";

import Button from "@/components/theme/Button";

interface LiveProjectButtonProps {
  liveUrl: string;
}

export default function LiveProjectButton({ liveUrl }: LiveProjectButtonProps) {
  return (
    <div className="flex justify-center mb-8">
      <Button 
        to={liveUrl}
        target="_blank"
        className="shadow-lg hover:shadow-xl"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Ver proyecto en vivo
      </Button>
    </div>
  );
}
