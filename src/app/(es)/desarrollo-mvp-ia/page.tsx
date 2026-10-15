import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("serviceAiMvp", "es");

export default function Page() {
  return <ServiceScreen route="serviceAiMvp" locale="es" />;
}
