import fs from 'fs';
import path from 'path';
import { PortfolioDB } from '@/types';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export function getDB(): PortfolioDB {
  try {
    if (!fs.existsSync(DB_PATH)) {
      throw new Error(`DB file not found at ${DB_PATH}`);
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw) as PortfolioDB;
  } catch (error) {
    console.error('Error reading DB:', error);
    return {
      projects: [],
      skills: [],
      experiences: [],
      about: {
        heroStatement: "I build digital experiences that feel as good as they work.",
        subStatement: "Developer, builder, and problem solver creating thoughtful products with code, design, and curiosity.",
        location: "Based in India · Available worldwide",
        bioParagraphs: [],
        philosophyQuote: "Good software should disappear behind the experience.",
        contactEmail: "akshay@example.com",
        socialLinks: { github: "#", linkedin: "#", twitter: "#", resume: "#" }
      }
    };
  }
}

export function saveDB(data: PortfolioDB): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving DB:', error);
    return false;
  }
}
