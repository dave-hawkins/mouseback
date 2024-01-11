import Footer from "@repo/dashboard/components/marketing/footer"
import { SiteHeader } from "@repo/dashboard/components/marketing/site-header"
import { getBlogFiles } from "@repo/dashboard/lib/mdx"

import BlogPage from "./blog-page"

export default async function Blog({}) {
  const posts = await getBlogFiles()

  return (
    <div className="flex flex-col">
      <SiteHeader />
      <BlogPage posts={posts} />
      <Footer />
    </div>
  )
}
