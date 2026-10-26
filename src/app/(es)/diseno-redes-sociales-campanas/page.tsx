import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionSocialCampaigns", "es");

export default function Page() {
  return <ServiceScreen route="solutionSocialCampaigns" locale="es" />;
}
