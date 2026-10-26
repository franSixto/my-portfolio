import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionEcommerce", "es");

export default function Page() {
  return <ServiceScreen route="solutionEcommerce" locale="es" />;
}
