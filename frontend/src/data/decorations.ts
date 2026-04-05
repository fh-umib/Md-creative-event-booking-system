export type DecorationFilterTag =
  | 'kids'
  | 'girl'
  | 'boy'
  | 'wedding'
  | 'engagement'
  | 'bride'
  | 'syneti'
  | 'baby'
  | 'table'
  | 'garden'
  | 'outdoor'
  | 'indoor'
  | 'pastel'
  | 'floral'
  | 'luxury'
  | 'modern';

export interface DecorationGalleryItem {
  id: string;
  title: string;
  image: string;
  description: string;
  tags: DecorationFilterTag[];
}

export interface DecorationStyle {
  slug: string;
  title: string;
  shortDescription: string;
  intro:
    string;
  heroImage: string;
  filters: DecorationFilterTag[];
  gallery: DecorationGalleryItem[];
}

export interface DecorationSubcategory {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  heroLabel: string;
  heroTitle: string;
  heroText: string;
  styles: DecorationStyle[];
}

export interface DecorationCategory {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  heroLabel: string;
  heroTitle: string;
  heroText: string;
  subcategories?: DecorationSubcategory[];
  styles?: DecorationStyle[];
}

export const decorationCategories: DecorationCategory[] = [
  {
    slug: 'kids',
    title: 'Kids Decorations',
    description:
      'Playful setups for little celebrations, styled separately for boy and girl themes.',
    coverImage: '/mnt/data/viber_image_2026-04-04_23-50-05-087.jpg',
    heroLabel: 'KIDS EVENT DECOR',
    heroTitle: 'Kids Decorations',
    heroText:
      'Whimsical themes, playful styling, and memorable birthday setups designed for children.',
    subcategories: [
      {
        slug: 'girl',
        title: 'Girl Decorations',
        description:
          'Soft pink, butterfly, floral, pastel, and dreamy birthday setups for girls.',
        coverImage: '/mnt/data/viber_image_2026-04-04_23-50-08-410.jpg',
        heroLabel: 'GIRL THEMES',
        heroTitle: 'Girl Decorations',
        heroText:
          'Elegant and joyful girl birthday concepts with pastel palettes, balloons, florals, and charming details.',
        styles: [
          {
            slug: 'pastel-birthday',
            title: 'Pastel Birthday Styling',
            shortDescription: 'Soft pink balloons, gentle florals, and elegant details.',
            intro:
              'A dreamy pastel styling designed to make little celebrations feel magical, delicate, and unforgettable.',
            heroImage: '/mnt/data/viber_image_2026-04-04_23-50-08-410.jpg',
            filters: ['kids', 'girl', 'pastel', 'indoor', 'floral'],
            gallery: [
              {
                id: 'girl-1',
                title: 'Butterfly Garden Setup',
                image: '/mnt/data/viber_image_2026-04-04_23-50-08-410.jpg',
                description:
                  'Pink balloon styling with butterflies and a playful pastel backdrop.',
                tags: ['kids', 'girl', 'pastel', 'floral', 'outdoor'],
              },
              {
                id: 'girl-2',
                title: 'First Birthday Soft Pink',
                image: '/mnt/data/viber_image_2026-04-04_23-50-09-531.jpg',
                description:
                  'Indoor first birthday setup with layered arches and a teddy centerpiece.',
                tags: ['kids', 'girl', 'pastel', 'indoor'],
              },
              {
                id: 'girl-3',
                title: 'Baby Welcome Pink Bloom',
                image: '/mnt/data/viber_image_2026-04-04_23-54-07-355.jpg',
                description:
                  'Floral-heavy pink welcome setup with premium soft tones.',
                tags: ['kids', 'girl', 'baby', 'pastel', 'floral', 'outdoor'],
              },
            ],
          },
        ],
      },
      {
        slug: 'boy',
        title: 'Boy Decorations',
        description:
          'Blue themes, balloons, planes, clouds, and playful modern birthday styling.',
        coverImage: '/mnt/data/viber_image_2026-04-04_23-50-05-942.jpg',
        heroLabel: 'BOY THEMES',
        heroTitle: 'Boy Decorations',
        heroText:
          'Energetic and stylish boy birthday decorations with sky palettes, balloons, and themed details.',
        styles: [
          {
            slug: 'sky-adventure',
            title: 'Sky Adventure Styling',
            shortDescription: 'Air balloons, blue tones, and joyful party details.',
            intro:
              'A bright and charming setup built around blue skies, travel motifs, balloons, and celebration energy.',
            heroImage: '/mnt/data/viber_image_2026-04-04_23-50-05-942.jpg',
            filters: ['kids', 'boy', 'pastel', 'indoor'],
            gallery: [
              {
                id: 'boy-1',
                title: 'Hot Air Balloon Theme',
                image: '/mnt/data/viber_image_2026-04-04_23-50-05-942.jpg',
                description:
                  'Soft blue and neutral balloon installation with clouds and travel elements.',
                tags: ['kids', 'boy', 'indoor'],
              },
              {
                id: 'boy-2',
                title: 'Blue Outdoor Party',
                image: '/mnt/data/viber_image_2026-04-04_23-50-05-529.jpg',
                description:
                  'Outdoor blue decor with layered arches and balloon clusters.',
                tags: ['kids', 'boy', 'outdoor'],
              },
              {
                id: 'boy-3',
                title: 'Hero Character Styling',
                image: '/mnt/data/viber_image_2026-04-04_23-54-07-813.jpg',
                description:
                  'Colorful superhero-themed birthday styling for energetic celebrations.',
                tags: ['kids', 'boy', 'indoor', 'modern'],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: 'wedding',
    title: 'Wedding Decorations',
    description:
      'Refined wedding styling with elegant florals, white palettes, and timeless table arrangements.',
    coverImage: '/mnt/data/viber_image_2026-04-04_23-50-05-333.jpg',
    heroLabel: 'WEDDING STYLING',
    heroTitle: 'Wedding Decorations',
    heroText:
      'Sophisticated wedding experiences with graceful florals, white-gold details, and luxury ambiance.',
    styles: [
      {
        slug: 'white-elegance',
        title: 'White Elegance',
        shortDescription: 'Clean, luxurious wedding styling with white florals and tablescapes.',
        intro:
          'A timeless wedding direction created for couples who love graceful white styling, floral balance, and elegant details.',
        heroImage: '/mnt/data/viber_image_2026-04-04_23-50-05-333.jpg',
        filters: ['wedding', 'luxury', 'floral', 'outdoor'],
        gallery: [
          {
            id: 'wed-1',
            title: 'Poolside White Tables',
            image: '/mnt/data/viber_image_2026-04-04_23-50-05-333.jpg',
            description:
              'Elegant white wedding tables with floral centerpieces by the pool.',
            tags: ['wedding', 'outdoor', 'luxury'],
          },
          {
            id: 'wed-2',
            title: 'Venue White Styling',
            image: '/mnt/data/viber_image_2026-04-04_23-50-05-529.jpg',
            description:
              'Wide venue styling with premium white floral details.',
            tags: ['wedding', 'outdoor', 'floral'],
          },
          {
            id: 'wed-3',
            title: 'Ceremony Chairs & Arch',
            image: '/mnt/data/viber_image_2026-04-04_23-50-06-463.jpg',
            description:
              'Minimal white arch styling with floral accents and statement chairs.',
            tags: ['wedding', 'luxury', 'floral', 'outdoor'],
          },
          {
            id: 'wed-4',
            title: 'Candle Luxury Stage',
            image: '/mnt/data/viber_image_2026-04-04_23-54-06-796.jpg',
            description:
              'Romantic wedding stage with candlelight and elegant white florals.',
            tags: ['wedding', 'luxury', 'indoor', 'floral'],
          },
        ],
      },
    ],
  },
  {
    slug: 'engagement',
    title: 'Engagement Decorations',
    description:
      'Stylish engagement setups with floral dining, romantic tablescapes, and elegant event details.',
    coverImage: '/mnt/data/viber_image_2026-04-04_23-54-06-568.jpg',
    heroLabel: 'ENGAGEMENT EVENTS',
    heroTitle: 'Engagement Decorations',
    heroText:
      'Meaningful engagement moments styled with romance, floral harmony, and a polished premium finish.',
    styles: [
      {
        slug: 'romantic-garden',
        title: 'Romantic Garden Styling',
        shortDescription: 'Outdoor floral tablescapes with a soft romantic look.',
        intro:
          'A graceful engagement atmosphere built around floral softness, premium table styling, and elegant celebration details.',
        heroImage: '/mnt/data/viber_image_2026-04-04_23-54-06-568.jpg',
        filters: ['engagement', 'floral', 'outdoor', 'garden'],
        gallery: [
          {
            id: 'eng-1',
            title: 'Garden Dining Setup',
            image: '/mnt/data/viber_image_2026-04-04_23-54-06-568.jpg',
            description:
              'Romantic floral dining table styling in an outdoor garden setting.',
            tags: ['engagement', 'outdoor', 'garden', 'floral'],
          },
          {
            id: 'eng-2',
            title: 'Indoor Romantic Table',
            image: '/mnt/data/viber_image_2026-04-04_23-54-05-975.jpg',
            description:
              'Indoor engagement table styling with soft flowers and blush accents.',
            tags: ['engagement', 'indoor', 'floral'],
          },
        ],
      },
    ],
  },
  {
    slug: 'bride-to-be',
    title: 'Bride to Be',
    description:
      'Elegant pre-wedding celebration setups with feminine florals, arches, and soft luxury details.',
    coverImage: '/mnt/data/viber_image_2026-04-04_23-54-06-796.jpg',
    heroLabel: 'PRE-WEDDING CELEBRATIONS',
    heroTitle: 'Bride to Be',
    heroText:
      'Soft luxury, statement florals, and curated styling for unforgettable bride-to-be celebrations.',
    styles: [
      {
        slug: 'soft-luxury',
        title: 'Soft Luxury Bride to Be',
        shortDescription: 'Refined white or blush setups with romantic floral styling.',
        intro:
          'Designed for memorable pre-wedding gatherings, this style combines elegance, femininity, and premium floral presentation.',
        heroImage: '/mnt/data/viber_image_2026-04-04_23-54-06-796.jpg',
        filters: ['bride', 'floral', 'luxury', 'indoor'],
        gallery: [
          {
            id: 'bride-1',
            title: 'White Floral Bride Setup',
            image: '/mnt/data/viber_image_2026-04-04_23-54-06-796.jpg',
            description:
              'Bride to be backdrop with white balloons and dense floral details.',
            tags: ['bride', 'indoor', 'luxury', 'floral'],
          },
          {
            id: 'bride-2',
            title: 'Outdoor Pink Bride Table',
            image: '/mnt/data/viber_image_2026-04-04_23-54-07-641.jpg',
            description:
              'Outdoor floral bride-to-be setup with long styled table and soft pink elements.',
            tags: ['bride', 'outdoor', 'floral'],
          },
        ],
      },
    ],
  },
  {
    slug: 'syneti',
    title: 'Syneti',
    description:
      'Meaningful and joyful syneti setups with sky tones, balloons, and elegant family styling.',
    coverImage: '/mnt/data/viber_image_2026-04-04_23-50-05-942.jpg',
    heroLabel: 'SYNETI STYLING',
    heroTitle: 'Syneti Decorations',
    heroText:
      'Special celebration styling for syneti events with soft themes, balloon installations, and refined setups.',
    styles: [
      {
        slug: 'blue-cloud-theme',
        title: 'Blue Cloud Theme',
        shortDescription: 'Blue, cream, and white balloon styling with clean event details.',
        intro:
          'A polished syneti direction that blends celebration joy with a soft and elegant visual language.',
        heroImage: '/mnt/data/viber_image_2026-04-04_23-50-05-942.jpg',
        filters: ['syneti', 'boy', 'indoor', 'outdoor'],
        gallery: [
          {
            id: 'syn-1',
            title: 'Outdoor Syneti Setup',
            image: '/mnt/data/viber_image_2026-04-04_23-50-05-942.jpg',
            description:
              'Clean blue outdoor setup with layered panels and balloon clusters.',
            tags: ['syneti', 'outdoor', 'boy'],
          },
          {
            id: 'syn-2',
            title: 'Indoor Blue Balloon Styling',
            image: '/mnt/data/viber_image_2026-04-04_23-54-08-961.jpg',
            description:
              'Indoor syneti theme with balloon arch and playful sky visuals.',
            tags: ['syneti', 'indoor', 'boy'],
          },
        ],
      },
    ],
  },
  {
    slug: 'special-setups',
    title: 'Special Setups',
    description:
      'Custom event concepts including baby shower, table styling, and outdoor garden decoration.',
    coverImage: '/mnt/data/viber_image_2026-04-04_23-50-07-068.jpg',
    heroLabel: 'CUSTOM CONCEPTS',
    heroTitle: 'Special Setups',
    heroText:
      'Curated concepts for unique moments, intimate events, and beautifully styled experiences.',
    subcategories: [
      {
        slug: 'baby-shower',
        title: 'Baby Shower / Welcome Baby',
        description:
          'Sweet pastel concepts with floral details and celebratory welcome styling.',
        coverImage: '/mnt/data/viber_image_2026-04-04_23-54-07-355.jpg',
        heroLabel: 'WELCOME BABY',
        heroTitle: 'Baby Shower Styling',
        heroText:
          'Tender pastel setups designed to celebrate new beginnings in a beautiful and memorable way.',
        styles: [
          {
            slug: 'soft-pink-baby',
            title: 'Soft Pink Baby Styling',
            shortDescription: 'Pastel balloons, baby florals, and gentle celebratory details.',
            intro:
              'A delicate baby shower direction with soft pink florals, sculpted backdrops, and warm celebration energy.',
            heroImage: '/mnt/data/viber_image_2026-04-04_23-54-07-355.jpg',
            filters: ['baby', 'pastel', 'floral', 'outdoor'],
            gallery: [
              {
                id: 'baby-1',
                title: 'Welcome Baby Floral Setup',
                image: '/mnt/data/viber_image_2026-04-04_23-54-07-355.jpg',
                description:
                  'Pastel welcome baby decor with floral cascades and soft backdrop styling.',
                tags: ['baby', 'outdoor', 'pastel', 'floral'],
              },
            ],
          },
        ],
      },
      {
        slug: 'table-styling',
        title: 'Birthday Table Styling',
        description:
          'Styled dining tables with florals, place settings, and elegant hosting details.',
        coverImage: '/mnt/data/viber_image_2026-04-04_23-54-05-975.jpg',
        heroLabel: 'TABLESCAPE DESIGN',
        heroTitle: 'Birthday Table Styling',
        heroText:
          'Curated table styling with florals, candles, and graceful details that elevate intimate celebrations.',
        styles: [
          {
            slug: 'signature-tablescape',
            title: 'Signature Tablescape',
            shortDescription: 'Premium floral tables with elegant plates and styling layers.',
            intro:
              'An elevated dining setup designed for intimate birthdays, special lunches, and meaningful celebrations.',
            heroImage: '/mnt/data/viber_image_2026-04-04_23-54-05-975.jpg',
            filters: ['table', 'indoor', 'floral'],
            gallery: [
              {
                id: 'table-1',
                title: 'Romantic Indoor Table',
                image: '/mnt/data/viber_image_2026-04-04_23-54-05-975.jpg',
                description:
                  'Indoor birthday table with blush florals and layered premium details.',
                tags: ['table', 'indoor', 'floral'],
              },
              {
                id: 'table-2',
                title: 'Garden Dining Concept',
                image: '/mnt/data/viber_image_2026-04-04_23-54-06-568.jpg',
                description:
                  'Outdoor dining styling with floral centerpieces and celebration flow.',
                tags: ['table', 'garden', 'outdoor', 'floral'],
              },
            ],
          },
        ],
      },
      {
        slug: 'garden-setup',
        title: 'Outdoor Garden Setup',
        description:
          'Open-air event concepts for gardens, poolside celebrations, and outdoor venues.',
        coverImage: '/mnt/data/viber_image_2026-04-04_23-50-05-087.jpg',
        heroLabel: 'OUTDOOR EVENTS',
        heroTitle: 'Garden Setup',
        heroText:
          'Fresh open-air styling designed for outdoor gatherings, elegant dining, and premium celebration spaces.',
        styles: [
          {
            slug: 'garden-premium',
            title: 'Garden Premium Setup',
            shortDescription: 'Open-air concepts with floral accents and spacious elegant layouts.',
            intro:
              'A refined outdoor styling direction for gardens, family events, and beautifully hosted open-air moments.',
            heroImage: '/mnt/data/viber_image_2026-04-04_23-50-05-087.jpg',
            filters: ['garden', 'outdoor', 'floral'],
            gallery: [
              {
                id: 'garden-1',
                title: 'Pink Outdoor Celebration',
                image: '/mnt/data/viber_image_2026-04-04_23-50-05-087.jpg',
                description:
                  'A fun and elevated outdoor setup with pastel balloons and kids lounge styling.',
                tags: ['garden', 'outdoor', 'pastel'],
              },
              {
                id: 'garden-2',
                title: 'Elegant Long Table Garden',
                image: '/mnt/data/viber_image_2026-04-04_23-50-07-068.jpg',
                description:
                  'Outdoor dining setup with floral styling and warm wooden seating.',
                tags: ['garden', 'outdoor', 'table', 'floral'],
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getDecorationCategoryBySlug(slug: string) {
  return decorationCategories.find((category) => category.slug === slug) ?? null;
}

export function getDecorationSubcategory(categorySlug: string, styleSlug: string) {
  const category = getDecorationCategoryBySlug(categorySlug);

  if (!category?.subcategories) return null;

  return category.subcategories.find((item) => item.slug === styleSlug) ?? null;
}

export function getDecorationStyle(categorySlug: string, styleSlug: string) {
  const category = getDecorationCategoryBySlug(categorySlug);

  if (!category) return null;

  if (category.styles) {
    return category.styles.find((item) => item.slug === styleSlug) ?? null;
  }

  if (category.subcategories) {
    for (const sub of category.subcategories) {
      const found = sub.styles.find((item) => item.slug === styleSlug);
      if (found) return found;
    }
  }

  return null;
}