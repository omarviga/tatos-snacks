export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'individual' | 'bundle';
  flavorNote?: string;
  bgColorClass: string;
  borderHoverClass: string;
  badgeText?: string;
  badgeBgClass?: string;
  iconName?: string;
  iconColorClass?: string;
  ingredients?: string[];
  nutrition?: Record<string, string>;
  sensoryDescription?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: Record<string, number>; // scores for 'caramel', 'flamin', 'butter'
  }[];
}

export interface PopcornParticle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  scale: number;
  type: 'kernel' | 'popped_white' | 'popped_caramel' | 'popped_red';
}
