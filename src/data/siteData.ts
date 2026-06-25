import {
  BedDouble,
  Building2,
  CheckCircle,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  Home,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

export type Property = {
  id: number;
  title: string;
  area: string;
  city: string;
  postcode: string;
  status: string;
  type: string;
  rooms: string;
  suitable: string;
  supportLevel: string;
  accessibility: string;
};

export const nav = ['About', 'Services', 'Process', 'Properties', 'Referrals', 'Landlords', 'Contact'];

export const properties: Property[] = [
  {
    id: 1,
    title: '34 Milsom Street',
    area: 'Easton',
    city: 'Bristol',
    postcode: 'BS5 0SS',
    status: 'Available',
    type: 'Supported accommodation',
    rooms: 'Rooms available',
    suitable: 'Adults with housing-related support needs',
    supportLevel: 'Medium support',
    accessibility: 'Assessment required'
  }
];

export const services = [
  [Home, 'Supported Accommodation', 'Safe, managed accommodation for adults with housing support needs.'],
  [HeartHandshake, 'Housing-Related Support', 'Tenancy sustainment, routines, appointments, wellbeing and independence.'],
  [ShieldCheck, 'Safeguarding & Risk', 'Risk-aware support planning, safeguarding referrals and multi-agency working.'],
  [Building2, 'Property Management', 'Professional landlord communication, inspections and property oversight.'],
  [Users, 'Who We Support', 'Homeless adults, care leavers, mental health, ex-offenders, recovery and domestic abuse.'],
  [CheckCircle, 'Move-On Planning', 'Helping people develop skills and progress towards independent living.'],
  [BedDouble, 'Tenancy Sustainment', 'Practical support to help residents maintain accommodation and routines.'],
  [ClipboardCheck, 'Assessment & Matching', 'Clear referral review to match people with suitable accommodation.'],
  [KeyRound, 'Landlord Partnerships', 'Long-term, responsible partnerships with landlords and property owners.']
] as const;

export const process = [
  ['1', 'Referral received', 'Councils, professionals, landlords or self-referrals submit details.'],
  ['2', 'Assessment', 'We review support needs, risks, suitability and accommodation requirements.'],
  ['3', 'Property matching', 'We identify available accommodation or discuss upcoming options.'],
  ['4', 'Move-in planning', 'Support plans, safety checks and practical arrangements are agreed.'],
  ['5', 'Ongoing support', 'Residents receive structured housing-related support and reviews.'],
  ['6', 'Move-on outcomes', 'The goal is stability, independence and better long-term outcomes.']
];

export const whoWeSupport = [
  [Home, 'Homeless Adults', 'Safe accommodation and housing-related support for people experiencing homelessness.'],
  [HeartHandshake, 'Mental Health', 'Supportive housing pathways for people with mental health support needs.'],
  [GraduationCap, 'Care Leavers', 'Practical support to build confidence, routines and independence.'],
  [ShieldCheck, 'Domestic Abuse', 'Safe, respectful support with safeguarding and multi-agency working.'],
  [RotateCcw, 'Substance Misuse Recovery', 'Stable accommodation that supports recovery, structure and positive routines.'],
  [Users, 'Ex-Offenders', 'Risk-aware accommodation support focused on stability and move-on outcomes.'],
  [ClipboardCheck, 'Complex Needs', 'Coordinated support for people with multiple or overlapping needs.'],
  [Sparkles, 'Move-on Support', 'Helping people progress towards independent living and long-term stability.']
] as const;

export const impact = [
  ['People Supported', 'Growing Every Month'],
  ['Local Authority Referrals', 'Accepted'],
  ['Landlord Partnerships', 'Expanding'],
  ['Safeguarding', 'At the Heart of Everything We Do']
];

export const trustPartners = ['Local Authorities', 'Housing Providers', 'NHS & Health Partners', 'Landlords', 'Community Organisations'];

export const heroSlides = [
  {
    src: '/hero-house-front.png',
    title: 'Modern supported accommodation',
    text: 'Safe, well-presented homes for people who need housing-related support.'
  },
  {
    src: '/hero-support-kitchen.png',
    title: 'Practical daily support',
    text: 'Person-centred support that helps people build confidence and routines.'
  },
  {
    src: '/hero-support-meeting.png',
    title: 'Support planning and move-on',
    text: 'Warm, professional conversations focused on stability and independence.'
  }
];
