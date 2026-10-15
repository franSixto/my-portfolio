import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("serviceWebDesign", "es");

export default function Page() {
  return <ServiceScreen route="serviceWebDesign" locale="es" />;
}
