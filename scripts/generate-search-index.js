const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

// Configuration for content directories
const CONTENT_DIRS = [
  { path: 'docs', routePrefix: '/docs' },
  { path: 'users/docs', routePrefix: '/users' },
  { path: 'farmers/docs', routePrefix: '/farmers' },
  { path: 'labs/docs', routePrefix: '/labs' }
];

// Function to extract text content from markdown
function extractTextContent(content) {
  // Remove code blocks
  content = content.replace(/```[\s\S]*?```/g, '');
  // Remove inline code
  content = content.replace(/`[^`]*`/g, '');
  // Remove markdown links but keep the text
  content = content.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  // Remove markdown images
  content = content.replace(/!\[([^\]]*)\]\([^)]*\)/g, '');
  // Remove markdown headers
  content = content.replace(/^#{1,6}\s+/gm, '');
  // Remove markdown bold/italic
  content = content.replace(/\*\*([^*]*)\*\*/g, '$1');
  content = content.replace(/\*([^*]*)\*/g, '$1');
  // Remove HTML tags
  content = content.replace(/<[^>]*>/g, '');
  // Clean up extra whitespace
  content = content.replace(/\s+/g, ' ').trim();
  
  return content;
}

// Function to generate URL from file path
function generateUrl(filePath, contentDir, routePrefix) {
  // Get the full path to the content directory
  const contentDirPath = path.join(process.cwd(), contentDir);
  
  // Get relative path from content directory root
  const relativePath = path.relative(contentDirPath, filePath);
  
  // Convert to URL path
  let urlPath = relativePath
    .replace(/\.mdx?$/, '') // Remove .md/.mdx extension
    .replace(/\\/g, '/') // Convert backslashes to forward slashes
    .replace(/\/index$/, ''); // Remove /index from end
  
  // Remove Docusaurus numeric prefixes (e.g., "2_file" -> "file", "3node_building/6_boot" -> "3node_building/boot")
  urlPath = urlPath.replace(/\/(\d+)_/g, '/').replace(/^(\d+)_/, '');
  
  // Handle case where directory and filename are the same
  // e.g., tfconnect_toc/tfconnect_toc -> tfconnect_toc
  const pathParts = urlPath.split('/');
  if (pathParts.length >= 2) {
    const lastPart = pathParts[pathParts.length - 1];
    const secondLastPart = pathParts[pathParts.length - 2];
    if (lastPart === secondLastPart) {
      pathParts.pop(); // Remove the duplicate filename
      urlPath = pathParts.join('/');
    }
  }
  
  // Handle special cases
  if (urlPath === 'index' || urlPath === '') {
    urlPath = '';
  }
  
  // Construct final URL
  const finalUrl = routePrefix + (urlPath ? '/' + urlPath : '');
  
  return finalUrl;
}

// Function to process a single markdown file
function processMarkdownFile(filePath, contentDir, routePrefix) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    const textContent = extractTextContent(content);
    const url = generateUrl(filePath, contentDir, routePrefix);
    
    // Extract title from frontmatter or first heading
    let title = frontmatter.title || frontmatter.sidebar_label;
    if (!title) {
      const titleMatch = content.match(/^#\s+(.+)$/m);
      title = titleMatch ? titleMatch[1] : path.basename(filePath, path.extname(filePath));
    }
    
    return {
      id: filePath,
      title: title,
      url: url,
      content: textContent,
      // Add category based on route prefix
      category: routePrefix.replace('/', '') || 'docs'
    };
  } catch (error) {
    console.warn(`Warning: Could not process file ${filePath}:`, error.message);
    return null;
  }
}

// Main function to generate search index
function generateSearchIndex() {
  console.log('🔍 Generating search index...');
  
  const searchIndex = [];
  
  CONTENT_DIRS.forEach(({ path: contentPath, routePrefix }) => {
    const fullPath = path.join(process.cwd(), contentPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`📁 Skipping ${contentPath} - directory not found`);
      return;
    }
    
    console.log(`📁 Processing ${contentPath}...`);
    
    // Find all markdown files
    const markdownFiles = glob.sync('**/*.{md,mdx}', {
      cwd: fullPath,
      absolute: true,
      ignore: ['**/node_modules/**']
    });
    
    console.log(`   Found ${markdownFiles.length} files`);
    
    markdownFiles.forEach(filePath => {
      const doc = processMarkdownFile(filePath, contentPath, routePrefix);
      if (doc && doc.content.trim()) {
        searchIndex.push(doc);
      }
    });
  });
  
  console.log(`✅ Generated search index with ${searchIndex.length} documents`);
  
  // Ensure static directory exists
  const staticDir = path.join(process.cwd(), 'static');
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
  }
  
  // Write search index to static directory
  const indexPath = path.join(staticDir, 'search-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`💾 Search index saved to ${indexPath}`);
  
  return searchIndex;
}

// Run if called directly
if (require.main === module) {
  generateSearchIndex();
}

module.exports = { generateSearchIndex };
