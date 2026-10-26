import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionDesignSystem", "en");

export default function Page() {
  return <ServiceScreen route="solutionDesignSystem" locale="en" />;
}
