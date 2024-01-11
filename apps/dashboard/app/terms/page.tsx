import Footer from "@repo/dashboard/components/marketing/footer"
import { SiteHeader } from "@repo/dashboard/components/marketing/site-header"

export default function TermsPage() {
  return (
    <div className="flex flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full">Here is the terms page</div>
      <Footer />
    </div>
  )
}
