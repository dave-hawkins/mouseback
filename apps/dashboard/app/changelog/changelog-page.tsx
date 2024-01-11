// app/blog/blog-page.tsx

"use client"

import Link from "next/link"

interface Post {
  slug: string
  title: string
}

interface Props {
  posts: Post[]
}

export default function ChangelogPage({ posts }: Props) {
  return (
    <div className="container flex flex-col items-start space-y-12 py-12">
      <h1 className="text-4xl font-semibold">Changelog</h1>
      <ul className="flex flex-col gap-3">
        {posts &&
          posts.map((post) => (
            <li key={post.slug} className="text-xl">
              <Link href={`/changelog/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}
