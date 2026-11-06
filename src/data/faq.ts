import { engagement, graduation } from './pricing';

export type Faq = { q: string; a: string };

const [afternoon, chapter, experience] = engagement;
const [mini, portrait, celebration] = graduation;

const travel = {
  q: 'Do you travel outside New Haven?',
  a: 'Yes. Anywhere in Connecticut is always included. Rhode Island, Massachusetts, and greater New York are available for a small flat travel fee. Just ask.',
};

export const engagementFaq: Faq[] = [
  {
    q: 'How much does an engagement session cost?',
    a: `There are three packages. ${afternoon.name} is ${afternoon.price} for 1 hour, ${chapter.name} is ${chapter.price} for 2 hours, and ${experience.name} is ${experience.price} for 3 hours.`,
  },
  {
    q: 'How many photos will we get, and how soon?',
    a: 'You get 40+ edited digital images with The Afternoon, 60+ with The Chapter, and 100+ with The Experience. Every package comes with an online gallery in 2–3 weeks.',
  },
  {
    q: 'Are prints included?',
    a: 'The Chapter includes one 5×7 fine-art print, sent straight to your door. The Experience includes one 11×14 fine-art print.',
  },
  {
    q: 'Where do engagement sessions take place?',
    a: "Favorites include East Rock, Lighthouse Point, campus, the harbor, and Wooster Square. If you have a place in mind, we'll make it work. If not, we'll suggest one that suits the season.",
  },
  {
    q: 'What time of day do you shoot?',
    a: "The best light is the last 60–90 minutes before sunset, so that's when we usually shoot. We'll plan your session around it.",
  },
  travel,
];

export const graduationFaq: Faq[] = [
  {
    q: 'How much does a graduation session cost?',
    a: `There are three packages. ${mini.name} is ${mini.price} for 30 minutes, ${portrait.name} is ${portrait.price} for 1 hour, and ${celebration.name} is ${celebration.price} for 90 minutes.`,
  },
  {
    q: 'Can I bring more than one outfit?',
    a: 'Yes. The Mini covers cap and gown plus 1 outfit. The Portrait allows up to 2 outfits, and The Celebration up to 3.',
  },
  {
    q: 'Can we book a session for more than one graduate?',
    a: 'Yes. You can add another graduate to The Portrait or The Celebration for $125 each.',
  },
  {
    q: 'Can my family be in the photos?',
    a: 'Of course. Family is welcome to jump in during The Portrait, and The Celebration leaves time for the people who got you here.',
  },
  {
    q: 'How many photos will I get, and how soon?',
    a: 'You get 15+ edited digital images with The Mini, 30+ with The Portrait, and 50+ with The Celebration. Every package comes with an online gallery in 2–3 weeks.',
  },
  travel,
];
