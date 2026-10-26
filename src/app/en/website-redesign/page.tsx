import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionRedesign", "en");

export default function Page() {
  return <ServiceScreen route="solutionRedesign" locale="en" />;
}
