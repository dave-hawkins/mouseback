// app/blog/[slug]/post-content.tsx

"use client"

import ReactMarkdown from "react-markdown"

export default function PostContent({ post }: { post: any }) {
  return (
    <div className="mx-auto max-w-lg py-12">
      <h1 className="text-3xl font-bold">{post.frontMatter.title}</h1>
      <div className="py-12">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  )
}
