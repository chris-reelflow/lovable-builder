import fs from 'fs-extra';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility function to create URL-friendly slug from company name
function createSlug(companyName) {
  return companyName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Load and parse template based on template type
async function loadTemplate(templateType = 'website') {
  try {
    const templateName = templateType === 'abm' ? 'landing-page-abm.html' : 'landing-page.html';
    const templatePath = path.join(__dirname, '../templates/', templateName);
    console.log(`📄 Loading template: ${templateName}`);
    return await fs.readFile(templatePath, 'utf8');
  } catch (error) {
    console.error('Error loading template:', error.message);
    process.exit(1);
  }
}

// Replace template variables with CSV data
function populateTemplate(template, data) {
  let populatedTemplate = template;
  
  // Replace all CSV column values in template
  Object.keys(data).forEach(key => {
    const placeholder = `{{${key}}}`;
    const value = data[key] || '';
    populatedTemplate = populatedTemplate.replace(new RegExp(placeholder, 'g'), value);
  });
  
  // Add computed values
  const companySlug = createSlug(data.company_name);
  populatedTemplate = populatedTemplate.replace(/{{company_slug}}/g, companySlug);
  
  return populatedTemplate;
}

// Generate pages from CSV
async function generatePages() {
  console.log('🚀 Starting ReelFlow landing page generation...');
  
  try {
    // Ensure output directory exists
    const outputDir = path.join(__dirname, '../output');
    await fs.ensureDir(outputDir);
    
    // Copy assets directory to output
    const assetsSourceDir = path.join(__dirname, '../assets');
    const assetsOutputDir = path.join(outputDir, 'assets');
    
    console.log('📦 Copying assets...');
    await fs.copy(assetsSourceDir, assetsOutputDir, {
      overwrite: true,
      errorOnExist: false
    });
    console.log('✅ Assets copied successfully');
    
    // Process each row to determine template usage
    const templateUsage = { website: 0, abm: 0 };
    
    // Read and process CSV
    const csvPath = path.join(__dirname, '../data/landingpages.csv');
    const results = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          console.log(`📊 Processing ${results.length} landing page(s)...`);
          
          for (const row of results) {
            try {
              // Determine template type (default to 'website' if not specified)
              const templateType = row.template_type || 'website';
              templateUsage[templateType] = (templateUsage[templateType] || 0) + 1;
              
              // Load appropriate template
              const template = await loadTemplate(templateType);
              
              // Create company-specific directory
              const companySlug = createSlug(row.company_name);
              const pageDir = path.join(outputDir, companySlug);
              await fs.ensureDir(pageDir);
              
              // Generate HTML content
              const htmlContent = populateTemplate(template, row);
              
              // Write index.html file
              const htmlPath = path.join(pageDir, 'index.html');
              await fs.writeFile(htmlPath, htmlContent);
              
              console.log(`✅ Generated: /${companySlug}/index.html (${templateType} template)`);
            } catch (error) {
              console.error(`❌ Error generating page for ${row.company_name}:`, error.message);
            }
          }
          
          console.log(`📊 Template usage: Website: ${templateUsage.website}, ABM: ${templateUsage.abm || 0}`);
          
          console.log('🎉 Landing page generation complete!');
          console.log(`📁 Pages generated in: ${outputDir}`);
          resolve();
        })
        .on('error', reject);
    });
    
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePages();
}

export { generatePages, createSlug };