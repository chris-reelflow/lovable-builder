const fs = require('fs-extra');
const csv = require('csv-parser');
const path = require('path');

// Utility function to create URL-friendly slug from company name
function createSlug(companyName) {
  return companyName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// Load and parse template
async function loadTemplate() {
  try {
    const templatePath = path.join(__dirname, '../templates/landing-page.html');
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
    
    // Load template
    const template = await loadTemplate();
    console.log('✅ Template loaded successfully');
    
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
              // Create company-specific directory
              const companySlug = createSlug(row.company_name);
              const pageDir = path.join(outputDir, companySlug);
              await fs.ensureDir(pageDir);
              
              // Generate HTML content
              const htmlContent = populateTemplate(template, row);
              
              // Write index.html file
              const htmlPath = path.join(pageDir, 'index.html');
              await fs.writeFile(htmlPath, htmlContent);
              
              console.log(`✅ Generated: /${companySlug}/index.html`);
            } catch (error) {
              console.error(`❌ Error generating page for ${row.company_name}:`, error.message);
            }
          }
          
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
if (require.main === module) {
  generatePages();
}

module.exports = { generatePages, createSlug };