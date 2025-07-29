import { ngoQueries } from './database';

const sampleNGOs = [
  {
    name: "Green Earth Foundation",
    address: "123 Eco Street, Downtown, City Name 12345",
    phone: "+1 (555) 123-4567",
    email: "contact@greenearth.org",
    website: "https://greenearth.org",
    category: "Environment",
    description: "Dedicated to environmental conservation and sustainable development. We focus on tree plantation, waste management, and renewable energy projects.",
    rating: 4.5,
    reviewCount: 127,
    isActive: true
  },
  {
    name: "Hope Children's Center",
    address: "456 Care Avenue, Westside, City Name 12346",
    phone: "+1 (555) 234-5678",
    email: "info@hopechildren.org",
    website: "https://hopechildren.org",
    category: "Education",
    description: "Providing quality education and care for underprivileged children. We run schools, tutoring programs, and skill development workshops.",
    rating: 4.8,
    reviewCount: 203,
    isActive: true
  },
  {
    name: "Community Health Partners",
    address: "789 Wellness Road, Northside, City Name 12347",
    phone: "+1 (555) 345-6789",
    email: "help@communityhealthpartners.org",
    website: "https://communityhealthpartners.org",
    category: "Health",
    description: "Delivering essential healthcare services to underserved communities. We provide free medical camps, health education, and emergency care.",
    rating: 4.6,
    reviewCount: 89,
    isActive: true
  },
  {
    name: "Elderly Care Society",
    address: "321 Senior Street, Eastside, City Name 12348",
    phone: "+1 (555) 456-7890",
    email: "support@elderlycare.org",
    website: "https://elderlycare.org",
    category: "Social Services",
    description: "Supporting elderly citizens with healthcare, social activities, and daily assistance. We operate senior centers and home care services.",
    rating: 4.3,
    reviewCount: 156,
    isActive: true
  },
  {
    name: "Skills Development Institute",
    address: "654 Training Plaza, Central District, City Name 12349",
    phone: "+1 (555) 567-8901",
    email: "programs@skillsdev.org",
    website: "https://skillsdev.org",
    category: "Education",
    description: "Empowering youth and adults with vocational training and skill development programs. We offer courses in technology, trades, and entrepreneurship.",
    rating: 4.4,
    reviewCount: 98,
    isActive: true
  },
  {
    name: "Animal Welfare League",
    address: "987 Pet Protection Way, Southside, City Name 12350",
    phone: "+1 (555) 678-9012",
    email: "rescue@animalwelfare.org",
    website: "https://animalwelfare.org",
    category: "Animal Welfare",
    description: "Rescuing, rehabilitating, and rehoming animals in need. We also run awareness campaigns about animal rights and responsible pet ownership.",
    rating: 4.7,
    reviewCount: 234,
    isActive: true
  },
  {
    name: "Women Empowerment Center",
    address: "147 Empowerment Street, Women's District, City Name 12351",
    phone: "+1 (555) 789-0123",
    email: "empower@womencenter.org",
    website: "https://womencenter.org",
    category: "Social Services",
    description: "Supporting women through education, skill development, and advocacy. We provide shelter, legal aid, and economic empowerment programs.",
    rating: 4.9,
    reviewCount: 178,
    isActive: true
  },
  {
    name: "Clean Water Initiative",
    address: "258 Water Works Lane, Industrial Area, City Name 12352",
    phone: "+1 (555) 890-1234",
    email: "water@cleanwater.org",
    website: "https://cleanwater.org",
    category: "Environment",
    description: "Ensuring access to clean drinking water for all communities. We install water purification systems and educate about water conservation.",
    rating: 4.2,
    reviewCount: 67,
    isActive: true
  },
  {
    name: "Mental Health Support Network",
    address: "369 Wellness Center, Healthcare District, City Name 12353",
    phone: "+1 (555) 901-2345",
    email: "support@mentalhealth.org",
    website: "https://mentalhealth.org",
    category: "Health",
    description: "Providing mental health support, counseling, and awareness programs. We offer therapy sessions, support groups, and crisis intervention.",
    rating: 4.8,
    reviewCount: 145,
    isActive: true
  },
  {
    name: "Food Bank Alliance",
    address: "741 Hunger Relief Road, Community Center, City Name 12354",
    phone: "+1 (555) 012-3456",
    email: "donate@foodbank.org",
    website: "https://foodbank.org",
    category: "Social Services",
    description: "Fighting hunger by collecting and distributing food to those in need. We run soup kitchens, food pantries, and nutrition education programs.",
    rating: 4.5,
    reviewCount: 312,
    isActive: true
  }
];

export function seedDatabase() {
  try {
    // Check if data already exists
    const existingNGOs = ngoQueries.getAll.all();
    if (existingNGOs.length > 0) {
      console.log('Database already seeded');
      return;
    }

    // Insert sample data
    for (const ngo of sampleNGOs) {
      ngoQueries.create.run(
        ngo.name,
        ngo.address,
        ngo.phone,
        ngo.email,
        ngo.website,
        ngo.category,
        ngo.description,
        ngo.rating,
        ngo.reviewCount
      );
    }

    console.log('Database seeded successfully with', sampleNGOs.length, 'NGOs');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}