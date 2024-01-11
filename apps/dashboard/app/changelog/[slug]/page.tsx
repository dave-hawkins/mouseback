import Footer from "@repo/dashboard/components/marketing/footer"
import { SiteHeader } from "@repo/dashboard/components/marketing/site-header"
import { getChangelogFileBySlug } from "@repo/dashboard/lib/mdx"

import PostContent from "./post-content"

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getChangelogFileBySlug(params.slug)

  return (
    <div className="flex flex-col">
      <SiteHeader />
      <PostContent post={post} />
      <Footer />
    </div>
  )
}
