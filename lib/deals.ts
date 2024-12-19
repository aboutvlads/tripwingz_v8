import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { FlightDeal } from '@/types/flight';

const dealsDirectory = path.join(process.cwd(), 'content/deals');

export async function getAllDeals(): Promise<FlightDeal[]> {
  // Create deals directory if it doesn't exist
  if (!fs.existsSync(dealsDirectory)) {
    fs.mkdirSync(dealsDirectory, { recursive: true });
  }

  const fileNames = fs.readdirSync(dealsDirectory);
  const deals = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(dealsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        id: fileName.replace(/\.md$/, ''),
        ...data,
      } as FlightDeal;
    })
    .filter(deal => deal.status === 'published')
    .sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return deals;
}