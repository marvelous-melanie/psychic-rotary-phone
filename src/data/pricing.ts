export type Pkg = {
  name: string;
  price: string;
  tagline: string;
  description: string;
  items: string[];
  featured?: boolean;
};

export const engagement: Pkg[] = [
  {
    name: 'The Afternoon',
    price: '$375',
    tagline: 'An hour is more than you think.',
    description: 'One focused hour with a single beautiful backdrop. Less logistics, more presence. You show up; we handle the rest.',
    items: ['1 hour of coverage', '40+ edited digital images', 'Online gallery in 2–3 weeks'],
  },
  {
    name: 'The Chapter',
    price: '$695',
    tagline: "When one place isn't the whole picture.",
    description: 'A longer session to settle into, time to change up the scenery, and a finished print sent straight to your door.',
    items: ['2 hours of coverage', '60+ edited digital images', 'Online gallery in 2–3 weeks', 'One 5×7 fine-art print'],
    featured: true,
  },
  {
    name: 'The Experience',
    price: '$995',
    tagline: 'For couples who want the whole story told.',
    description: 'A full evening across multiple backdrops: city streets, a park, the shoreline at golden hour. Everything documented, nothing rushed.',
    items: ['3 hours of coverage', '100+ edited digital images', 'Online gallery in 2–3 weeks', 'One 11×14 fine-art print'],
  },
];

export const wedding: Pkg[] = [
  {
    name: 'The Essential',
    price: '$1,400',
    tagline: 'Coverage for the moments that matter most.',
    description: 'Perfect for intimate ceremonies, elopements, and couples who want beautiful, edited wedding photos without a full-day commitment.',
    items: [
      '6 hours of coverage',
      '1 photographer',
      '150+ edited digital photos',
      'Online gallery delivery (4–6 weeks)',
      'Personal print release',
      'Engagement session add-on available',
    ],
  },
  {
    name: 'The Story',
    price: '$2,200',
    tagline: 'Our most complete wedding experience.',
    description: 'Full wedding day coverage with a second photographer, because the best moments happen in two places at once. Includes an engagement session to get comfortable in front of the camera before the big day.',
    items: [
      '8 hours of coverage',
      '2nd photographer included',
      '300+ edited digital photos',
      'Engagement session included',
      'Online gallery delivery (4–6 weeks)',
      'Personal print release',
      'One 5×7 fine-art print',
    ],
    featured: true,
  },
  {
    name: 'The Full Journey',
    price: '$3,200',
    tagline: 'For the couples who want it all documented.',
    description: 'From the rehearsal dinner to the last song. Extended coverage, a second photographer, and a premium print to mark the occasion.',
    items: [
      'Up to 12 hours of coverage',
      '2nd photographer included',
      'Rehearsal dinner coverage (up to 2 hours)',
      '400+ edited digital photos',
      'Engagement session included',
      'Online gallery delivery (4–6 weeks)',
      'Personal print release',
      '8×10 framed fine-art print',
    ],
  },
];
