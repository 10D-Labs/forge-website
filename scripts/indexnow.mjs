import fs from 'fs';

const KEY = '7a6f091d46994038827b33fa54a4d71c';
const HOST = 'forgetrainer.ai';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const LIVE_SITEMAP = `https://${HOST}/sitemap.xml`;
const LOCAL_SITEMAP = 'public/sitemap.xml';
const BATCH_SIZE = 10000; // IndexNow max per request

function extractUrls(xml) {
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function getAllUrls() {
  // Try live sitemap first (has all dynamically generated pages)
  // Fall back to local static file
  try {
    console.log(`Fetching live sitemap from ${LIVE_SITEMAP}...`);
    const res = await fetch(LIVE_SITEMAP);
    if (res.ok) {
      const xml = await res.text();
      const urls = extractUrls(xml);
      console.log(`Found ${urls.length} URLs from live sitemap.\n`);
      return urls;
    }
    console.log(`Live sitemap returned ${res.status}, falling back to local file.`);
  } catch (e) {
    console.log(`Could not fetch live sitemap: ${e.message}`);
    console.log('Falling back to local sitemap file.\n');
  }

  const xml = fs.readFileSync(LOCAL_SITEMAP, 'utf8');
  const urls = extractUrls(xml);
  console.log(`Found ${urls.length} URLs from local sitemap.\n`);
  return urls;
}

async function submitBatch(urls) {
  const body = {
    host: HOST,
    key: KEY,
    urlList: urls,
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  return { status: res.status, statusText: res.statusText };
}

async function submitUrls(urls) {
  console.log(`Submitting ${urls.length} URL(s) to IndexNow...`);

  // Split into batches if needed
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(urls.length / BATCH_SIZE);

    if (totalBatches > 1) {
      console.log(`\nBatch ${batchNum}/${totalBatches} (${batch.length} URLs)...`);
    }

    const { status, statusText } = await submitBatch(batch);
    console.log(`Response: ${status} ${statusText}`);

    if (status === 200) {
      console.log('URLs submitted successfully.');
    } else if (status === 202) {
      console.log('Accepted. Key validation pending.');
    } else {
      console.error(`Batch ${batchNum} failed.`);
      process.exit(1);
    }
  }
}

// Parse args: specific URLs, or all from sitemap (default)
const args = process.argv.slice(2);
let urls;

if (args.length > 0 && args[0] !== '--all') {
  // Specific URLs passed as arguments
  urls = args.map(u => u.startsWith('http') ? u : `https://${HOST}${u.startsWith('/') ? '' : '/'}${u}`);
  console.log(`URLs to submit (${urls.length}):`);
  urls.forEach(u => console.log(`  ${u}`));
  console.log('');
} else {
  urls = await getAllUrls();
}

if (urls.length === 0) {
  console.error('No URLs found. Check your sitemap or provide URLs as arguments.');
  process.exit(1);
}

await submitUrls(urls);
