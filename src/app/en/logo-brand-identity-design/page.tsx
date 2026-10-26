import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionBrandIdentity", "en");

export default function Page() {
  return <ServiceScreen route="solutionBrandIdentity" locale="en" />;
}
