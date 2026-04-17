export type Product = {
  id: string;
  brand: string;
  product_name: string;
  category: string;
  price_usd: number;
  jkt_market_price_idr: number;
  our_price_idr: number;
  image_url: string;
};

export const products: Product[] = [
  {
    "id": "LCKY-001",
    "brand": "LUCKY",
    "product_name": "Radiance Hydration Serum",
    "category": "Trending",
    "price_usd": 38.00,
    "jkt_market_price_idr": 625000,
    "our_price_idr": 585000,
    "image_url": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80"
  },
  {
    "id": "LCKY-002",
    "brand": "LUCKY",
    "product_name": "Matte Liquid Foundation",
    "category": "Best Selling",
    "price_usd": 45.00,
    "jkt_market_price_idr": 750000,
    "our_price_idr": 690000,
    "image_url": "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?auto=format&fit=crop&w=500&q=80"
  },
  {
    "id": "LCKY-003",
    "brand": "LUCKY",
    "product_name": "Matcha Cleansing Balm",
    "category": "New",
    "price_usd": 28.00,
    "jkt_market_price_idr": 450000,
    "our_price_idr": 415000,
    "image_url": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=500&q=80"
  },
  {
    "id": "LCKY-004",
    "brand": "LUCKY",
    "product_name": "Peptide Eye Cream",
    "category": "Trending",
    "price_usd": 52.00,
    "jkt_market_price_idr": 850000,
    "our_price_idr": 780000,
    "image_url": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80"
  },
  {
    "id": "LCKY-005",
    "brand": "LUCKY",
    "product_name": "Niacinamide Brightening Toner",
    "category": "Trending",
    "price_usd": 24.00,
    "jkt_market_price_idr": 400000,
    "our_price_idr": 365000,
    "image_url": "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=500&q=80"
  },
  {
    "id": "LCKY-006",
    "brand": "LUCKY",
    "product_name": "Mineral Sunscreen SPF 50",
    "category": "New",
    "price_usd": 32.00,
    "jkt_market_price_idr": 520000,
    "our_price_idr": 485000,
    "image_url": "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80"
  },
  {
    "id": "LCKY-007",
    "brand": "LUCKY",
    "product_name": "Velvet Lip Cream",
    "category": "Best Selling",
    "price_usd": 18.00,
    "jkt_market_price_idr": 300000,
    "our_price_idr": 275000,
    "image_url": "/velvet-lip-cream.png"
  }
];
