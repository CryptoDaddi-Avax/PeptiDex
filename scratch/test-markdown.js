import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src/content/blog');

function getAllSlugs() {
  const files = fs.readdirSync(contentDir);
  return files.filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''));
}

function testSlug(slug) {
  try {
    const fullPath = path.join(contentDir, `${slug}.md`);
    console.log(`Reading: ${fullPath}`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    console.log(`Success for ${slug}, title: ${data.title}`);
  } catch (e) {
    console.error(`Error for ${slug}:`, e);
  }
}

const slugs = getAllSlugs();
console.log(`Found ${slugs.length} slugs`);
slugs.forEach(testSlug);
