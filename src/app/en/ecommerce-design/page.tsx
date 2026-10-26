import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionEcommerce", "en");

export default function Page() {
  return <ServiceScreen route="solutionEcommerce" locale="en" />;
}
