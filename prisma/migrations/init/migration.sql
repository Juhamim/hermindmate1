-- CreateTable
CREATE TABLE IF NOT EXISTS "Doctor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "views" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Insert initial doctors
INSERT OR IGNORE INTO "Doctor" ("id", "name", "role", "bio", "fee", "photo", "status", "createdAt", "updatedAt") VALUES
('doc1', 'Dr. Lakshmi Nair', 'Clinical Psychologist', 'Specializing in postpartum depression and women''s mental health with over 10 years of experience.', 1500, 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300', 'Active', datetime('now'), datetime('now')),
('doc2', 'Dr. Priya Kumar', 'Psychiatrist', 'Expert in adolescent mental health and anxiety disorders, helping teens navigate life challenges.', 2000, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300', 'Active', datetime('now'), datetime('now'));

-- Insert initial services
INSERT OR IGNORE INTO "Service" ("id", "title", "description", "icon", "color", "createdAt", "updatedAt") VALUES
('svc1', 'Clinical Psychology', 'Evidence-based therapy for depression, anxiety, and trauma', 'Brain', '#FFB7B2', datetime('now'), datetime('now')),
('svc2', 'Adolescent Care', 'Specialized support for teens navigating identity and peer pressure', 'Sparkles', '#C7CEEA', datetime('now'), datetime('now')),
('svc3', 'Pregnancy Support', 'Mental health care during pregnancy and postpartum', 'Baby', '#E8D5F2', datetime('now'), datetime('now'));
