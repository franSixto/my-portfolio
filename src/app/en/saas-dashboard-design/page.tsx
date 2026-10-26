import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionSaas", "en");

export default function Page() {
  return <ServiceScreen route="solutionSaas" locale="en" />;
}
