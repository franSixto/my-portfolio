import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("serviceWebDesign", "en");

export default function Page() {
  return <ServiceScreen route="serviceWebDesign" locale="en" />;
}
