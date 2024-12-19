-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Create deals table
CREATE TABLE deals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    destination TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    discount_percentage INTEGER GENERATED ALWAYS AS (
        ROUND(((original_price - price) / original_price * 100)::numeric, 0)
    ) STORED,
    departure_airport TEXT NOT NULL,
    destination_airport TEXT NOT NULL,
    airline TEXT NOT NULL,
    flight_class TEXT NOT NULL DEFAULT 'Economy',
    departure_time TIMESTAMPTZ,
    arrival_time TIMESTAMPTZ,
    duration INTERVAL,
    stops INTEGER DEFAULT 0,
    baggage TEXT,
    amenities TEXT[],
    image_url TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at
    BEFORE UPDATE ON deals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create policies for deals
CREATE POLICY "Active deals are viewable by everyone"
    ON deals FOR SELECT
    USING (status = 'active');

CREATE POLICY "Authenticated users can create deals"
    ON deals FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Admins can update any deal"
    ON deals FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can delete any deal"
    ON deals FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Create indexes for better performance
CREATE INDEX deals_status_idx ON deals(status);
CREATE INDEX deals_created_at_idx ON deals(created_at DESC);
CREATE INDEX deals_departure_airport_idx ON deals(departure_airport);
CREATE INDEX deals_destination_idx ON deals(destination);
CREATE INDEX deals_price_idx ON deals(price);

-- Insert initial admin user (replace with your admin user's ID)
INSERT INTO profiles (id, email, role)
VALUES ('your-admin-user-id', 'admin@example.com', 'admin');

-- Create storage bucket for deal images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('deal-images', 'deal-images', true);

-- Set up storage policy
CREATE POLICY "Deal images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'deal-images');

CREATE POLICY "Authenticated users can upload deal images"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'deal-images');

CREATE POLICY "Admins can update deal images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'deal-images'
        AND (
            EXISTS (
                SELECT 1 FROM profiles
                WHERE profiles.id = auth.uid()
                AND profiles.role = 'admin'
            )
        )
    );

CREATE POLICY "Admins can delete deal images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'deal-images'
        AND (
            EXISTS (
                SELECT 1 FROM profiles
                WHERE profiles.id = auth.uid()
                AND profiles.role = 'admin'
            )
        )
    );