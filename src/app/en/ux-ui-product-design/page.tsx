import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("serviceUxUi", "en");

export default function Page() {
  return <ServiceScreen route="serviceUxUi" locale="en" />;
}
