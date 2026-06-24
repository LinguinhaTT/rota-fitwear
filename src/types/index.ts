// ============================================
// ROTA FITWEAR - Tipos TypeScript
// ============================================

export type ProductStatus = 'active' | 'inactive' | 'draft'
export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type UserRole = 'customer' | 'admin' | 'affiliate'
export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'diamond'
export type PaymentMethod = 'credit_card' | 'debit_card' | 'pix' | 'boleto' | 'wallet'
export type PaymentGateway = 'stripe' | 'mercadopago'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  banner_url?: string
  parent_id?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  children?: Category[]
  product_count?: number
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  alt?: string
  sort_order: number
  is_primary: boolean
  cloudinary_id?: string
  color_variant?: string
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string
  size: string
  color: string
  color_hex?: string
  stock: number
  price_override?: number
  weight?: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  price: number
  compare_price?: number
  cost_price?: number
  sku: string
  category_id: string
  category?: Category
  images: ProductImage[]
  variants: ProductVariant[]
  tags: string[]
  material?: string
  care_instructions?: string
  weight?: number
  status: ProductStatus
  is_featured: boolean
  is_new: boolean
  is_best_seller: boolean
  meta_title?: string
  meta_description?: string
  sold_count: number
  view_count: number
  rating_avg: number
  rating_count: number
  created_at: string
  updated_at: string
  pix_discount_percent?: number
}

export interface CartItem {
  id: string
  product_id: string
  variant_id: string
  product: Product
  variant: ProductVariant
  quantity: number
  price: number
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  coupon?: Coupon
}

export interface Address {
  id: string
  user_id: string
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zip_code: string
  country: string
  is_default: boolean
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  cpf?: string
  birthdate?: string
  avatar_url?: string
  role: UserRole
  loyalty_tier: LoyaltyTier
  loyalty_points: number
  cashback_balance: number
  wallet_balance: number
  addresses: Address[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id: string
  product_name: string
  variant_info: string
  quantity: number
  unit_price: number
  total_price: number
  product?: Product
}

export interface Order {
  id: string
  order_number: string
  user_id: string
  user?: User
  items: OrderItem[]
  address: Address
  status: OrderStatus
  payment_method: PaymentMethod
  payment_gateway: PaymentGateway
  payment_id?: string
  subtotal: number
  discount: number
  shipping: number
  total: number
  coupon_code?: string
  pix_qr_code?: string
  pix_qr_code_text?: string
  tracking_code?: string
  tracking_url?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  user?: Pick<User, 'name' | 'avatar_url'>
  rating: number
  title?: string
  body: string
  is_verified: boolean
  is_approved: boolean
  images?: string[]
  created_at: string
}

export interface Coupon {
  id: string
  code: string
  description?: string
  discount_type: 'percentage' | 'fixed' | 'free_shipping'
  discount_value: number
  min_order_value?: number
  max_uses?: number
  used_count: number
  starts_at?: string
  expires_at?: string
  is_active: boolean
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image?: string
  category: string
  tags: string[]
  author_name: string
  author_avatar?: string
  is_published: boolean
  published_at?: string
  meta_title?: string
  meta_description?: string
  reading_time: number
  view_count: number
  created_at: string
  updated_at: string
}

export interface Affiliate {
  id: string
  user_id: string
  user?: User
  code: string
  commission_rate: number
  total_sales: number
  total_commission: number
  pending_commission: number
  paid_commission: number
  clicks: number
  conversions: number
  status: 'active' | 'inactive' | 'pending'
  created_at: string
}

export interface Notification {
  id: string
  type: 'purchase' | 'stock' | 'review' | 'promo'
  message: string
  product_name?: string
  city?: string
  created_at: string
}

export interface SizeRecommendation {
  recommended_size: string
  confidence: number
  notes: string
}
