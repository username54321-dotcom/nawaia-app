const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Configuration
const BASE_URL = 'https://nawaia.net';
// Credentials from utils/supabase.ts
const SUPABASE_URL =
  process.env.EXPO_SUPABASE_BASE_URL || 'https://hdxnyotrpjmrigmpdpkn.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkeG55b3RycGptcmlnbXBkcGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NTQyMDgsImV4cCI6MjA3NTQzMDIwOH0.CzVGOVOXPqI4bZtlcDmmqgx0UKQRKpuR5mooSs2fLcw';

const EXCLUDED_FILES = ['_layout.tsx', '+not-found.tsx', '+html.tsx', 'index.tsx']; // index.tsx is handled specially
const EXCLUDED_DIRS = ['components', 'hooks', 'constants', 'scripts']; // Just in case

async function getDynamicRoutes() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const routes = [];

  try {
    // Fetch Books
    const { data: books, error: booksError } = await supabase.from('books').select('id');

    if (booksError) {
      console.error('Error fetching books:', booksError);
    } else {
      books.forEach((book) => {
        routes.push(`/Book?id=${book.id}`);
      });
      console.log(`Fetched ${books.length} books.`);
    }

    // Fetch Courses
    const { data: courses, error: coursesError } = await supabase.from('courses').select('id');

    if (coursesError) {
      console.error('Error fetching courses:', coursesError);
    } else {
      courses.forEach((course) => {
        routes.push(`/Course?id=${course.id}`);
      });
      console.log(`Fetched ${courses.length} courses.`);
    }
  } catch (err) {
    console.error('Unexpected error fetching dynamic data:', err);
  }

  return routes;
}

function getStaticRoutes(dir, basePath = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
        // Group route (e.g., (drawer), (Pages)), skip name in path but traverse children
        routes = routes.concat(getStaticRoutes(fullPath, basePath));
      } else {
        // Normal folder path if any (Expo router usually handles groups, but if there was `app/something/index.tsx`)
        // We generally assume most folders in app matching path unless group
        routes = routes.concat(getStaticRoutes(fullPath, `${basePath}/${entry.name}`));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (ext === '.tsx' || ext === '.js' || ext === '.jsx' || ext === '.ts') {
        if (entry.name === 'index.tsx' || entry.name === 'index.js') {
          routes.push(basePath === '' ? '/' : basePath);
        } else if (!EXCLUDED_FILES.includes(entry.name) && !entry.name.includes('[')) {
          // Ignore dynamic file routes like [id].tsx because we handle them manually or they require params
          const updateName = entry.name.replace(ext, '');
          routes.push(`${basePath}/${updateName}`);
        }
      }
    }
  }

  return routes;
}

function generateXml(urls) {
  const xmlUrls = urls
    .map(
      (url) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${xmlUrls}
</urlset>`;
}

async function main() {
  const appDir = path.join(process.cwd(), 'app');
  const publicDir = path.join(process.cwd(), 'public');

  console.log('Scanning static routes...');
  const staticRoutes = getStaticRoutes(appDir);
  console.log(`Found ${staticRoutes.length} static routes.`);

  console.log('Fetching dynamic routes...');
  const dynamicRoutes = await getDynamicRoutes();

  const allRoutes = [...new Set([...staticRoutes, ...dynamicRoutes])].filter((route) => {
    return (
      !route.toLowerCase().includes('Admin') &&
      !route.includes('_layout') &&
      !route.includes('+html')
    );
  });
  console.log(`Total unique routes: ${allRoutes.length}`);

  const xml = generateXml(allRoutes);

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`Sitemap generated at ${sitemapPath}`);
}

main();
