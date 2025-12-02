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
      customer_lifetime_spend: {
        Row: {
          avg_order_value_cents: number | null
          customer_id: string
          first_order_at: string | null
          id: string
          last_order_at: string | null
          total_orders: number
          total_spend_cents: number
          updated_at: string
        }
        Insert: {
          avg_order_value_cents?: number | null
          customer_id: string
          first_order_at?: string | null
          id?: string
          last_order_at?: string | null
          total_orders?: number
          total_spend_cents?: number
          updated_at?: string
        }
        Update: {
          avg_order_value_cents?: number | null
          customer_id?: string
          first_order_at?: string | null
          id?: string
          last_order_at?: string | null
          total_orders?: number
          total_spend_cents?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customer_lifetime_spend_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: true
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_lifetime_spend_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: true
            referencedRelation: "v_top_customers"
            referencedColumns: ["customer_id"]
          },
        ]
      }
      customers: {
        Row: {
          company_name: string | null
          created_at: string
          email: string | null
          id: string
          metadata: Json | null
          name: string | null
          phone: string | null
          stripe_customer_id: string | null
          updated_at: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      inventory_segments: {
        Row: {
          age_band_key: string
          age_band_label: string
          available_quantity: number
          created_at: string
          id: string
          max_quantity: number
          price_cents: number
          product_key: string
          product_label: string
          square_variation_id: string | null
          updated_at: string
        }
        Insert: {
          age_band_key: string
          age_band_label: string
          available_quantity?: number
          created_at?: string
          id?: string
          max_quantity?: number
          price_cents: number
          product_key: string
          product_label: string
          square_variation_id?: string | null
          updated_at?: string
        }
        Update: {
          age_band_key?: string
          age_band_label?: string
          available_quantity?: number
          created_at?: string
          id?: string
          max_quantity?: number
          price_cents?: number
          product_key?: string
          product_label?: string
          square_variation_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string
          price_id: string
          product_id: string
          quantity: number
          total_amount_cents: number
          unit_amount_cents: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id: string
          price_id: string
          product_id: string
          quantity?: number
          total_amount_cents: number
          unit_amount_cents: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string
          price_id?: string
          product_id?: string
          quantity?: number
          total_amount_cents?: number
          unit_amount_cents?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_revenue_by_product"
            referencedColumns: ["product_id"]
          },
        ]
      }
      orders: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          customer_id: string
          id: string
          metadata: Json | null
          paid_at: string | null
          status: string
          stripe_invoice_id: string | null
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          updated_at: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          customer_id: string
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          status: string
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          customer_id?: string
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          status?: string
          stripe_invoice_id?: string | null
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "v_top_customers"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "orders_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "v_active_subscriptions"
            referencedColumns: ["subscription_id"]
          },
        ]
      }
      prices: {
        Row: {
          active: boolean
          billing_interval: string | null
          billing_interval_count: number | null
          created_at: string
          currency: string
          id: string
          price_type: string
          product_id: string
          stripe_price_id: string
          unit_amount_cents: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          billing_interval?: string | null
          billing_interval_count?: number | null
          created_at?: string
          currency?: string
          id?: string
          price_type: string
          product_id: string
          stripe_price_id: string
          unit_amount_cents: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          billing_interval?: string | null
          billing_interval_count?: number | null
          created_at?: string
          currency?: string
          id?: string
          price_type?: string
          product_id?: string
          stripe_price_id?: string
          unit_amount_cents?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_revenue_by_product"
            referencedColumns: ["product_id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          product_type: string
          stripe_product_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          product_type?: string
          stripe_product_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          product_type?: string
          stripe_product_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          customer_id: string
          id: string
          price_id: string
          status: string
          stripe_subscription_id: string
          updated_at: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id: string
          id?: string
          price_id: string
          status: string
          stripe_subscription_id: string
          updated_at?: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string
          id?: string
          price_id?: string
          status?: string
          stripe_subscription_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "v_top_customers"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_active_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          company_name: string | null
          current_period_end: string | null
          current_period_start: string | null
          customer_email: string | null
          customer_name: string | null
          monthly_price_dollars: number | null
          product_name: string | null
          status: string | null
          stripe_subscription_id: string | null
          subscribed_at: string | null
          subscription_id: string | null
        }
        Relationships: []
      }
      v_customer_cohorts: {
        Row: {
          avg_ltv_dollars: number | null
          cohort_month: string | null
          cohort_total_revenue_dollars: number | null
          customers_acquired: number | null
          customers_with_orders: number | null
        }
        Relationships: []
      }
      v_monthly_revenue: {
        Row: {
          avg_order_value_cents: number | null
          avg_order_value_dollars: number | null
          month: string | null
          total_orders: number | null
          total_revenue_cents: number | null
          total_revenue_dollars: number | null
          unique_customers: number | null
        }
        Relationships: []
      }
      v_mrr: {
        Row: {
          active_subscriptions: number | null
          arr_dollars: number | null
          mrr_cents: number | null
          mrr_dollars: number | null
        }
        Relationships: []
      }
      v_revenue_by_product: {
        Row: {
          product_id: string | null
          product_name: string | null
          stripe_product_id: string | null
          total_orders: number | null
          total_revenue_cents: number | null
          total_revenue_dollars: number | null
          total_units_sold: number | null
          unique_customers: number | null
        }
        Relationships: []
      }
      v_top_customers: {
        Row: {
          avg_order_value_dollars: number | null
          company_name: string | null
          customer_id: string | null
          email: string | null
          first_order_at: string | null
          has_active_subscription: boolean | null
          last_order_at: string | null
          lifetime_spend_dollars: number | null
          name: string | null
          stripe_customer_id: string | null
          total_orders: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      update_customer_lifetime_spend: {
        Args: { p_customer_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
