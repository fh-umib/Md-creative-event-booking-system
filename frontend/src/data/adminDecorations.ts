export type AdminDecorationStatus = 'active' | 'draft';

export interface AdminDecorationItem {
  id: number;
  title: string;
  category: string;
  subcategory: string | null;
  style: string;
  status: AdminDecorationStatus;
  tags: string[];
  updatedAt: string;
  heroImage: string;
  description: string;
}

export const adminDecorationsMock: AdminDecorationItem[] = [
  {
    id: 1,
    title: 'Pastel Birthday Styling',
    category: 'Kids Decorations',
    subcategory: 'Girl',
    style: 'Pastel Birthday',
    status: 'active',
    tags: ['kids', 'girl', 'pastel'],
    updatedAt: '2026-04-05',
    heroImage: '/images/decorations/kids-girl-1.jpg',
    description: 'Soft pink birthday setup with elegant pastel styling and floral details.',
  },
  {
    id: 2,
    title: 'Sky Adventure Styling',
    category: 'Kids Decorations',
    subcategory: 'Boy',
    style: 'Sky Adventure',
    status: 'active',
    tags: ['kids', 'boy', 'blue'],
    updatedAt: '2026-04-04',
    heroImage: '/images/decorations/kids-boy-1.jpg',
    description: 'Blue themed celebration concept with balloon clusters and soft sky tones.',
  },
  {
    id: 3,
    title: 'White Elegance',
    category: 'Wedding Decorations',
    subcategory: null,
    style: 'White Elegance',
    status: 'active',
    tags: ['wedding', 'luxury', 'floral'],
    updatedAt: '2026-04-03',
    heroImage: '/images/decorations/wedding-1.jpg',
    description: 'Classic wedding styling with white florals, premium tables, and elegant balance.',
  },
  {
    id: 4,
    title: 'Romantic Garden Styling',
    category: 'Engagement Decorations',
    subcategory: null,
    style: 'Romantic Garden',
    status: 'draft',
    tags: ['engagement', 'garden', 'floral'],
    updatedAt: '2026-04-02',
    heroImage: '/images/decorations/engagement-1.jpg',
    description: 'Romantic outdoor engagement setup with curated flowers and elegant dining.',
  },
  {
    id: 5,
    title: 'Soft Luxury Bride to Be',
    category: 'Bride to Be',
    subcategory: null,
    style: 'Soft Luxury',
    status: 'active',
    tags: ['bride', 'indoor', 'luxury'],
    updatedAt: '2026-04-01',
    heroImage: '/images/decorations/bride-1.jpg',
    description: 'Refined feminine setup with soft florals, statement backdrop, and premium details.',
  },
  {
    id: 6,
    title: 'Blue Cloud Theme',
    category: 'Syneti',
    subcategory: null,
    style: 'Blue Cloud',
    status: 'draft',
    tags: ['syneti', 'blue', 'celebration'],
    updatedAt: '2026-03-31',
    heroImage: '/images/decorations/syneti-1.jpg',
    description: 'Elegant blue celebration styling for syneti events with soft clean details.',
  },
];