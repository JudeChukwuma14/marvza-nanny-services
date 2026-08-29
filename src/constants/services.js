import {
  Hotel, Zap, PartyPopper, Heart, Plane, Moon,
  UserCheck, Clock, Backpack, CalendarClock, Baby, Sunset,
} from 'lucide-react'

export const SERVICES = [
  {
    slug: 'hotel-nanny',
    name: 'Hotel Nannies',
    tagline: 'Childcare for guests staying in London hotels',
    icon: Hotel,
    color: '#3A6EA5',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=600&auto=format&fit=crop',
    description: 'On-demand, professional childcare for guests staying in London hotels, so parents can relax, work or explore the city with peace of mind.',
    longDescription: `Whether you're travelling for business or leisure, our hotel nanny service brings experienced, fully vetted childcare directly to your hotel room or suite. We work with concierge teams and guests directly to arrange cover at short notice, for a few hours or the full length of your stay.`,
    whoFor: 'Hotel guests, concierge teams and travel planners who need reliable in-room or nearby childcare for visiting families.',
    benefits: [
      'Available at short notice across London hotels',
      'Fully vetted, experienced nannies',
      'Flexible bookings by the hour or for your full stay',
      'Discreet, professional in-room care',
      'Can liaise directly with hotel concierge',
    ],
    faqs: [
      {
        question: 'Can you provide childcare on the same day I check in?',
        answer: 'In most cases, yes — subject to availability. We recommend booking as early as possible, but we do accept short-notice hotel bookings.',
      },
      {
        question: 'Do you work directly with hotel concierge teams?',
        answer: 'Yes. We regularly coordinate with concierge and guest relations teams across London hotels to arrange childcare for guests.',
      },
    ],
  },
  {
    slug: 'backup-emergency-nanny',
    name: 'Backup & Emergency Nannies',
    tagline: 'Same-day cover when your regular nanny is unavailable',
    icon: Zap,
    color: '#B94A48',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
    description: `Same-day and short-notice childcare cover when your family's regular nanny is off sick, on leave, or otherwise unavailable.`,
    longDescription: `Life doesn't always go to plan. Our backup and emergency nanny service gives you access to a pool of experienced, vetted professionals ready to step in at short notice — so you never have to miss a day's work or scramble for cover.`,
    whoFor: 'Families with an existing nanny or nursery arrangement who need occasional, reliable cover at short notice.',
    benefits: [
      'Available at short notice, including same-day',
      'Experienced, thoroughly vetted professionals',
      'Flexible single days or short runs of cover',
      'No long-term commitment required',
      'Consistent quality of care under pressure',
    ],
    faqs: [
      {
        question: 'How quickly can a backup or emergency nanny be arranged?',
        answer: 'We aim to place cover as quickly as possible, including same-day where availability allows. The sooner you contact us, the more options we can offer.',
      },
      {
        question: 'Is there a minimum booking length?',
        answer: 'No — backup and emergency cover can be booked for a single day or repeated as needed.',
      },
    ],
  },
  {
    slug: 'event-nanny',
    name: 'Event Nannies',
    tagline: 'Childcare for corporate events, parties and productions',
    icon: PartyPopper,
    color: '#B98945',
    image: 'https://images.unsplash.com/photo-1530103862676-de8892b12a15?q=80&w=600&auto=format&fit=crop',
    description: 'Professional childcare for corporate events, parties, private functions and productions — so children are safe and entertained while everyone else enjoys the occasion.',
    longDescription: `Our event nannies are experienced professionals who ensure children are safe, engaged and well cared for during your event — freeing up parents, guests and organisers to be fully present. We staff everything from small private parties to larger corporate functions and productions.`,
    whoFor: 'Event organisers, corporate teams, and families hosting parties or functions where children will be present.',
    benefits: [
      'Experienced with group and one-to-one childcare',
      'Engaging, age-appropriate activities',
      'Safe, supervised environment throughout your event',
      'Scales from small gatherings to larger productions',
      'Allows parents and organisers to be fully present',
    ],
    faqs: [
      {
        question: 'How many nannies do we need for our event?',
        answer: 'This depends on the number and ages of children attending. As a guide, we recommend at least one nanny per four children.',
      },
      {
        question: `Can you staff a dedicated children's area at our event?`,
        answer: 'Yes — we can set up and run a supervised children\'s area for the duration of your event.',
      },
    ],
  },
  {
    slug: 'wedding-nanny',
    name: 'Wedding Nannies',
    tagline: `Individual care or a staffed children's area for your big day`,
    icon: Heart,
    color: '#9C7048',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    description: `Individual childcare or a fully staffed children's area during weddings, so parents and guests can celebrate without worry.`,
    longDescription: `Weddings bring families together — including the youngest guests. Our wedding nannies provide individual, one-to-one care or run a dedicated, supervised children's area for the day, keeping little ones happy and entertained while the celebration continues.`,
    whoFor: 'Couples and wedding planners who want children looked after — individually or as a group — throughout the ceremony and reception.',
    benefits: [
      'One-to-one or group childcare on the day',
      `Dedicated, supervised children's area available`,
      'Experienced with formal and all-day events',
      `Coordinated closely with your wedding planner`,
      'Lets parents and guests fully enjoy the day',
    ],
    faqs: [
      {
        question: 'Can nannies cover the ceremony and reception?',
        answer: 'Yes — we can arrange cover for the ceremony only, the reception only, or the full day.',
      },
      {
        question: 'Do you liaise with our wedding planner or venue?',
        answer: `Yes, we're happy to coordinate directly with your planner or venue to fit around your day's schedule.`,
      },
    ],
  },
  {
    slug: 'travel-vacation-nanny',
    name: 'Travel & Vacation Nannies',
    tagline: 'UK and international travel with your family',
    icon: Plane,
    color: '#3F7656',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop',
    description: 'Experienced nannies who travel with your family across the UK and internationally, providing continuity of care wherever you go.',
    longDescription: `Travelling with children — for a family holiday, a work trip, or an extended stay abroad — is easier with the right support. Our travel and vacation nannies join your family for the duration of the trip, providing familiar, consistent care in a new environment.`,
    whoFor: 'Families travelling within the UK or abroad who want continuity of childcare while away from home.',
    benefits: [
      'Experienced travelling with families internationally',
      'Continuity of care away from home',
      'Flexible to holiday and travel itineraries',
      'Can support with jet lag, routines and time zones',
      'Frees parents to relax or work while travelling',
    ],
    faqs: [
      {
        question: 'Do travel nannies need a visa or work permit?',
        answer: `This depends on the destination. We'll discuss the requirements for your specific trip and help you plan accordingly.`,
      },
      {
        question: 'Who covers travel costs and accommodation?',
        answer: 'Typically the family covers travel, accommodation and expenses for the nanny during the trip — full details are agreed before you travel.',
      },
    ],
  },
  {
    slug: 'night-nanny',
    name: 'Night Nannies',
    tagline: 'Overnight support, particularly for babies and young children',
    icon: Moon,
    color: '#2A1B17',
    image: 'https://images.unsplash.com/photo-1555252834-58bcbc366976?q=80&w=600&auto=format&fit=crop',
    description: 'Overnight childcare support, particularly for babies and young children, so parents can rest and recover.',
    longDescription: `The early months and years with a new baby can be exhausting. Our night nannies provide overnight support — feeding, settling and soothing your child through the night — so parents can get the rest they need.`,
    whoFor: 'Families with babies or young children who need overnight support, particularly during the newborn period or sleep-training.',
    benefits: [
      'Specialist experience with babies and young children',
      'Supports feeding, settling and night routines',
      'Allows parents uninterrupted rest',
      'Available for single nights or ongoing support',
      'Can support with sleep training approaches',
    ],
    faqs: [
      {
        question: 'What hours does a night nanny typically cover?',
        answer: 'Night nannies typically cover from evening bedtime through to early morning, though exact hours are agreed with your nanny.',
      },
      {
        question: 'Can a night nanny help with sleep training?',
        answer: 'Many of our night nannies have experience supporting gentle sleep training approaches — let us know your preferences when enquiring.',
      },
    ],
  },
  {
    slug: 'full-time-nanny',
    name: 'Full-Time Nannies',
    tagline: 'Permanent, live-in or live-out placements',
    icon: UserCheck,
    color: '#3B2923',
    image: 'https://images.unsplash.com/photo-1602353158021-0a6eb64016fc?q=80&w=600&auto=format&fit=crop',
    description: 'A dedicated nanny working regular hours as part of your household, on a live-in or live-out basis — the gold standard in personalised childcare.',
    longDescription: `A full-time nanny becomes an integral part of your family life, providing consistent, personalised care tailored to your children's routines and development. Placements can be arranged live-in or live-out, depending on what suits your household best.`,
    whoFor: 'Families with children of any age who need consistent, high-quality care throughout the working week, on a permanent basis.',
    benefits: [
      'Consistent one-to-one care',
      'Live-in or live-out arrangements available',
      'Child-led routines and activities',
      'School and nursery runs',
      'Light household duties related to the children',
      'Continuity of care and strong bonding',
    ],
    faqs: [
      {
        question: 'What hours does a full-time nanny typically work?',
        answer: 'Full-time nannies typically work between 40–50 hours per week, though this is agreed between you and your nanny directly.',
      },
      {
        question: 'Should we choose live-in or live-out?',
        answer: `This depends on your household's space, routine and need for flexibility. We'll talk through both options during matching.`,
      },
    ],
  },
  {
    slug: 'part-time-nanny',
    name: 'Part-Time Nannies',
    tagline: 'Recurring care for fewer hours or days',
    icon: Clock,
    color: '#A8927E',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop',
    description: 'Recurring, part-time childcare for families who need fewer hours or days each week rather than full-time cover.',
    longDescription: `Not every family needs a nanny five days a week. Our part-time nannies provide reliable, recurring care on the specific days and hours that suit your household — whether that's a couple of mornings a week or set days around your work schedule.`,
    whoFor: 'Families who need regular but reduced-hours childcare, such as a few days or mornings each week.',
    benefits: [
      'Recurring, dependable weekly schedule',
      'Flexible to the specific days and hours you need',
      'Consistent carer for your children each week',
      'More affordable than full-time cover',
      'Easily combined with nursery or school hours',
    ],
    faqs: [
      {
        question: `What's the minimum commitment for part-time care?`,
        answer: 'We typically look for a regular weekly pattern, even if it\'s just one or two sessions, so your nanny can build routine with your children.',
      },
      {
        question: 'Can part-time hours change from week to week?',
        answer: 'Some flexibility is possible, but part-time nannies generally work best with a consistent, agreed schedule.',
      },
    ],
  },
  {
    slug: 'after-school-nanny',
    name: 'After-School Nannies',
    tagline: 'Collection, activities, meals and evening routines',
    icon: Backpack,
    color: '#B88A62',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop',
    description: 'Reliable after-school support covering school collection, activities, meals and the evening routine until parents are home.',
    longDescription: `The after-school hours can be some of the busiest of the day. Our after-school nannies collect your children from school or activities, help with homework, prepare meals and manage the evening routine — bridging the gap until you're home.`,
    whoFor: `Working families who need consistent support from school pick-up through to bedtime or parents' return home.`,
    benefits: [
      'School and activity collection',
      'Homework support',
      'Meal preparation for children',
      'Bath and bedtime routines where needed',
      'Consistent, familiar carer each afternoon',
    ],
    faqs: [
      {
        question: 'Can an after-school nanny collect from multiple schools or activities?',
        answer: 'Yes, we can match you with a nanny able to manage school and activity collections for multiple children.',
      },
      {
        question: 'Do after-school nannies drive?',
        answer: `Many do — let us know if a driving licence and car access are important for your family, and we'll match accordingly.`,
      },
    ],
  },
  {
    slug: 'temporary-adhoc-nanny',
    name: 'Temporary & Ad-Hoc Nannies',
    tagline: 'One day, several days or several weeks',
    icon: CalendarClock,
    color: '#5A4238',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112fc71921?q=80&w=600&auto=format&fit=crop',
    description: 'Flexible temporary childcare for one day, several days or several weeks — without a long-term commitment.',
    longDescription: `Sometimes you need childcare for a defined period rather than an ongoing arrangement — covering a house move, a busy work project, or a gap between other care. Our temporary and ad-hoc nannies provide experienced, reliable cover for exactly the period you need.`,
    whoFor: 'Families who need short-term or one-off childcare cover without committing to a permanent placement.',
    benefits: [
      'Flexible from a single day to several weeks',
      'No long-term commitment required',
      'Experienced, fully vetted professionals',
      'Quick to arrange for planned or unplanned gaps',
      'Can be repeated whenever the need arises',
    ],
    faqs: [
      {
        question: 'How far in advance should we book temporary cover?',
        answer: 'As far in advance as possible for the best availability, though we do accommodate shorter-notice requests where we can.',
      },
      {
        question: 'Can temporary cover turn into an ongoing arrangement?',
        answer: `Yes — if it's a good fit, many temporary placements can be extended or transitioned into a part-time or full-time arrangement.`,
      },
    ],
  },
  {
    slug: 'maternity-newborn-nanny',
    name: 'Maternity/Newborn Nannies',
    tagline: 'Specialist newborn and postnatal support',
    icon: Baby,
    color: '#7C6659',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop',
    description: 'Specialist newborn and postnatal support for new parents, from feeding and settling to establishing early routines.',
    longDescription: `The first weeks and months with a newborn are a huge adjustment. Our maternity and newborn nannies bring specialist experience in newborn care — supporting feeding, settling, sleep and early routines — while helping new parents recover and adjust with confidence.`,
    whoFor: 'New and expectant parents who want specialist, experienced support during the newborn and early postnatal period.',
    benefits: [
      'Specialist newborn care experience',
      'Support with feeding and settling',
      'Guidance establishing early routines',
      'Reassurance and support for new parents',
      'Available on a daytime, overnight or live-in basis',
    ],
    faqs: [
      {
        question: 'When should we book a maternity nanny?',
        answer: 'Many families book during pregnancy to secure the right match, with the nanny starting shortly after the baby arrives.',
      },
      {
        question: 'Can a maternity nanny support multiples?',
        answer: 'Yes, several of our maternity nannies have specific experience supporting families with twins or multiples.',
      },
    ],
  },
  {
    slug: 'evening-babysitter',
    name: 'Evening Babysitters',
    tagline: 'Evening and late-night bookings',
    icon: Sunset,
    color: '#3B2923',
    image: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=600&auto=format&fit=crop',
    description: 'Trusted evening and late-night babysitting, so parents can enjoy an evening out or a quiet night in with peace of mind.',
    longDescription: `Whether it's a date night, a work event, or simply an evening to yourselves, our evening babysitters provide reliable, friendly care for your children — with the same vetting standards as our nanny placements.`,
    whoFor: 'Families who need occasional evening or late-night cover for a few hours at a time.',
    benefits: [
      'Available for evening and late-night bookings',
      'Same vetting standards as our nanny placements',
      'Ideal for occasional or one-off evenings out',
      'Flexible, short-notice bookings where possible',
      'Familiar routine handover for bedtime',
    ],
    faqs: [
      {
        question: 'How last-minute can we book an evening babysitter?',
        answer: 'We recommend booking as early as you can, but we do try to accommodate shorter-notice evening requests where availability allows.',
      },
      {
        question: 'Is there a minimum number of hours for babysitting?',
        answer: `We typically ask for a minimum booking of a few hours per evening — let us know your plans and we'll confirm what's possible.`,
      },
    ],
  },
]

export function getServiceBySlug(slug) {
  return SERVICES.find(s => s.slug === slug)
}
