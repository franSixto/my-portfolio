import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("serviceUxUi", "es");

export default function Page() {
  return <ServiceScreen route="serviceUxUi" locale="es" />;
}
