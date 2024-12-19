export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      deals: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          discount_price: number
          category: string
          image_url: string
          start_date: string
          end_date: string
          created_at: string
          updated_at: string
          status: 'active' | 'inactive'
          created_by: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          discount_price: number
          category: string
          image_url: string
          start_date: string
          end_date: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'inactive'
          created_by: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          discount_price?: number
          category?: string
          image_url?: string
          start_date?: string
          end_date?: string
          created_at?: string
          updated_at?: string
          status?: 'active' | 'inactive'
          created_by?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}