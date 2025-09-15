import fs from 'fs-extra';
import csv from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility function to create URL-friendly slug from company name
function createSlug(companyName = '') {
  return companyName
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, '') // Keep hyphens and underscores
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^[-_]+|[-_]+$/g, ''); // Trim leading/trailing hyphens/underscores
}

// Load and parse template based on template type
async function loadTemplate(templateType = 'website') {
  try {
    const templateName = templateType === 'abm' ? 'abm-landing-page.html' : 'website-landing-page.html';
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
  const providedSlug = (data.company_slug || '').toString().trim();
  const companySlug = providedSlug ? createSlug(providedSlug) : createSlug(data.company_name);
  populatedTemplate = populatedTemplate.replace(/{{company_slug}}/g, companySlug);
  
  return populatedTemplate;
}

// Generate pages from CSV files
async function generatePages(csvFile = null) {
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
    
    // Determine which CSV files to process
    const csvFiles = [];
    if (csvFile) {
      csvFiles.push(csvFile);
    } else {
      // Process both CSV files if no specific file provided
      const websitesPath = path.join(__dirname, '../data/websites.csv');
      const abmPath = path.join(__dirname, '../data/abm.csv');
      
      if (await fs.pathExists(websitesPath)) {
        csvFiles.push('websites.csv');
      }
      if (await fs.pathExists(abmPath)) {
        csvFiles.push('abm.csv');
      }
    }
    
    console.log(`📊 Processing ${csvFiles.length} CSV file(s): ${csvFiles.join(', ')}`);
    
    // Process each CSV file
    for (const csvFileName of csvFiles) {
      const csvPath = path.join(__dirname, '../data', csvFileName);
      console.log(`\n📄 Processing ${csvFileName}...`);
      const results = [];
      // Detect delimiter (CSV vs TSV)
      let separator = ',';
      try {
        const sample = await fs.readFile(csvPath, 'utf8');
        const firstLine = (sample.split('\n')[0] || '').trim();
        if (firstLine.includes('\t')) separator = '\t';
      } catch {}

      await new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
          .pipe(csv({ separator, mapHeaders: ({ header }) => header.trim() }))
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            console.log(`📊 Processing ${results.length} landing page(s) from ${csvFileName}...`);
            
            for (const row of results) {
              try {
                // Determine template type based on use case column or CSV file name
                const useCase = row.use_case || row['Use Case'] || csvFileName;
                let templateType;
                
                if (csvFileName === 'abm.csv' || useCase.toLowerCase() === 'abm') {
                  templateType = 'abm';
                } else {
                  templateType = 'website';
                }
                
                templateUsage[templateType] = (templateUsage[templateType] || 0) + 1;
                
                // Load appropriate template
                const template = await loadTemplate(templateType);
                
                // Prefer CSV-provided slug when available
                const providedSlug = (row.company_slug || '').toString().trim();
                const companySlug = providedSlug ? createSlug(providedSlug) : createSlug(row.company_name);
                const pageDir = path.join(outputDir, companySlug);
                await fs.ensureDir(pageDir);
                
                // Generate HTML content
                const htmlContent = populateTemplate(template, row);
                
                // Write index.html file
                const htmlPath = path.join(pageDir, 'index.html');
                await fs.writeFile(htmlPath, htmlContent);
                
                console.log(`✅ Generated: /${companySlug}/index.html (${templateType} template from ${csvFileName})`);
              } catch (error) {
                console.error(`❌ Error generating page for ${row.company_name}:`, error.message);
              }
            }
            resolve();
          })
          .on('error', reject);
      });
    }
    
    console.log(`\n📊 Final template usage: Website: ${templateUsage.website}, ABM: ${templateUsage.abm || 0}`);
    console.log('🎉 Landing page generation complete!');
    console.log(`📁 Pages generated in: ${outputDir}`);
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  // Check for specific CSV file argument
  const csvFile = process.argv[2];
  generatePages(csvFile);
}

export { generatePages, createSlug };