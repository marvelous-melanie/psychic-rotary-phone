import { engagement, wedding } from './pricing';

export type Faq = { q: string; a: string };

const [afternoon, chapter, experience] = engagement;

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

const [essential, story, journey] = wedding;

export const weddingFaq: Faq[] = [
  {
    q: 'How much does wedding photography cost?',
    a: `There are three packages. ${essential.name} is ${essential.price} for 6 hours, ${story.name} is ${story.price} for 8 hours with a second photographer, and ${journey.name} is ${journey.price} for up to 12 hours, including rehearsal dinner coverage.`,
  },
  {
    q: 'How many photos will we get, and how soon?',
    a: "You get 150+ edited photos with The Essential, 300+ with The Story, and 400+ with The Full Journey. Your full gallery arrives by private online link within 4–6 weeks, and you'll get a sneak peek of a handful of images within 48 hours of your wedding.",
  },
  {
    q: 'Is a second photographer included?',
    a: "The Story and The Full Journey include a second photographer as standard. It isn't an add-on. It's built in, because weddings deserve two sets of eyes.",
  },
  {
    q: 'Is an engagement session included?',
    a: `${story.name} and ${journey.name} include an engagement session. With ${essential.name}, you can add one. See our engagement pricing for the options.`,
  },
  {
    q: 'How do we hold our date?',
    a: 'After we confirm availability, a signed contract and a 25% retainer officially reserve your date. Dates are held on a first-come, first-served basis and are not held without both.',
  },
  {
    q: 'Can we print our photos?',
    a: `Every package includes a personal print release, so you can print your photos wherever you like. ${story.name} also includes a 5×7 fine-art print, and ${journey.name} includes an 8×10 framed fine-art print.`,
  },
  travel,
];
