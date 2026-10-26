import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionLanding", "en");

export default function Page() {
  return <ServiceScreen route="solutionLanding" locale="en" />;
}
