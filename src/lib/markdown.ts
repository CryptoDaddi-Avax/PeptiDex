import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src/content/blog');

export function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(contentDir, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (e) {
    return null;
  }
}

export function getAllSlugs() {
  try {
    if (!fs.existsSync(contentDir)) {
      return [];
    }
    const files = fs.readdirSync(contentDir);
    return files.filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
  } catch (e) {
    return [];
  }
}
