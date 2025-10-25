-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "avatarUrl" TEXT,
    "phone" TEXT NOT NULL UNIQUE,
    "isActive" BOOLEAN NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now'))
);

-- CreateTable
CREATE TABLE "bazi_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "inputData" TEXT NOT NULL,
    "resultData" TEXT NOT NULL,
    "analysis" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "description" TEXT,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "masters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "rating" REAL,
    "available" BOOLEAN NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "masterId" TEXT NOT NULL,
    "messages" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastMessage" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%f', 'now')),
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("masterId") REFERENCES "masters"("id") ON DELETE CASCADE
);