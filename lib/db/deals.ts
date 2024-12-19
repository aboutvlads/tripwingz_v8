import fs from 'fs';
import path from 'path';
import type { FlightDeal } from '@/types/flight';

const DB_PATH = path.join(process.cwd(), 'data', 'db');
const DEALS_FILE = path.join(DB_PATH, 'deals.json');

// Ensure the database directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize empty deals file if it doesn't exist
if (!fs.existsSync(DEALS_FILE)) {
  fs.writeFileSync(DEALS_FILE, JSON.stringify([], null, 2));
}

function readDealsFile(): FlightDeal[] {
  try {
    const data = fs.readFileSync(DEALS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading deals file:', error);
    return [];
  }
}

function writeDealsFile(deals: FlightDeal[]): void {
  try {
    fs.writeFileSync(DEALS_FILE, JSON.stringify(deals, null, 2));
  } catch (error) {
    console.error('Error writing deals file:', error);
  }
}

export function getAllDeals(): FlightDeal[] {
  return readDealsFile();
}

export function getDealById(id: string): FlightDeal | null {
  const deals = readDealsFile();
  return deals.find(deal => deal.id === id) || null;
}

export function createDeal(dealData: Omit<FlightDeal, 'id'>): FlightDeal {
  const deals = readDealsFile();
  
  // Generate a unique ID
  const newDeal: FlightDeal = {
    ...dealData,
    id: `deal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  
  // Add to deals array
  deals.unshift(newDeal); // Add to beginning of array
  writeDealsFile(deals);
  
  return newDeal;
}

export function updateDeal(id: string, updates: Partial<FlightDeal>): FlightDeal | null {
  const deals = readDealsFile();
  const index = deals.findIndex(deal => deal.id === id);
  
  if (index === -1) return null;
  
  deals[index] = { ...deals[index], ...updates };
  writeDealsFile(deals);
  
  return deals[index];
}

export function deleteDeal(id: string): boolean {
  const deals = readDealsFile();
  const filteredDeals = deals.filter(deal => deal.id !== id);
  
  if (filteredDeals.length === deals.length) return false;
  
  writeDealsFile(filteredDeals);
  return true;
}