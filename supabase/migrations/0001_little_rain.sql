/*
  # Add social features to deals

  1. New Tables
    - `reactions` - Stores user reactions to deals
      - `id` (uuid, primary key)
      - `deal_id` (uuid, references deals)
      - `user_id` (uuid, references profiles)
      - `type` (text) - Type of reaction (like, heart, etc)
      - `created_at` (timestamp)
    
    - `comments` - Stores user comments on deals
      - `id` (uuid, primary key)
      - `deal_id` (uuid, references deals)
      - `user_id` (uuid, references profiles)
      - `content` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create reactions table
CREATE TABLE reactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('like', 'heart', 'wow', 'plane')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(deal_id, user_id, type)
);

-- Create comments table
CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Reactions policies
CREATE POLICY "Anyone can view reactions"
    ON reactions FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can add reactions"
    ON reactions FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions"
    ON reactions FOR DELETE
    USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Anyone can view comments"
    ON comments FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can add comments"
    ON comments FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
    ON comments FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
    ON comments FOR DELETE
    USING (auth.uid() = user_id);

-- Add indexes
CREATE INDEX reactions_deal_id_idx ON reactions(deal_id);
CREATE INDEX comments_deal_id_idx ON comments(deal_id);