import Database from 'better-sqlite3';
import path from 'path';

export interface NGO {
  id: number;
  name: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NGOCreate = Omit<NGO, 'id' | 'createdAt' | 'updatedAt'>;

export interface NGOUpdate extends Partial<NGOCreate> {
  id: number;
}

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS ngos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    website TEXT,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    rating REAL DEFAULT 0,
    reviewCount INTEGER DEFAULT 0,
    isActive BOOLEAN DEFAULT 1,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create indexes for better search performance
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_category ON ngos(category);
  CREATE INDEX IF NOT EXISTS idx_name ON ngos(name);
  CREATE INDEX IF NOT EXISTS idx_active ON ngos(isActive);
`);

export const ngoQueries = {
  getAll: db.prepare(`
    SELECT * FROM ngos 
    WHERE isActive = 1 
    ORDER BY rating DESC, name ASC
  `),
  
  getById: db.prepare(`
    SELECT * FROM ngos 
    WHERE id = ? AND isActive = 1
  `),
  
  search: db.prepare(`
    SELECT * FROM ngos 
    WHERE isActive = 1 
    AND (name LIKE ? OR description LIKE ? OR address LIKE ?)
    ORDER BY rating DESC, name ASC
  `),
  
  filterByCategory: db.prepare(`
    SELECT * FROM ngos 
    WHERE isActive = 1 AND category = ?
    ORDER BY rating DESC, name ASC
  `),
  
  searchAndFilter: db.prepare(`
    SELECT * FROM ngos 
    WHERE isActive = 1 
    AND category = ?
    AND (name LIKE ? OR description LIKE ? OR address LIKE ?)
    ORDER BY rating DESC, name ASC
  `),
  
  create: db.prepare(`
    INSERT INTO ngos (name, address, phone, email, website, category, description, rating, reviewCount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),
  
  update: db.prepare(`
    UPDATE ngos 
    SET name = ?, address = ?, phone = ?, email = ?, website = ?, 
        category = ?, description = ?, rating = ?, reviewCount = ?,
        updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  
  delete: db.prepare(`
    UPDATE ngos 
    SET isActive = 0, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  
  getAllForAdmin: db.prepare(`
    SELECT * FROM ngos 
    ORDER BY createdAt DESC
  `)
};

export default db;