// Your projects live here. See README.md for how to add a new one.
// Put images in public/projects/<slug>/ and reference them with img('<slug>', '<file name>').

const img = (slug: string, file: string) => `/projects/${slug}/${file}.webp`;

export type Screen = { src: string; alt: string; caption?: string };
export type Step = { src: string; title: string; text: string };
export type StageLayout = 'wall' | 'phones' | 'rise' | 'line' | 'queue' | 'rings' | 'bill' | 'arches';
export type StageTheme = 'black' | 'pistachio' | 'aubergine' | 'neutral' | 'charcoal';

export type Project = {
  slug: string;
  name: string;
  rtl?: boolean;
  logo?: string;
  kind: 'desktop' | 'mobile';
  category: string;
  summary: string;
  role: string;
  tools: string[];
  date?: string;
  // How screens are shown in the case study: 'phone' adds a phone mockup, 'plain' shows the bare
  // screen, 'own' is for images that already include a device.
  frame: 'phone' | 'plain' | 'own';
  stage: {
    layout: StageLayout;
    theme: StageTheme;
    screens: Screen[];
    highlight?: { label: string; value: string };
    receipt?: { title: string; rows: [string, string][]; total: [string, string] };
  };
  overview: string;
  question?: string;
  problem?: string;
  focus?: string[];
  focusTitle?: string;
  goals?: string[];
  users?: { title: string; text: string }[];
  insights?: string[];
  insightsTitle?: string;
  productTheme?: 'sand';
  note?: string;
  steps: Step[];
  architecture?: { layers: { title: string; items: string[] }[]; flow: string[] };
  artifacts?: { src: string; title: string }[];
};

export const projects: Project[] = [
  {
    slug: 'nuzul',
    name: 'NUZUL',
    kind: 'desktop',
    category: 'Hotel ERP System',
    summary: 'A hotel ERP covering front desk, finance, housekeeping and management.',
    problem: 'ERP modules make information hard to find during busy hotel shifts.',
    role: 'Product Designer',
    tools: ['Figma', 'UX Research'],
    date: 'November 2026',
    frame: 'plain',
    stage: {
      layout: 'wall',
      theme: 'black',
      screens: [
        { src: img('nuzul', 'checkin'), alt: 'NUZUL Quick Check-in screen', caption: 'Front desk: Quick Check-in' },
        { src: img('nuzul', 'clean'), alt: 'NUZUL Cleaning Tasks screen', caption: 'Housekeeping: Cleaning Tasks' },
        { src: img('nuzul', 'revenue'), alt: 'NUZUL Revenue Performance screen', caption: 'Management: Revenue Performance' },
      ],
    },
    overview:
      'ERP systems hold many features and modules, which makes navigation and finding information difficult. NUZUL brings a hotel’s daily operations into one web platform, with a focused workspace for each department.',
    question: 'How can we design an ERP system that makes hotel operations faster, clearer, and easier across different departments?',
    goals: ['Improve room turnaround', 'Faster check-in', 'Centralized billing', 'Better management visibility'],
    users: [
      { title: 'Front Desk Agent', text: 'Reservations, check-in and check-out, room assignment.' },
      { title: 'Housekeeping Manager', text: 'Room status, cleaning tasks, room readiness.' },
      { title: 'Finance', text: 'Guest folios, billing, closing the financial day.' },
      { title: 'General Manager', text: 'Occupancy, revenue, booking sources, VIP guests.' },
    ],
    insightsTitle: 'What the research showed',
    insights: [
      'Front desk agents switch between reservation, room and payment screens during one guest conversation.',
      'A room can show as clean in the system when it is not actually ready.',
      'Managers need clear numbers and to know what deserves attention first.',
    ],
    steps: [
      { src: img('nuzul', 'reservations'), title: 'Reservations', text: 'Arrivals, in-house guests and keys in one list, with the next action on each row.' },
      { src: img('nuzul', 'checkin'), title: 'Quick check-in', text: 'Three clear steps, with room status shown beside the assignment so staff can confirm a room is clean and inspected.' },
      { src: img('nuzul', 'checkout'), title: 'Guest check-out', text: 'The full bill, settlement options and key return on one screen.' },
      { src: img('nuzul', 'finance'), title: 'Finance', text: 'Revenue, transactions and open folios together.' },
      { src: img('nuzul', 'clean'), title: 'Housekeeping', text: 'Daily cleaning tasks and who is responsible for them.' },
      { src: img('nuzul', 'revenue'), title: 'Management', text: 'Revenue performance for the general manager.' },
    ],
  },
  {
    slug: 'hitchy',
    name: 'Hitchy',
    kind: 'mobile',
    category: 'Carpooling Platform',
    summary: 'Connects people traveling in similar directions to share car seats and trip costs.',
    problem: 'Daily commuters choose between costly ride-hailing, expensive solo driving and crowded transfers.',
    role: 'Product Designer',
    tools: ['Figma', 'Design Systems'],
    date: 'November 2026',
    frame: 'phone',
    stage: {
      layout: 'phones',
      theme: 'pistachio',
      screens: [
        { src: img('hitchy', 'role'), alt: 'Hitchy role choice screen' },
        { src: img('hitchy', 'plan'), alt: 'Hitchy Plan your ride screen' },
        { src: img('hitchy', 'rides'), alt: 'Hitchy My rides screen' },
      ],
    },
    overview:
      'Created for Products League 2026 in the Sustainable Cities track. Hitchy focuses on daily commuting in Greater Cairo, where ride-hailing is expensive, driving alone is costly, and public transport can mean several crowded transfers.',
    question: 'How can people who already travel the same route share the seats and the cost?',
    users: [
      { title: 'Riders', text: 'Commuters looking for an affordable seat on their daily route.' },
      { title: 'Car owners', text: 'Drivers who want to share their trip and its fuel cost.' },
    ],
    insightsTitle: 'Key decisions',
    insights: [
      'The fuel share goes directly from rider to car owner, separate from the platform fee.',
      'Launching on a single busy corridor gives riders and car owners a better chance of finding each other.',
    ],
    note: 'Potential benefits, such as lower commuting costs and fewer individual car trips, are estimates from the project’s feasibility study and have not been measured in use.',
    steps: [
      { src: img('hitchy', 'role'), title: 'Choose a role', text: 'One clear choice at the start: share your vehicle, or find a ride.' },
      { src: img('hitchy', 'plan'), title: 'Plan a ride', text: 'Route, date, time and passengers on one screen.' },
      { src: img('hitchy', 'confirm'), title: 'Booking confirmed', text: 'A clear confirmation with the trip details.' },
      { src: img('hitchy', 'rides'), title: 'My rides', text: 'Upcoming, completed and cancelled trips.' },
      { src: img('hitchy', 'rate'), title: 'Rate the ride', text: 'After the trip, riders rate the car owner and can report a problem.' },
    ],
    artifacts: [
      { src: img('hitchy', 'brand'), title: 'Brand identity' },
      { src: img('hitchy', 'colors'), title: 'Color palette and variables' },
      { src: img('hitchy', 'buttons'), title: 'Buttons and inputs' },
    ],
  },
  {
    slug: 'signconnect',
    name: 'SignConnect',
    kind: 'mobile',
    category: 'Accessible Mobile App · Graduation Project',
    summary: 'Translates sign language into text and voice in real time, using a smart glove.',
    problem: 'Deaf or hard-of-hearing people and hearing people face a daily communication gap.',
    focusTitle: 'What the design covers',
    focus: ['Onboarding and user role selection', 'Authentication flows', 'Smart device connection', 'Live translation as text and voice', 'Profile and settings'],
    role: 'Product Designer',
    tools: ['Figma', 'UX Research', 'User Flow', 'Prototyping', 'Accessibility Design'],
    date: '10/2025 – 02/2026',
    frame: 'phone',
    stage: {
      layout: 'rise',
      theme: 'aubergine',
      screens: [
        { src: img('signconnect', 'role'), alt: 'SignConnect Choose who you are screen' },
        { src: img('signconnect', 't1'), alt: 'SignConnect live translation in text mode' },
        { src: img('signconnect', 't2'), alt: 'SignConnect live translation in voice mode' },
      ],
    },
    overview:
      'SignConnect aims to bridge the communication gap between deaf or hard-of-hearing people and hearing users. The design focuses on accessibility, clarity and seamless interaction, from choosing a role to connecting the glove and translating live. The product was tested with its target users, Deaf and speech-impaired people.',
    question: 'How can deaf or hard-of-hearing users and hearing users communicate in real time?',
    steps: [
      { src: img('signconnect', 'role'), title: 'Choose who you are', text: 'Hearing user, or Deaf or hard-of-hearing user: the app starts by asking.' },
      { src: img('signconnect', 'g1'), title: 'Connect your gloves', text: 'Turn on Bluetooth and put on the gloves.' },
      { src: img('signconnect', 'g2'), title: 'Searching', text: 'A clear waiting state while the app finds the gloves.' },
      { src: img('signconnect', 'g3'), title: 'Connected', text: 'Battery, signal and hand detection confirmed before starting.' },
      { src: img('signconnect', 't1'), title: 'Live translation: text', text: 'Text mode of the translation screen.' },
      { src: img('signconnect', 't2'), title: 'Live translation: voice', text: 'Voice mode, with audio playback.' },
    ],
    architecture: {
      layers: [
        { title: 'User', items: ['Deaf or hard-of-hearing user', 'Hearing user'] },
        { title: 'Interface', items: ['Role selection', 'Glove input', 'Microphone input', 'Chat and avatar display'] },
        { title: 'Hardware', items: ['Smart glove', 'Microphone'] },
        { title: 'Application', items: ['Speech recognition', 'Sign recognition', 'Translation engine', 'Avatar control', 'Auth and security'] },
        { title: 'Server', items: ['API gateway', 'Gesture recognition', 'Database of signs, labels and users', 'Cache and load balancer'] },
      ],
      flow: ['Send glove frames, audio or text', 'Model inference for sign or speech', 'Translation result as text or sign sequence', 'Response as text or avatar commands', 'Display text, avatar animation or audio'],
    },
    artifacts: [
      { src: img('signconnect', 'persona-1'), title: 'Persona: hearing psychiatrist' },
      { src: img('signconnect', 'persona-2'), title: 'Persona: Deaf graphic designer' },
      { src: img('signconnect', 'storyboard'), title: 'Storyboard' },
    ],
  },
  {
    slug: 'monoguide',
    name: 'Monoguide',
    kind: 'mobile',
    category: 'Monorail Navigation App',
    summary: 'Guides first-time monorail users through their journey, step by step.',
    focusTitle: 'What the design covers',
    focus: ['Station navigation', 'Ticket activation', 'Gate scanning', 'Live ride tracking'],
    role: 'Product Designer',
    tools: ['Figma'],
    date: '03/2026 – 04/2026',
    frame: 'plain',
    stage: {
      layout: 'line',
      theme: 'neutral',
      screens: [
        { src: img('monoguide', '1'), alt: 'Monoguide Plan Your Journey screen', caption: 'Plan' },
        { src: img('monoguide', '4'), alt: 'Monoguide Activate Ticket screen', caption: 'Activate' },
        { src: img('monoguide', '5'), alt: 'Monoguide Scan Gate screen', caption: 'Scan' },
        { src: img('monoguide', '7'), alt: 'Monoguide Ride Tracking screen', caption: 'Ride' },
      ],
    },
    overview:
      'A smart mobile app that simplifies station navigation, ticket activation, gate scanning and live ride tracking, reducing confusion and making public transportation more accessible for new users.',
    steps: [
      { src: img('monoguide', '1'), title: 'Plan the journey', text: 'Choose where you start and where you are going.' },
      { src: img('monoguide', '2'), title: 'Journey overview', text: 'Every stage of the trip, with the time for each.' },
      { src: img('monoguide', '4'), title: 'Activate ticket', text: 'A QR ticket with the station details.' },
      { src: img('monoguide', '5'), title: 'Scan at the gate', text: 'Three simple steps through the gate.' },
      { src: img('monoguide', '6'), title: 'Platform guide', text: 'The next train and the right platform.' },
      { src: img('monoguide', '7'), title: 'Ride tracking', text: 'Stations along the live route.' },
    ],
  },
  {
    slug: 'flowpass',
    name: 'FlowPass',
    kind: 'mobile',
    category: 'Smart Queue Management',
    summary: 'Book a place in line remotely, follow the live queue, and arrive just before your turn.',
    problem: 'Waiting rooms cost people time they could spend elsewhere.',
    focusTitle: 'What the design covers',
    focus: ['Booking tickets remotely', 'Live queue status', 'Real-time notifications', 'Arriving just before your turn', 'UX research, personas, journey mapping and wireframing'],
    role: 'Product Designer',
    tools: ['Figma', 'UX Research', 'Journey Mapping', 'Wireframing'],
    date: '04/2026',
    frame: 'plain',
    stage: {
      layout: 'queue',
      theme: 'charcoal',
      highlight: { label: 'Now serving', value: '44' },
      screens: [
        { src: img('flowpass', 'branch'), alt: 'FlowPass Select a Branch screen' },
        { src: img('flowpass', 'live'), alt: 'FlowPass Live Queue Status screen' },
        { src: img('flowpass', 'turn'), alt: 'FlowPass It’s Your Turn screen' },
      ],
    },
    overview:
      'FlowPass began as a case study on waiting in clinics and medical labs. The app extends the same idea to banks, hospitals and government offices, so people can book remotely, track the queue, get notified, and arrive just before their turn.',
    steps: [
      { src: img('flowpass', 'find'), title: 'Find your service', text: 'Bank, hospital, government office or clinic.' },
      { src: img('flowpass', 'branch'), title: 'Select a branch', text: 'Distance and how busy each branch is.' },
      { src: img('flowpass', 'live'), title: 'Live queue status', text: 'The number being served, so nobody has to keep asking.' },
      { src: img('flowpass', 'almost'), title: 'Almost your turn', text: 'A reminder to head back.' },
      { src: img('flowpass', 'turn'), title: 'It’s your turn', text: 'Proceed to your window.' },
    ],
  },
  {
    slug: 'zen-roots',
    name: 'Zen Roots',
    kind: 'mobile',
    category: 'Wellness App · IEEE DevDuel',
    summary: 'A meditation and wellness app with live sessions, sleep tools and community features.',
    focusTitle: 'What the app includes',
    focus: ['Live meditation sessions', 'Flower meditation', 'Yoga', 'Sleep improvement', 'Nature sounds', 'Community'],
    role: 'Flutter Developer',
    tools: ['Flutter', 'Dart'],
    date: '05/2024 – 06/2024',
    frame: 'plain',
    stage: {
      layout: 'rings',
      theme: 'aubergine',
      screens: [
        { src: img('zen-roots', 'home'), alt: 'Zen Roots home screen' },
        { src: img('zen-roots', 'meditation'), alt: 'Zen Roots meditation screen' },
        { src: img('zen-roots', 'ocean'), alt: 'Zen Roots Ocean Waves player' },
      ],
    },
    overview:
      'A cross-platform wellness app built in Flutter for IEEE DevDuel. I implemented the responsive UI from Figma designs and managed state, navigation and reusable components.',
    steps: [
      { src: img('zen-roots', 'welcome'), title: 'Welcome', text: 'Onboarding introduces the app.' },
      { src: img('zen-roots', 'home'), title: 'Choose your target', text: 'Share a feeling, then pick a goal.' },
      { src: img('zen-roots', 'meditation'), title: 'Meditation', text: 'Guided practices to choose from.' },
      { src: img('zen-roots', 'flower'), title: 'Flower meditation', text: 'Sessions with length and rating.' },
      { src: img('zen-roots', 'sleep'), title: 'Sleep improvement', text: 'Mindfulness, sounds and bedtime stories.' },
      { src: img('zen-roots', 'ocean'), title: 'Nature sounds', text: 'A player for calming audio.' },
      { src: img('zen-roots', 'community'), title: 'Community', text: 'Posts shared by other users.' },
    ],
  },
  {
    slug: 'ala-hesabak',
    name: 'على حسابك',
    rtl: true,
    kind: 'mobile',
    category: 'Bill Splitting App',
    summary: 'Splits bills between friends and organizes who owes what.',
    focusTitle: 'What the design covers',
    focus: ['Managing shared expenses', 'Calculating each person’s share', 'Organizing payments'],
    role: 'Product Designer',
    tools: ['Figma'],
    date: '03/2026',
    frame: 'own',
    stage: {
      layout: 'bill',
      theme: 'pistachio',
      receipt: {
        title: 'على حسابك',
        rows: [['ahmed', '150 EGP'], ['mohamed', '120 EGP'], ['ramy', '140 EGP'], ['adel', '120 EGP']],
        total: ['Total', '530 EGP'],
      },
      screens: [
        { src: img('ala-hesabak', 'summary'), alt: 'Bill summary screen' },
        { src: img('ala-hesabak', 'done-hi'), alt: 'Settlement completed screen' },
      ],
    },
    overview: 'A mobile app that simplifies splitting bills between friends by managing shared expenses, calculating each person’s share, and organizing payments.',
    steps: [
      { src: img('ala-hesabak', 'start'), title: 'Start', text: 'The app opens on the shared table.' },
      { src: img('ala-hesabak', 'create'), title: 'Create a session', text: 'Name the outing and add friends.' },
      { src: img('ala-hesabak', 'add'), title: 'Add the bill', text: 'Enter each item and its price.' },
      { src: img('ala-hesabak', 'split'), title: 'Split the bill', text: 'Choose how to divide it.' },
      { src: img('ala-hesabak', 'summary'), title: 'Summary', text: 'See what each person owes.' },
      { src: img('ala-hesabak', 'done'), title: 'Done', text: 'The settlement is complete.' },
    ],
  },
  {
    slug: 'uns',
    productTheme: 'sand',
    name: 'أُنس',
    rtl: true,
    logo: img('uns', 'logo'),
    kind: 'mobile',
    category: 'Ramadan Potluck Organizer',
    summary: 'Coordinates dishes for Ramadan gatherings with an interactive Table Canvas.',
    problem: 'At Ramadan potlucks, guests can end up bringing the same dish.',
    focusTitle: 'What the design covers',
    focus: ['Interactive Table Canvas', 'Smart dish selection to avoid repetition', 'Countdown to Iftar', 'A calm interface in warm olive, navy and brown tones'],
    role: 'Product Designer',
    tools: ['Figma'],
    date: '02/2026',
    frame: 'plain',
    stage: {
      layout: 'arches',
      theme: 'aubergine',
      screens: [
        { src: img('uns', 'dish'), alt: 'أُنس dish selection screen' },
        { src: img('uns', 'table'), alt: 'أُنس Table Canvas screen' },
        { src: img('uns', 'count'), alt: 'أُنس Iftar countdown screen' },
      ],
    },
    overview: 'A mobile app that helps prevent duplicate dishes at Ramadan potluck dinners. Guests see which dishes are still missing on a Table Canvas, pick what they will bring, and follow a countdown to Iftar.',
    steps: [
      { src: img('uns', 'table'), title: 'Table Canvas', text: 'See the table and which dishes are missing.' },
      { src: img('uns', 'dish'), title: 'Choose a dish', text: 'Pick what you will bring.' },
      { src: img('uns', 'count'), title: 'Ready for Iftar', text: 'The full table, with a countdown to Iftar.' },
    ],
  },
];

// Change these two lists to decide which projects are featured. Every project stays accessible.
const featuredSlugs = ['nuzul', 'signconnect', 'hitchy', 'flowpass', 'uns'];
const additionalSlugs = ['monoguide', 'zen-roots', 'ala-hesabak'];
const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!;

export const featuredProjects = featuredSlugs.map(bySlug);
export const additionalProjects = additionalSlugs.map(bySlug);
export const orderedProjects = [...featuredProjects, ...additionalProjects];
export const isFeatured = (slug: string) => featuredSlugs.includes(slug);
