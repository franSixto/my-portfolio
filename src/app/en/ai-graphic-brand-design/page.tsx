import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("serviceGraphicDesign", "en");

export default function Page() {
  return <ServiceScreen route="serviceGraphicDesign" locale="en" />;
}
