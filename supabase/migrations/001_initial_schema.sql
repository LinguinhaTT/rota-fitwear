-- ============================================
-- ROTA FITWEAR - Schema PostgreSQL via Supabase
-- ============================================

-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "unaccent";
create extension if not exists "pg_trgm";

-- ============================================
-- CATEGORIES
-- ============================================
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name varchar(100) not null,
  slug varchar(120) not null unique,
  description text,
  image_url text,
  banner_url text,
  parent_id uuid references categories(id) on delete set null,
  sort_order integer default 0,
  is_active boolean default true,
  meta_title varchar(200),
  meta_description varchar(500),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- PRODUCTS
-- ============================================
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name varchar(200) not null,
  slug varchar(220) not null unique,
  description text,
  short_description varchar(500),
  price decimal(10,2) not null,
  compare_price decimal(10,2),
  cost_price decimal(10,2),
  sku varchar(100) not null unique,
  category_id uuid references categories(id) on delete set null,
  tags text[] default '{}',
  material varchar(200),
  care_instructions text,
  weight decimal(8,3),
  status varchar(20) default 'active' check (status in ('active','inactive','draft')),
  is_featured boolean default false,
  is_new boolean default false,
  is_best_seller boolean default false,
  pix_discount_percent decimal(5,2) default 10,
  meta_title varchar(200),
  meta_description varchar(500),
  sold_count integer default 0,
  view_count integer default 0,
  rating_avg decimal(3,2) default 0,
  rating_count integer default 0,
  search_vector tsvector,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_products_slug on products(slug);
create index idx_products_category on products(category_id);
create index idx_products_status on products(status);
create index idx_products_search on products using gin(search_vector);
create index idx_products_featured on products(is_featured) where is_featured = true;
create index idx_products_new on products(is_new) where is_new = true;
create index idx_products_best_seller on products(is_best_seller) where is_best_seller = true;

-- ============================================
-- PRODUCT IMAGES
-- ============================================
create table if not exists product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  alt varchar(200),
  cloudinary_id varchar(200),
  color_variant varchar(100),
  sort_order integer default 0,
  is_primary boolean default false,
  created_at timestamptz default now()
);

create index idx_product_images_product on product_images(product_id);

-- ============================================
-- PRODUCT VARIANTS
-- ============================================
create table if not exists product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  sku varchar(150) not null unique,
  size varchar(20) not null,
  color varchar(100) not null,
  color_hex varchar(7),
  stock integer default 0,
  price_override decimal(10,2),
  weight decimal(8,3),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_variants_product on product_variants(product_id);
create index idx_variants_stock on product_variants(stock);

-- ============================================
-- PROFILES (extends auth.users)
-- ============================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email varchar(200) not null,
  name varchar(100),
  phone varchar(20),
  cpf varchar(14),
  birthdate date,
  avatar_url text,
  role varchar(20) default 'customer' check (role in ('customer','admin','affiliate')),
  loyalty_tier varchar(20) default 'bronze' check (loyalty_tier in ('bronze','silver','gold','diamond')),
  loyalty_points integer default 0,
  cashback_balance decimal(10,2) default 0,
  wallet_balance decimal(10,2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- ADDRESSES
-- ============================================
create table if not exists addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  name varchar(100) not null,
  street varchar(200) not null,
  number varchar(20) not null,
  complement varchar(100),
  neighborhood varchar(100) not null,
  city varchar(100) not null,
  state varchar(2) not null,
  zip_code varchar(9) not null,
  country varchar(2) default 'BR',
  is_default boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- COUPONS
-- ============================================
create table if not exists coupons (
  id uuid primary key default uuid_generate_v4(),
  code varchar(50) not null unique,
  description text,
  discount_type varchar(20) not null check (discount_type in ('percentage','fixed','free_shipping')),
  discount_value decimal(10,2) not null,
  min_order_value decimal(10,2),
  max_uses integer,
  used_count integer default 0,
  starts_at timestamptz,
  expires_at timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================
-- ORDERS
-- ============================================
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  order_number varchar(50) not null unique,
  user_id uuid references profiles(id) on delete set null,
  address_data jsonb not null,
  status varchar(20) default 'pending' check (status in ('pending','paid','processing','shipped','delivered','cancelled','refunded')),
  payment_method varchar(30),
  payment_gateway varchar(30),
  payment_id varchar(200),
  subtotal decimal(10,2) not null,
  discount decimal(10,2) default 0,
  shipping decimal(10,2) default 0,
  total decimal(10,2) not null,
  coupon_code varchar(50),
  pix_qr_code text,
  pix_qr_code_text text,
  tracking_code varchar(100),
  tracking_url text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_orders_user on orders(user_id);
create index idx_orders_status on orders(status);
create index idx_orders_created on orders(created_at desc);

-- ============================================
-- ORDER ITEMS
-- ============================================
create table if not exists order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  variant_id uuid references product_variants(id) on delete set null,
  product_name varchar(200) not null,
  variant_info varchar(100) not null,
  quantity integer not null,
  unit_price decimal(10,2) not null,
  total_price decimal(10,2) not null,
  created_at timestamptz default now()
);

create index idx_order_items_order on order_items(order_id);

-- ============================================
-- REVIEWS
-- ============================================
create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  title varchar(200),
  body text not null,
  is_verified boolean default false,
  is_approved boolean default false,
  images text[],
  helpful_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_reviews_product on reviews(product_id);
create index idx_reviews_approved on reviews(is_approved) where is_approved = true;

-- ============================================
-- WISHLIST
-- ============================================
create table if not exists wishlists (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

-- ============================================
-- AFFILIATES
-- ============================================
create table if not exists affiliates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade unique,
  code varchar(50) not null unique,
  commission_rate decimal(5,2) default 5.00,
  total_sales decimal(12,2) default 0,
  total_commission decimal(12,2) default 0,
  pending_commission decimal(12,2) default 0,
  paid_commission decimal(12,2) default 0,
  clicks integer default 0,
  conversions integer default 0,
  status varchar(20) default 'pending' check (status in ('active','inactive','pending')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- BLOG POSTS
-- ============================================
create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title varchar(300) not null,
  slug varchar(320) not null unique,
  excerpt text,
  content text not null,
  cover_image text,
  category varchar(100),
  tags text[] default '{}',
  author_name varchar(100),
  author_avatar text,
  is_published boolean default false,
  published_at timestamptz,
  meta_title varchar(300),
  meta_description varchar(500),
  reading_time integer default 5,
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_blog_slug on blog_posts(slug);
create index idx_blog_published on blog_posts(is_published, published_at desc);

-- ============================================
-- LOYALTY TRANSACTIONS
-- ============================================
create table if not exists loyalty_transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade,
  type varchar(20) not null check (type in ('earn','redeem','expire','bonus')),
  points integer not null,
  description varchar(200),
  order_id uuid references orders(id) on delete set null,
  created_at timestamptz default now()
);

-- ============================================
-- AUTOMATION: Update product search vector
-- ============================================
create or replace function update_product_search()
returns trigger as $$
begin
  new.search_vector := to_tsvector('portuguese',
    coalesce(new.name, '') || ' ' ||
    coalesce(new.description, '') || ' ' ||
    coalesce(new.short_description, '') || ' ' ||
    coalesce(array_to_string(new.tags, ' '), '')
  );
  return new;
end;
$$ language plpgsql;

create trigger products_search_update
before insert or update on products
for each row execute function update_product_search();

-- ============================================
-- AUTOMATION: Update timestamps
-- ============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_products before update on products for each row execute function update_updated_at();
create trigger set_updated_at_profiles before update on profiles for each row execute function update_updated_at();
create trigger set_updated_at_orders before update on orders for each row execute function update_updated_at();
create trigger set_updated_at_variants before update on product_variants for each row execute function update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
alter table profiles enable row level security;
alter table addresses enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table wishlists enable row level security;
alter table reviews enable row level security;
alter table loyalty_transactions enable row level security;

-- Users can only see and edit their own data
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can view own addresses" on addresses for all using (auth.uid() = user_id);
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);
create policy "Users can manage own wishlist" on wishlists for all using (auth.uid() = user_id);
create policy "Public can view approved reviews" on reviews for select using (is_approved = true);
create policy "Users can insert reviews" on reviews for insert with check (auth.uid() = user_id);
create policy "Users can view own loyalty" on loyalty_transactions for select using (auth.uid() = user_id);

-- Public read access
create policy "Public can view active products" on products for select using (status = 'active');
create policy "Public can view categories" on categories for select using (is_active = true);
create policy "Public can view product images" on product_images for select using (true);
create policy "Public can view product variants" on product_variants for select using (true);
create policy "Public can view published blog" on blog_posts for select using (is_published = true);

-- ============================================
-- SEED DATA
-- ============================================
insert into categories (name, slug, description, sort_order) values
  ('Conjuntos', 'conjuntos', 'Conjuntos fitness completos', 1),
  ('Leggings', 'leggings', 'Leggings fitness de alta performance', 2),
  ('Tops', 'tops', 'Tops fitness para todos os treinos', 3),
  ('Shorts', 'shorts', 'Shorts fitness e esportivos', 4),
  ('Vestidos', 'vestidos', 'Vestidos fitness casuais', 5),
  ('Macaquinhos', 'macaquinhos', 'Macaquinhos fitness', 6)
on conflict (slug) do nothing;
