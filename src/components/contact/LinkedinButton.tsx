import { SiLinkedin } from "react-icons/si";
import ButtonLink from "@/components/ui/ButtonLink";

export default function LinkedinButton({ className }: { className?: string }) {
  return (
    <ButtonLink
      href="https://www.linkedin.com/in/sixtofrancisco/"
      external
      variant="secondary"
      className={className}
    >
      <SiLinkedin aria-hidden="true" className="size-4" />
      Connect with me on LinkedIn
    </ButtonLink>
  );
}
