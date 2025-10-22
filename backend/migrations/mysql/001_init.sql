-- MySQL minimal DDL for Bazi Fortune App
-- charset/engine
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS=0;

-- users
CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- bazi_data (简化，字段与你现有模型保持名称一致可由应用填充)
CREATE TABLE IF NOT EXISTS bazi_data (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  chat_id CHAR(36) NULL,
  analysis TEXT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_bazi_user(user_id),
  INDEX idx_bazi_chat(chat_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- chats
CREATE TABLE IF NOT EXISTS chats (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36) NULL,
  user_id CHAR(36) NOT NULL,
  master_id CHAR(36) NULL,
  bazi_input JSON NULL,
  is_trial TINYINT(1) NOT NULL DEFAULT 0,
  message_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_chats_user(user_id),
  INDEX idx_chats_master(master_id),
  INDEX idx_chats_order(order_id),
  INDEX idx_chats_trial(is_trial)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- messages（如存在）
CREATE TABLE IF NOT EXISTS messages (
  id CHAR(36) PRIMARY KEY,
  chat_id CHAR(36) NOT NULL,
  sender VARCHAR(50) NOT NULL,
  content TEXT,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_messages_chat(chat_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- masters（如存在）
CREATE TABLE IF NOT EXISTS masters (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  is_verified TINYINT(1) NOT NULL DEFAULT 0,
  is_online TINYINT(1) NOT NULL DEFAULT 0,
  rating DECIMAL(4,2) DEFAULT 0.00,
  invite_code VARCHAR(64) UNIQUE,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_masters_user(user_id),
  INDEX idx_masters_verified(is_verified),
  INDEX idx_masters_online(is_online),
  INDEX idx_masters_rating(rating),
  INDEX idx_masters_invite(invite_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- orders（如存在）
CREATE TABLE IF NOT EXISTS orders (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  master_id CHAR(36) NOT NULL,
  status VARCHAR(32) NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_orders_user(user_id),
  INDEX idx_orders_master(master_id),
  INDEX idx_orders_status(status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- almanac_detail
CREATE TABLE IF NOT EXISTS almanac_detail (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NULL,
  bazi_id CHAR(36) NULL,
  date DATE NOT NULL,
  lang VARCHAR(8) DEFAULT 'zh',
  vendor VARCHAR(32) NULL,
  data JSON NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_date (user_id, date),
  INDEX idx_almanac_bazi(bazi_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS=1;