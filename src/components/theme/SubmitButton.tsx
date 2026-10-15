import { IconType } from "react-icons";
import { buttonClasses } from "@/components/ui/ButtonLink";

interface SubmitButtonProps {
  isSubmitting: boolean;
  submittingText: string;
  defaultText: string;
  Icon?: IconType;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, submittingText, defaultText, Icon }) => {
  return (
    <button
      type="submit"
      className={buttonClasses({ variant: "primary", size: "lg", className: "w-full sm:w-auto cursor-pointer" })}
      disabled={isSubmitting}
      aria-busy={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <svg
            aria-hidden="true"
            className="size-4 animate-spin motion-reduce:animate-none"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          {submittingText}
        </>
      ) : (
        <>
          {defaultText}
          {Icon && <Icon aria-hidden="true" className="size-4" />}
        </>
      )}
    </button>
  );
};

export default SubmitButton;
