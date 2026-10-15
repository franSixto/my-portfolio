import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("serviceWebDevelopment", "en");

export default function Page() {
  return <ServiceScreen route="serviceWebDevelopment" locale="en" />;
}
