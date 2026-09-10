export function generateDynamicSitemapXml(baseUrl = 'https://lamsat-emaar.com') {
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '#about', priority: '0.8', changefreq: 'weekly' },
    { path: '#services', priority: '0.9', changefreq: 'weekly' },
    { path: '#portfolio', priority: '0.9', changefreq: 'daily' },
    { path: '#articles', priority: '0.8', changefreq: 'weekly' },
    { path: '#contact', priority: '0.9', changefreq: 'monthly' }
  ];

  staticRoutes.forEach(r => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/${r.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
    xml += `    <priority>${r.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

export function downloadSitemapXml(xmlContent) {
  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
