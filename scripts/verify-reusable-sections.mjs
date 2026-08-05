import fs from 'node:fs';
import path from 'node:path';
import { createClient } from 'next-sanity';

const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index === -1) continue;
    const key = trimmed.slice(0, index);
    const value = trimmed.slice(index + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0ikudzlw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

const result = await client.fetch(`{
  "reusable": *[_type == "reusableSections" && _id == "reusableSections"][0] {
    "hasPrestige": defined(prestigeSection),
    "hasAmenities": defined(amenitiesSection)
  },
  "pages": *[_id in ["home", "aboutPage", "locationPage", "residencesPage", "galleryPage", "contactPage"]] {
    _id,
    "sectionTypes": sections[]._type,
    "referenceCount": count(sections[_type == "reference"])
  }
}`);

console.log(JSON.stringify(result, null, 2));
