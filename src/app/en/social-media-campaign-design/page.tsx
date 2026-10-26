import ServiceScreen from "@/screens/ServiceScreen";
import { getServiceMetadata } from "@/content/services/seo";

export const metadata = getServiceMetadata("solutionSocialCampaigns", "en");

export default function Page() {
  return <ServiceScreen route="solutionSocialCampaigns" locale="en" />;
}
