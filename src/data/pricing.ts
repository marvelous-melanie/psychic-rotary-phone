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

export const graduation: Pkg[] = [
  {
    name: 'The Mini',
    price: '$175',
    tagline: 'Cap, gown, and done.',
    description: 'A quick, focused session for the classic shots: cap and gown plus one more look, without giving up your whole afternoon.',
    items: ['30 minutes of coverage', 'Cap & gown + 1 outfit', '15+ edited digital images', 'Online gallery in 2–3 weeks'],
  },
  {
    name: 'The Portrait',
    price: '$275',
    tagline: 'Room to be yourself.',
    description: 'A full hour to settle in, try a second look, and get portraits that feel like you, not just the robe. Family is welcome to jump in.',
    items: ['1 hour of coverage', 'Up to 2 outfits', '30+ edited digital images', 'Online gallery in 2–3 weeks'],
    featured: true,
  },
  {
    name: 'The Celebration',
    price: '$395',
    tagline: 'The whole milestone, start to finish.',
    description: 'Ninety unhurried minutes for every look you want, the campus spots that mattered, and the people who got you here.',
    items: ['90 minutes of coverage', 'Up to 3 outfits', '50+ edited digital images', 'Online gallery in 2–3 weeks'],
  },
];
