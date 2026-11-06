// Graduation landing pages. Each school gets content that only fits that campus:
// real landmarks, the town, and what's nearby. Keep claims factual; never say we've
// shot somewhere unless we have.

export type School = {
  slug: string;
  name: string;
  short: string;
  town: string;
  title: string;
  description: string;
  intro: string;
  spots: { name: string; body: string }[];
  nearby: { name: string; body: string };
  timing: string;
};

export const schools: School[] = [
  {
    slug: 'yale',
    name: 'Yale University',
    short: 'Yale',
    town: 'New Haven',
    title: 'Yale Graduation Photos',
    description:
      'Yale graduation portraits in New Haven, CT: Old Campus, Cross Campus, Sterling Library and Harkness Tower. Sessions from $175, add another graduate for $125.',
    intro:
      "We're based in New Haven, a few minutes from Phelps Gate, so Yale is right in our backyard.",
    spots: [
      { name: 'Old Campus & Phelps Gate', body: 'The arched gate off the Green and the big lawn behind it. The classic first frame, especially in cap and gown.' },
      { name: 'Cross Campus & Sterling', body: "Sterling Memorial Library's gothic front makes a dramatic backdrop, with open lawn in front for walking and candid shots." },
      { name: 'Harkness Tower', body: 'Looking up from the courtyards around it gives you stone, ivy and sky in one frame.' },
      { name: 'Beinecke Plaza', body: 'Clean marble lines and a modern feel, a nice contrast to the gothic buildings next door.' },
    ],
    nearby: { name: 'The New Haven Green', body: 'Right next to Old Campus, with big elms and open space for family groups.' },
    timing:
      "Commencement is in late May, and the week around it fills fast. Shooting a few weeks before puts you on a quieter campus and gives you photos to share before the ceremony.",
  },
  {
    slug: 'southern-connecticut-state',
    name: 'Southern Connecticut State University',
    short: 'Southern CT State',
    town: 'New Haven',
    title: 'Southern CT State (SCSU) Graduation Photos',
    description:
      'SCSU graduation portraits in New Haven, CT: Buley Library, Founders Gate and views of West Rock. Sessions from $175, add another graduate for $125.',
    intro:
      "Southern sits right under West Rock, which means a campus with a real ridge in the background. It's a short drive from downtown New Haven.",
    spots: [
      { name: 'Buley Library', body: 'The front entrance and its clock face are the most recognizable spot on campus.' },
      { name: 'Founders Gate', body: 'Between Lyman Center and Engleman Hall. A simple, timeless frame for cap and gown.' },
      { name: 'West Rock views', body: 'The steel rings outside Engleman Hall frame the ridge itself, an only-at-Southern shot.' },
      { name: 'The academic quad', body: 'Open lawn and paths for walking shots and groups with family.' },
    ],
    nearby: { name: 'West Rock Ridge State Park', body: 'Minutes from campus, with trails and wide views over New Haven and the Sound.' },
    timing:
      "Commencement is in May. Shooting in late April or early May usually catches the trees leafing out and a calmer campus.",
  },
  {
    slug: 'quinnipiac',
    name: 'Quinnipiac University',
    short: 'Quinnipiac',
    town: 'Hamden',
    title: 'Quinnipiac Graduation Photos',
    description:
      'Quinnipiac graduation portraits in Hamden, CT: the Arnold Bernhard Library clock tower, the Quad and Sleeping Giant. Sessions from $175, add another graduate for $125.',
    intro:
      'The Mount Carmel campus sits at the foot of Sleeping Giant, so you get a classic quad and a mountain in the same session.',
    spots: [
      { name: 'The clock tower', body: 'The Arnold Bernhard Library tower is the centerpiece of campus and the shot most Bobcats want.' },
      { name: 'The Quad', body: 'Open green space in front of the library, good for walking shots and family groups.' },
      { name: 'Campus paths', body: 'Tree-lined walkways with Sleeping Giant rising behind them.' },
    ],
    nearby: { name: 'Sleeping Giant State Park', body: 'Right across the street. A short walk on the trails gets you woods, rock and views over Hamden.' },
    timing:
      "Commencement is in May. Shooting a few weeks ahead keeps it relaxed, and golden hour behind the clock tower is hard to beat.",
  },
  {
    slug: 'university-of-new-haven',
    name: 'University of New Haven',
    short: 'University of New Haven',
    town: 'West Haven',
    title: 'University of New Haven Graduation Photos',
    description:
      'University of New Haven graduation portraits in West Haven, CT: Maxcy Hall, the Maxcy Quad and the shoreline at Savin Rock. Sessions from $175, add another graduate for $125.',
    intro:
      "UNH is a few minutes from the water, so you can do campus classics and a beach sunset in one session.",
    spots: [
      { name: 'Maxcy Hall', body: "The university's original building in West Haven, with the most traditional look on campus." },
      { name: 'The Maxcy Quad', body: 'Open lawn for cap tosses, walking shots and groups with family.' },
      { name: 'Peterson Library', body: 'A clean, modern backdrop for a second look.' },
    ],
    nearby: { name: 'Savin Rock & the West Haven shoreline', body: 'A short drive down to the boardwalk and beach. Golden hour over the Sound is the payoff.' },
    timing:
      "Commencement is in May. Booking a session a few weeks before lets you share photos ahead of the big day.",
  },
];
