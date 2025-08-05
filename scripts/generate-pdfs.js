const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDFs() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Configuración para PDF de alta calidad
    const pdfOptions = {
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: false
    };

    // Generar PDF en español
    console.log('Generando CV en español...');
    const htmlPathEs = path.join(process.cwd(), 'public', 'cv-carlos-montoya-es.html');
    const pdfPathEs = path.join(process.cwd(), 'public', 'cv-carlos-montoya-es.pdf');
    
    await page.goto(`file://${htmlPathEs}`, { waitUntil: 'networkidle0' });
    await page.pdf({ ...pdfOptions, path: pdfPathEs });
    
    console.log('CV en español generado: cv-carlos-montoya-es.pdf');

    // Generar PDF en inglés
    console.log('Generando CV en inglés...');
    const htmlPathEn = path.join(process.cwd(), 'public', 'cv-carlos-montoya-en.html');
    const pdfPathEn = path.join(process.cwd(), 'public', 'cv-carlos-montoya-en.pdf');
    
    await page.goto(`file://${htmlPathEn}`, { waitUntil: 'networkidle0' });
    await page.pdf({ ...pdfOptions, path: pdfPathEn });
    
    console.log('CV en inglés generado: cv-carlos-montoya-en.pdf');

  } catch (error) {
    console.error('Error generando PDFs:', error);
  } finally {
    await browser.close();
  }
}

generatePDFs();
