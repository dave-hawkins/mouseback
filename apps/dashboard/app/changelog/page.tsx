import Footer from "@repo/dashboard/components/marketing/footer"
import { SiteHeader } from "@repo/dashboard/components/marketing/site-header"
import { getChangelogFiles } from "@repo/dashboard/lib/mdx"

import ChangelogPage from "./changelog-page"

export default async function Blog({}) {
  const posts = await getChangelogFiles()

  return (
    <div className="flex flex-col">
      <SiteHeader />
      <ChangelogPage posts={posts} />
      <Footer />
    </div>
  )
}
