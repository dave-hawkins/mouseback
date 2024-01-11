"use client"

import ReactMarkdown from "react-markdown"

interface PostProps {
  post: {
    frontMatter: {
      title: string
      wordCount: number
      readingTime: number
      slug: string | null
    }
    content: string
  }
}

export default function PostContent({ post }: PostProps) {
  return (
    <div className="mx-auto max-w-lg py-12">
      <h1 className="text-3xl font-bold">{post.frontMatter.title}</h1>
      <div className="py-12">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  )
}
