// lib/mdx.ts

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const root = process.cwd()

// Existing functions for blog
export async function getBlogFiles() {
  return getFiles('blog');
}

export async function getBlogFileBySlug(slug: string) {
  return getFileBySlug(slug, 'blog');
}

// New functions for changelog
export async function getChangelogFiles() {
  return getFiles('changelog');
}

export async function getChangelogFileBySlug(slug:string) {
  return getFileBySlug(slug, 'changelog');
}

// Generic functions to get files and file by slug
async function getFiles(type: string) {
  const files = fs.readdirSync(path.join(root, 'app', type, 'posts'))
  return files.map(file => {
    const source = fs.readFileSync(path.join(root, 'app', type, 'posts', file), 'utf8')
    const { data } = matter(source)
    return {
      slug: file.replace('.mdx', ''),
      title: data.title
    }
  });
}

async function getFileBySlug(slug: string, type: string) {
  if (!slug) {
    throw new Error('Slug is undefined');
  }
  const source = fs.readFileSync(path.join(root, 'app', type, 'posts', `${slug}.mdx`), 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await serialize(content)

  const result = {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: Math.round(content.split(/\s+/gu).length / 200),
     title: data.title, // ensure title is included
      slug: slug || null,
      ...data,
    },
    content,
  }

  return result;
}