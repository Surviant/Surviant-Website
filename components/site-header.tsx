import SiteHeaderClient from "@/components/site-header-client"
import { publicOfferingOptions } from "@/lib/content/services"

export default function SiteHeader() {
  const serviceGroups = publicOfferingOptions.map((group) => ({
    title: group.practiceTitle,
    href: `/services/${group.practiceSlug}`,
    offerings: group.offerings.map((offering) => ({
      title: offering.shortTitle,
      href: `/services/${group.practiceSlug}/${offering.slug}`,
    })),
  }))

  return <SiteHeaderClient serviceGroups={serviceGroups} />
}
