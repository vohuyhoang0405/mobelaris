export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cafejs: {
        Row: {
          created_at: string | null
          id: number
          key: string | null
          value: string | null
          valueJson: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          key?: string | null
          value?: string | null
          valueJson?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: number
          key?: string | null
          value?: string | null
          valueJson?: Json | null
        }
      }
      handles: {
        Row: {
          created_at: string | null
          data: Json | null
          des: string | null
          id: number
          slug: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          des?: string | null
          id?: number
          slug: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          des?: string | null
          id?: number
          slug?: string
        }
      }
      redirect: {
        Row: {
          created_at: string | null
          data: Json | null
          des: string | null
          id: number
          slug: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          des?: string | null
          id?: number
          slug: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          des?: string | null
          id?: number
          slug?: string
        }
      }
      slugs: {
        Row: {
          created_at: string | null
          data: Json | null
          id: number
          url: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: number
          url: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: number
          url?: string
        }
      }
      translations: {
        Row: {
          created_at: string | null
          key: string
          lang: string | null
          name: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          key: string
          lang?: string | null
          name?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          key?: string
          lang?: string | null
          name?: string | null
          value?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
