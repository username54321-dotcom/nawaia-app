export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      book_links: {
        Row: {
          book_id: number
          book_link: string
          created_at: string
          id: number
          telegram_link: string | null
        }
        Insert: {
          book_id: number
          book_link: string
          created_at?: string
          id?: number
          telegram_link?: string | null
        }
        Update: {
          book_id?: number
          book_link?: string
          created_at?: string
          id?: number
          telegram_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_links_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          created_at: string
          duration: string | null
          genre: string | null
          id: number
          image: string
          long_description: string | null
          price: number | null
          published: boolean
          short_description: string | null
          title: string
        }
        Insert: {
          created_at?: string
          duration?: string | null
          genre?: string | null
          id?: number
          image: string
          long_description?: string | null
          price?: number | null
          published?: boolean
          short_description?: string | null
          title: string
        }
        Update: {
          created_at?: string
          duration?: string | null
          genre?: string | null
          id?: number
          image?: string
          long_description?: string | null
          price?: number | null
          published?: boolean
          short_description?: string | null
          title?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          cover_image: string
          created_at: string
          duration: string
          genre: string
          id: number
          is_published: boolean
          long_description: string
          price: number
          short_description: string
          tier: number
          title: string
        }
        Insert: {
          cover_image: string
          created_at?: string
          duration: string
          genre: string
          id?: number
          is_published?: boolean
          long_description: string
          price: number
          short_description: string
          tier?: number
          title: string
        }
        Update: {
          cover_image?: string
          created_at?: string
          duration?: string
          genre?: string
          id?: number
          is_published?: boolean
          long_description?: string
          price?: number
          short_description?: string
          tier?: number
          title?: string
        }
        Relationships: []
      }
      courses_chapters: {
        Row: {
          chapter_name: string
          course_id: number | null
          created_at: string
          id: number
          position: number | null
          tier: number
        }
        Insert: {
          chapter_name: string
          course_id?: number | null
          created_at?: string
          id?: number
          position?: number | null
          tier?: number
        }
        Update: {
          chapter_name?: string
          course_id?: number | null
          created_at?: string
          id?: number
          position?: number | null
          tier?: number
        }
        Relationships: [
          {
            foreignKeyName: "chapters_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_lessons: {
        Row: {
          chapter_id: number | null
          course_id: number | null
          created_at: string
          id: number
          lesson_name: string
          position: number | null
        }
        Insert: {
          chapter_id?: number | null
          course_id?: number | null
          created_at?: string
          id?: number
          lesson_name: string
          position?: number | null
        }
        Update: {
          chapter_id?: number | null
          course_id?: number | null
          created_at?: string
          id?: number
          lesson_name?: string
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "courses_chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_lessons_completed: {
        Row: {
          created_at: string
          id: number
          is_completed: boolean
          lesson_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_completed?: boolean
          lesson_id: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          is_completed?: boolean
          lesson_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lesson_completed_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "courses_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_links: {
        Row: {
          chapter_id: number | null
          course_id: number
          created_at: string
          id: number
          lesson_id: number
          lesson_link: string
        }
        Insert: {
          chapter_id?: number | null
          course_id: number
          created_at?: string
          id?: number
          lesson_id: number
          lesson_link: string
        }
        Update: {
          chapter_id?: number | null
          course_id?: number
          created_at?: string
          id?: number
          lesson_id?: number
          lesson_link?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_links_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "courses_chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "links_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "links_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: true
            referencedRelation: "courses_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_notes: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          lesson_id: number | null
          note_content: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          lesson_id?: number | null
          note_content?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          lesson_id?: number | null
          note_content?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_notes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "courses_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_purchase: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_purchase_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_telegram_links: {
        Row: {
          course_id: number
          created_at: string
          id: number
          telegram_link: string | null
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          telegram_link?: string | null
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          telegram_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "telegram_links_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: true
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_user_favourites: {
        Row: {
          course_id: number
          created_at: string
          id: number
          is_favourite: boolean
          user_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          is_favourite: boolean
          user_id?: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          is_favourite?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_user_favourites_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_user_history: {
        Row: {
          course_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_course_history_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses_user_video_progress: {
        Row: {
          created_at: string
          id: number
          lesson_id: number
          timestamp: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          lesson_id: number
          timestamp?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          lesson_id?: number
          timestamp?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "courses_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: number
          is_admin: boolean | null
          is_approved: boolean | null
          memebership: Database["public"]["Enums"]["enum_memberships_tiers"]
          phone_number: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          is_admin?: boolean | null
          is_approved?: boolean | null
          memebership?: Database["public"]["Enums"]["enum_memberships_tiers"]
          phone_number?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          is_admin?: boolean | null
          is_approved?: boolean | null
          memebership?: Database["public"]["Enums"]["enum_memberships_tiers"]
          phone_number?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
      public_assets: {
        Row: {
          about_us_page_content: string | null
          booking_page: string | null
          created_at: string
          home_page: string | null
          id: number
        }
        Insert: {
          about_us_page_content?: string | null
          booking_page?: string | null
          created_at?: string
          home_page?: string | null
          id?: number
        }
        Update: {
          about_us_page_content?: string | null
          booking_page?: string | null
          created_at?: string
          home_page?: string | null
          id?: number
        }
        Relationships: []
      }
      user_book_history: {
        Row: {
          book_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          book_id: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Update: {
          book_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_book_history_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      email_exists: { Args: { email_check: string }; Returns: boolean }
      fn_course_is_purchase: {
        Args: { p_course_id: number; p_user_id: string }
        Returns: boolean
      }
      fn_is_admin: { Args: { user_uuid: string }; Returns: boolean }
      fn_is_approved: { Args: { user_uuid: string }; Returns: boolean }
    }
    Enums: {
      enum_memberships_tiers: "basic" | "silver" | "gold"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      enum_memberships_tiers: ["basic", "silver", "gold"],
    },
  },
} as const
