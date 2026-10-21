import type { DetailPageContent } from './detail-page';
import { PHOTOS } from './photos';

/** A service offered on /services and detailed on /services/[slug]. */
export interface ServiceOffering {
  slug: string;
  /** Name of the card icon, see lib/content/icons.ts. */
  iconName: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  linkLabel: string;
  page: DetailPageContent;
  /** `false` keeps the page live but out of the /services carousel (which follows the design's 10 cards). */
  listed?: boolean;
  /** Position in lists; set from the dashboard. Defaults to the order below. */
  order?: number;
}

// Order and card copy follow the services carousel in the design.
export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    slug: 'alternative-provision',
    iconName: 'Crown',
    eyebrow: 'Personalised Pathways',
    title: 'Alternative Provision',
    description: 'Education shaped around learners who need a different approach to school.',
    points: ['Flexible delivery', 'Individual learning goals', 'Regular reviews and transition planning'],
    linkLabel: 'Explore Alternative Provision',
    page: {
      hero: {
        badge: 'Alternative Provision',
        title: 'What Is Alternative Provision?',
        intro:
          "Alternative Provision provides education for children and young people who are unable to fully access mainstream education. Every learner's circumstances are different, which is why every programme should be designed around the individual rather than following a standard model.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'pink',
          corner: 'tl',
          eyebrow: 'Who We Support',
          title: 'Supporting Learners With Complex Educational Needs',
          body: 'We support learners experiencing SEND, SEMH, EBSNA, medical needs, disrupted education, placement breakdown, reduced timetables, transition challenges and those at risk of exclusion.',
          cutout: { photo: PHOTOS.teenCelebrating, side: 'right' },
        },
        {
          kind: 'text',
          accent: true,
          eyebrow: 'Delivery',
          title: 'Flexible Learning That Fits Around The Learner',
          body: 'Programmes can include one-to-one education, community learning, online learning, hybrid learning, EOTAS and reintegration support. Every pathway is personalised to maximise engagement and educational progress.',
        },
        {
          kind: 'card',
          tone: 'cyan',
          corner: 'tl',
          eyebrow: 'Benefits',
          title: 'Why Choose MUVE Futures?',
          body: 'Our personalised approach combines flexible delivery, relationship-based practice, collaborative planning, regular reviews and transition planning to create meaningful educational outcomes.',
        },
      ],
      closing: {
        title: "Let's Build The Right Pathway Together",
        body: "Tell us about the learner and we'll help you identify the most appropriate education pathway.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'one-to-one-education',
    iconName: 'Users',
    eyebrow: 'Individual Support',
    title: 'One-to-One Education',
    description: "Teaching tailored to one learner's strengths, needs and pace.",
    points: ['Personalised learning plan', 'Flexible learning environment', 'Progress and transition support'],
    linkLabel: 'Explore one-to-one education',
    page: {
      hero: {
        badge: 'One-to-One Education',
        title: 'Learning Built Around The Individual.',
        intro:
          'One-to-one education allows teaching methods, pace and learning environments to be tailored to each learner. By adapting education to individual strengths and needs, we create positive learning experiences that encourage confidence and long-term engagement.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'pink',
          align: 'right',
          eyebrow: 'Suitable For',
          title: 'Who Can Benefit?',
          body: 'One-to-one education may support learners experiencing SEND, SEMH, EBSNA, medical needs, anxiety around school, interrupted education, reintegration planning or transition between educational settings.',
          cutout: { photo: PHOTOS.threeChildren, side: 'left' },
        },
        {
          kind: 'text',
          eyebrow: 'Programme',
          title: "What's Included",
          // The design repeats the SEND "Suitable for" copy here; this is a stand-in until real copy is supplied.
          body: 'Every programme may include a personalised learning plan, a flexible learning environment, specialist input where needed and regular progress reviews shared with families, schools and professionals.',
        },
        { kind: 'photo', photo: PHOTOS.puzzleHands },
      ],
      closing: {
        title: 'Every Learner Deserves The Opportunity To Thrive',
        body: "Let's create an education pathway designed around the learner's strengths and goals.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
  {
    slug: 'community-learning',
    iconName: 'Users2',
    eyebrow: 'Learning Through Experience',
    title: 'Community Learning',
    description:
      'Purposeful learning in real-world spaces that builds confidence and practical skills.',
    points: [
      'Activities linked to learning goals',
      'Communication and social skills',
      'Independence and life skills',
    ],
    linkLabel: 'Explore community learning',
    page: {
      hero: {
        badge: 'Community Learning',
        title: 'Real-World Learning Experiences.',
        intro:
          'Community Learning provides opportunities for young people to engage with education in authentic environments while continuing to work towards agreed educational outcomes. Every activity is purposeful and linked to individual learning goals.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'pink',
          align: 'center',
          eyebrow: 'Benefits',
          title: 'Developing Skills For Life',
          body: 'Community Learning helps learners build confidence, communication, independence, social skills, problem-solving ability and employability while encouraging positive engagement with education.',
        },
        { kind: 'cutout', photo: PHOTOS.teenGroup },
        {
          kind: 'card',
          tone: 'orange',
          align: 'center',
          eyebrow: 'Activities',
          title: 'Learning Through Experience',
          body: 'Learning opportunities may include libraries, museums, outdoor education, volunteering, local businesses, community projects and practical life skills activities that support personal growth and educational development.',
        },
      ],
      closing: {
        title: 'Education Should Inspire Curiosity.',
        body: "Let's explore whether Community Learning is the right pathway for your learner.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'online-learning',
    iconName: 'Laptop',
    eyebrow: 'Remote Delivery',
    title: 'Online Learning',
    description: 'Structured, interactive teaching for learners who benefit from learning remotely.',
    points: ['Live teaching', 'Personalised resources', 'Regular progress reviews'],
    linkLabel: 'Explore online learning',
    page: {
      hero: {
        badge: 'Online Learning',
        title: 'Learning That Fits Around Individual Needs.',
        // The design repeats the Community Learning intro here; stand-in copy until real copy is supplied.
        intro:
          'Online Learning gives young people access to structured, interactive teaching wherever they learn best. Every programme is personalised, with live sessions and resources linked to individual learning goals.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        { kind: 'cutout', photo: PHOTOS.teensWalking },
        {
          kind: 'card',
          tone: 'outline',
          align: 'center',
          eyebrow: 'Features',
          title: 'Personalised Online Education',
          body: 'Live teaching, individual learning plans, flexible scheduling, personalised resources, regular progress reviews and ongoing communication help learners remain connected to education wherever they are.',
        },
        {
          kind: 'text',
          align: 'center',
          eyebrow: 'Suitable For',
          title: 'Who Benefits From Online Learning?',
          // The design repeats the Community Learning activities copy here; stand-in copy.
          body: 'Online Learning can support learners with anxiety, medical needs, EBSNA or disrupted education, as well as those who are not yet ready to return to a classroom setting.',
        },
      ],
      closing: {
        title: 'Accessible Education Wherever Learning Happens.',
        body: 'Speak with our team to explore flexible online education pathways.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
  {
    slug: 'hybrid-learning',
    iconName: 'Shuffle',
    eyebrow: 'Flexible Delivery',
    title: 'Hybrid Learning',
    description:
      'A blend of face-to-face & online education that can change as a learner progresses.',
    points: ['Adaptable timetable', 'Consistent learning', 'Gradual changes in participation'],
    linkLabel: 'Explore hybrid learning',
    page: {
      hero: {
        badge: 'Hybrid Learning',
        title: 'The Best Of Face-To-Face & Online Learning',
        intro:
          "Hybrid Learning combines face-to-face education with online teaching to create flexible programmes that evolve alongside each learner's confidence, engagement and educational progress.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'pink',
          align: 'center',
          eyebrow: 'Suitable For',
          title: 'Flexible Learning Designed Around Progress',
          body: 'Hybrid Learning offers the flexibility to gradually increase participation in education while maintaining consistency and reducing barriers that may affect attendance or engagement.',
        },
        {
          kind: 'split',
          divider: true,
          left: {
            type: 'copy',
            eyebrow: 'Benefits',
            title: 'Supporting Sustainable Progress',
            body: 'By combining different learning environments, Hybrid Learning provides greater flexibility, increased engagement, smoother transitions and education that can adapt as the learner develops confidence.',
          },
          right: {
            type: 'copy',
            eyebrow: 'Delivery',
            title: 'A Programme That Evolves',
            body: 'As learners progress, their programme can be adjusted to include more face-to-face learning, greater independence or additional support depending on their changing needs and agreed outcomes.',
          },
        },
        { kind: 'photo', photo: PHOTOS.emptyClassroom, fullBleed: true },
      ],
      closing: {
        title: 'Every Learner Deserves The Opportunity To Thrive',
        body: "Let's create an education pathway designed around the learner's strengths and goals.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'reintegration-programmes',
    iconName: 'RotateCcw',
    eyebrow: 'Returning To Education',
    title: 'Reintegration Programmes',
    description: "A planned, gradual return to education built around each learner's readiness.",
    points: ['Confidence building', 'Stepped participation', 'Collaboration with schools & families'],
    linkLabel: 'Explore reintegration',
    page: {
      hero: {
        badge: 'Reintegration Programmes',
        title: 'Supporting Successful Returns To Education',
        intro:
          'Returning to school should be a carefully planned journey rather than a single event. Our Reintegration Programmes help learners rebuild confidence and prepare for successful, sustainable transitions back into education.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        { kind: 'cutout', photo: PHOTOS.girlPeeking, size: 'md' },
        {
          kind: 'card',
          tone: 'pink',
          align: 'center',
          eyebrow: 'Process',
          title: 'Our Reintegration Framework',
          body: 'We prepare the learner, build confidence through positive educational experiences, gradually increase participation and continue providing support after transition to maximise long-term success.',
        },
        {
          kind: 'card',
          tone: 'orange',
          align: 'center',
          eyebrow: 'Partnership',
          title: 'Working Together Around The Learner',
          body: 'Successful reintegration depends on strong collaboration between schools, families, Local Authorities and professionals. We maintain regular communication to ensure everyone is working towards the same goals.',
        },
      ],
      closing: {
        title: 'Successful Reintegration Starts With Good Planning',
        body: "Let's create a personalised reintegration pathway that supports lasting educational success.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'transition-support',
    iconName: 'Send',
    eyebrow: 'Preparing For Change',
    title: 'Transition Support',
    description: 'Practical support to help learners prepare for a new setting or stage of life.',
    points: [
      'School and college transitions',
      'Confidence and independence',
      'Planning with those around the learner',
    ],
    linkLabel: 'Explore transition support',
    page: {
      hero: {
        badge: 'Transition Support',
        title: "Preparing Learners For What's Next",
        intro:
          'Educational transitions can be exciting, challenging and sometimes overwhelming. Our Transition Support programmes help learners move confidently between educational settings and future opportunities.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'cyan',
          align: 'center',
          eyebrow: "What's It All About",
          title: 'Supporting Every Educational Transition',
          body: 'We support transitions between primary and secondary school, school and college, Alternative Provision and mainstream education, as well as preparation for adulthood and employment.',
        },
        {
          kind: 'text',
          align: 'center',
          eyebrow: 'Focus',
          title: 'Building Confidence For The Future',
          body: 'Our programmes focus on preparation, communication, independence, confidence and collaborative planning to ensure learners feel ready for the next stage of their journey.',
        },
        { kind: 'photo', photo: PHOTOS.classroomGirl },
      ],
      closing: {
        title: 'Every Successful Transition Begins With Preparation',
        body: "Let's work together to prepare the learner for a positive and successful future.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'eotas',
    iconName: 'Lightbulb',
    eyebrow: 'Education Outside School',
    title: 'EOTAS',
    description:
      'Personalised education for learners whose needs are best met outside a school setting.',
    points: ['Collaborative planning', 'Flexible learning options', 'Focus on agreed outcomes'],
    linkLabel: 'Explore EOTAS',
    page: {
      hero: {
        badge: 'Education Other Than School',
        title: 'Individual Programmes Designed Around Need',
        intro:
          'Every EOTAS pathway is built collaboratively with families, professionals and commissioning organisations to provide education that is meaningful, flexible and learner centred.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'text',
          align: 'center',
          ink: true,
          eyebrow: 'Delivery',
          title: 'Flexible Education Pathways',
          body: "Delivery may include one-to-one education, Community Learning, Online Learning, Hybrid Learning and specialist educational activities depending on the learner's needs and agreed programme.",
        },
        {
          kind: 'card',
          tone: 'orange',
          align: 'center',
          eyebrow: 'Focus',
          title: 'Building Confidence For The Future',
          // The design repeats the Transition Support "Focus" block here; stand-in copy.
          body: "Our EOTAS programmes focus on engagement, confidence, independence and progress towards agreed outcomes, with regular reviews so everyone involved can follow the learner's journey.",
        },
      ],
      closing: {
        title: "Let's Build The Right Education Pathway Together",
        body: 'Speak with our team about personalised EOTAS provision for your learner.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
  {
    slug: '52-week-provision',
    iconName: 'CalendarCheck',
    // The design has this eyebrow and SEND Support's swapped; corrected here.
    eyebrow: 'Year-Round Continuity',
    title: '52-Week Provision',
    description: 'Ongoing education & support for learners who benefit from annual consistency.',
    points: ['Trusted relationships', 'Steady routines', 'Continued educational progress'],
    linkLabel: 'Explore 52-week provision',
    page: {
      hero: {
        badge: '52 Week Provision',
        title: 'Consistency Throughout The Year',
        intro:
          'Some learners benefit from consistent education and support throughout the year. Our 52 Week Provision provides continuity that helps maintain confidence, routine and meaningful educational progress.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'cyan',
          align: 'center',
          eyebrow: 'Introduction',
          title: 'Supporting Continuous Progress',
          body: 'Year-round education helps reduce disruption and allows learners to continue developing positive educational habits while maintaining trusted relationships and structured support.',
        },
        {
          kind: 'text',
          align: 'center',
          eyebrow: 'Benefits',
          title: 'Why Continuity Matters',
          body: 'Consistent provision supports routine, engagement, confidence, independence, educational progress and smoother transitions by providing ongoing personalised education where appropriate.',
        },
        { kind: 'photo', photo: PHOTOS.studentsTablet },
      ],
      closing: {
        title: "Let's Discuss The Right Level Of Support",
        body: "We'll help determine whether year-round education is the most appropriate pathway for your learner.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'send-support',
    iconName: 'UserRound',
    eyebrow: 'Understanding Individual Needs',
    title: 'SEND Support',
    description: 'Education that begins by understanding how each learner experiences learning.',
    points: ['Individual approach', 'Adapted teaching and delivery', 'Goals shaped around the learner'],
    linkLabel: 'Explore SEND support',
    page: {
      hero: {
        badge: 'Special Educational Needs and Disabilities',
        title: 'Supporting Every Learner To Thrive.',
        // The design repeats the Alternative Provision intro here; stand-in copy.
        intro:
          'Our SEND provision is built around how each learner communicates, engages and learns best, with specialist input and personalised planning that help every young person make meaningful progress.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'pink',
          align: 'right',
          eyebrow: 'Who We Support',
          title: 'Education That Starts With Understanding',
          body: 'We take time to understand how each learner communicates, engages and learns best. This helps us create a supportive learning experience that builds confidence and encourages progress.',
          cutout: { photo: PHOTOS.teenBoyPlaid, side: 'left' },
        },
        {
          kind: 'split',
          left: {
            type: 'copy',
            eyebrow: 'Suitable For',
            title: 'Who We Support',
            body: 'Our SEND provision may support learners with autism, ADHD, learning disabilities, communication needs, sensory differences, physical disabilities, medical needs or other barriers affecting their access to education.',
          },
          right: {
            type: 'copy',
            eyebrow: 'Programme',
            title: "What's Included",
            body: "Every programme may include an individual learning plan, tailored teaching methods, flexible delivery, specialist input, regular progress reviews and close collaboration with families, schools and professionals. Support is adapted as the learner's needs and goals develop.",
          },
        },
        {
          kind: 'card',
          tone: 'cyan',
          align: 'center',
          eyebrow: 'Approach',
          title: 'Support Beyond Academic Progress',
          body: 'Progress means more than completing a curriculum. We also help learners develop confidence, communication, independence, emotional regulation and the skills they need for their next stage of education and life.',
        },
      ],
      closing: {
        title: 'Every Learner Deserves The Opportunity To Thrive',
        body: "Let's create an education pathway that recognises the learner's strengths, responds to their needs and supports meaningful progress.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },

  // Not in the design's services carousel, but linked from the Home services circle.
  // No design frames exist for these two pages; copy needs sign-off.
  {
    slug: 'semh-support',
    listed: false,
    iconName: 'HeartHandshake',
    eyebrow: 'Relationship Based',
    title: 'SEMH Support',
    description: 'Nurturing provision for learners with social, emotional and mental health needs.',
    points: ['Trauma-informed practice', 'Consistent, trusted relationships', 'Emotional regulation support'],
    linkLabel: 'Explore SEMH support',
    page: {
      hero: {
        badge: 'Social, Emotional and Mental Health',
        title: 'Support That Starts With Feeling Safe',
        intro:
          'Learners with social, emotional and mental health needs learn best when they feel safe, understood and supported by people they trust. Our SEMH provision builds that foundation first, so learning can follow.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'pink',
          corner: 'tl',
          eyebrow: 'Our Approach',
          title: 'Trusted Relationships, Consistent Support',
          body: 'Trauma-informed practice, a consistent key adult and a calm, predictable routine help learners build confidence, manage their emotions and re-engage with education at a pace that works for them.',
          cutout: { photo: PHOTOS.teenCelebrating, side: 'right' },
        },
        {
          kind: 'text',
          accent: true,
          eyebrow: 'Suitable For',
          title: 'Who Can Benefit?',
          body: 'SEMH support may help learners experiencing anxiety, low mood, emotional dysregulation, trauma, attachment difficulties or behaviour that has made a traditional school setting hard to sustain.',
        },
        {
          kind: 'card',
          tone: 'cyan',
          corner: 'tl',
          eyebrow: 'Outcomes',
          title: 'Building Skills For The Future',
          body: 'Alongside learning, programmes focus on emotional regulation, communication, relationships and independence, with regular reviews shared with families, schools and professionals.',
        },
      ],
      closing: {
        title: 'Every Learner Deserves To Feel Understood',
        body: "Tell us about the learner and we'll help you find the right way forward.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
  {
    slug: 'ebsna-support',
    listed: false,
    iconName: 'ShieldCheck',
    eyebrow: 'Gradual Re-engagement',
    title: 'EBSNA Support',
    description: 'Supportive, low-pressure re-engagement for learners experiencing school avoidance.',
    points: ['Gradual, learner-led reintroduction', 'Anxiety-informed approach', 'Close family communication'],
    linkLabel: 'Explore EBSNA support',
    page: {
      hero: {
        badge: 'Emotionally Based School Non-Attendance',
        title: 'A Gentle Way Back Into Learning',
        intro:
          'When anxiety makes school feel impossible, pressure rarely helps. Our EBSNA support offers a calm, gradual route back into education, shaped around what the learner feels able to do.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'pink',
          align: 'right',
          eyebrow: 'Our Approach',
          title: 'Small Steps, At The Right Pace',
          body: 'We start where the learner is, often at home or online, and build confidence through short, positive sessions before gradually increasing time, subjects and settings.',
          cutout: { photo: PHOTOS.teenBoyPlaid, side: 'left' },
        },
        {
          kind: 'split',
          left: {
            type: 'copy',
            eyebrow: 'Suitable For',
            title: 'Who Can Benefit?',
            body: 'EBSNA support may help learners whose attendance has fallen because of anxiety, low mood, sensory overwhelm, social difficulties or a difficult experience at school.',
          },
          right: {
            type: 'copy',
            eyebrow: 'Partnership',
            title: 'Working With Families',
            body: 'Families are involved at every step. We keep communication clear and regular, and work with schools and professionals so everyone understands the plan and the progress being made.',
          },
        },
        { kind: 'photo', photo: PHOTOS.girlOnlineLesson },
      ],
      closing: {
        title: 'Every Step Forward Counts',
        body: "Let's talk about a gentle, personalised pathway back into education.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
];

export function getServiceOffering(slug: string): ServiceOffering | undefined {
  return SERVICE_OFFERINGS.find((service) => service.slug === slug);
}
