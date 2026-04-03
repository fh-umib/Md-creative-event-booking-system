import type { BookingAddOn } from '../types';

export const bookingAddOns: BookingAddOn[] = [
  {
    id: 'decor-1',
    title: 'Balloon Setup',
    description: 'Elegant balloon styling for birthdays and themed celebrations.',
    price: 35,
    category: 'decorations',
    imageUrl:
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'decor-2',
    title: 'Themed Backdrop',
    description: 'Custom celebration backdrop to match your chosen package.',
    price: 55,
    category: 'decorations',
    imageUrl:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'act-1',
    title: 'Face Painting',
    description: 'Fun face painting activity for children during the event.',
    price: 30,
    category: 'activities',
    imageUrl:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'act-2',
    title: 'Kids Games Host',
    description: 'Interactive host-led activity games for party engagement.',
    price: 40,
    category: 'activities',
    imageUrl:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'photo-1',
    title: 'Basic Photo Booth',
    description: 'Photo booth corner with instant fun snapshots.',
    price: 60,
    category: 'photoBooth',
    imageUrl:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'photo-2',
    title: 'Premium Photo Booth',
    description: 'Premium photo booth with props and stylish event setup.',
    price: 95,
    category: 'photoBooth',
    imageUrl:
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
  },
];