import { NextResponse } from 'next/server';
import { calculateMatchScore } from '@/lib/utils';

// Mock scholarship data - In real app, this would come from your scraping service
const mockScholarships = [
  {
    id: 1,
    title: "Tech Innovators Scholarship",
    description: "Supporting the next generation of technology innovators and entrepreneurs who will shape the future of digital transformation.",
    amount: 25000,
    maxAmount: 25000,
    numberOfAwards: 5,
    organizationName: "Future Tech Foundation",
    organizationUrl: "https://futuretechfoundation.org",
    applicationUrl: "https://futuretechfoundation.org/apply",
    applicationDeadline: "2024-03-15T23:59:59Z",
    notificationDate: "2024-04-15T23:59:59Z",
    categories: ["Technology", "Innovation", "STEM"],
    tags: ["computer-science", "engineering", "entrepreneurship"],
    isActive: true,
    isVerified: true,
    eligibilityCriteria: {
      minGpa: 3.5,
      requiredMajors: ["Computer Science", "Software Engineering", "Information Technology"],
      degreeLevel: ["BACHELOR", "MASTER"],
      schoolTypes: ["UNIVERSITY", "FOUR_YEAR_COLLEGE"]
    },
    requirements: [
      { type: "ESSAY", title: "Innovation Essay", description: "500-word essay on how you plan to innovate in tech", wordLimit: 500 },
      { type: "TRANSCRIPT", title: "Official Transcript", description: "Official academic transcript" },
      { type: "RECOMMENDATION_LETTER", title: "Academic Reference", description: "Letter from professor or academic advisor" }
    ]
  },
  {
    id: 2,
    title: "Future Leaders Grant",
    description: "Empowering students who demonstrate exceptional leadership potential and commitment to positive social impact.",
    amount: 15000,
    maxAmount: 15000,
    numberOfAwards: 10,
    organizationName: "Leadership Institute",
    organizationUrl: "https://leadershipinstitute.org",
    applicationUrl: "https://leadershipinstitute.org/apply",
    applicationDeadline: "2024-04-01T23:59:59Z",
    notificationDate: "2024-05-01T23:59:59Z",
    categories: ["Leadership", "Community Service", "Social Impact"],
    tags: ["leadership", "community-service", "social-impact"],
    isActive: true,
    isVerified: true,
    eligibilityCriteria: {
      minGpa: 3.0,
      requiredMajors: [], // Open to all majors
      degreeLevel: ["BACHELOR"],
      schoolTypes: ["UNIVERSITY", "FOUR_YEAR_COLLEGE", "COMMUNITY_COLLEGE"]
    },
    requirements: [
      { type: "ESSAY", title: "Leadership Essay", description: "Describe your leadership experience and future goals", wordLimit: 750 },
      { type: "RESUME", title: "Leadership Resume", description: "Resume highlighting leadership roles and community service" },
      { type: "RECOMMENDATION_LETTER", title: "Character Reference", description: "Letter from someone who can speak to your leadership qualities" }
    ]
  },
  {
    id: 3,
    title: "Green Energy Research Fund",
    description: "Supporting groundbreaking research in renewable energy technologies and sustainable environmental solutions.",
    amount: 30000,
    maxAmount: 30000,
    numberOfAwards: 3,
    organizationName: "Environmental Science Association",
    organizationUrl: "https://enviroscience.org",
    applicationUrl: "https://enviroscience.org/research-grants",
    applicationDeadline: "2024-02-28T23:59:59Z",
    notificationDate: "2024-03-30T23:59:59Z",
    categories: ["Environmental Science", "Research", "Sustainability"],
    tags: ["environmental-science", "research", "renewable-energy", "sustainability"],
    isActive: true,
    isVerified: true,
    eligibilityCriteria: {
      minGpa: 3.7,
      requiredMajors: ["Environmental Science", "Environmental Engineering", "Renewable Energy", "Sustainability Studies"],
      degreeLevel: ["BACHELOR", "MASTER", "DOCTORATE"],
      schoolTypes: ["UNIVERSITY", "GRADUATE_SCHOOL"]
    },
    requirements: [
      { type: "RESEARCH_PROPOSAL", title: "Research Proposal", description: "Detailed research proposal (5-10 pages)", wordLimit: 3000 },
      { type: "TRANSCRIPT", title: "Academic Transcript", description: "Official transcript showing relevant coursework" },
      { type: "RECOMMENDATION_LETTER", title: "Faculty Advisor Letter", description: "Letter from research advisor or faculty mentor" },
      { type: "PORTFOLIO", title: "Research Portfolio", description: "Portfolio of previous research work or publications" }
    ]
  },
  {
    id: 4,
    title: "Women in STEM Excellence Award",
    description: "Celebrating and supporting exceptional women pursuing careers in Science, Technology, Engineering, and Mathematics.",
    amount: 20000,
    maxAmount: 20000,
    numberOfAwards: 8,
    organizationName: "Women in STEM Foundation",
    organizationUrl: "https://womeninstem.org",
    applicationUrl: "https://womeninstem.org/excellence-award",
    applicationDeadline: "2024-05-15T23:59:59Z",
    notificationDate: "2024-06-15T23:59:59Z",
    categories: ["STEM", "Women", "Diversity"],
    tags: ["women-in-stem", "diversity", "stem-education"],
    isActive: true,
    isVerified: true,
    eligibilityCriteria: {
      minGpa: 3.3,
      requiredMajors: ["Computer Science", "Engineering", "Mathematics", "Physics", "Chemistry", "Biology"],
      degreeLevel: ["BACHELOR", "MASTER"],
      schoolTypes: ["UNIVERSITY", "FOUR_YEAR_COLLEGE"],
      genderRequirement: ["FEMALE"]
    },
    requirements: [
      { type: "PERSONAL_STATEMENT", title: "Personal Statement", description: "Your journey and goals in STEM", wordLimit: 800 },
      { type: "TRANSCRIPT", title: "Academic Transcript", description: "Official transcript" },
      { type: "RECOMMENDATION_LETTER", title: "STEM Mentor Reference", description: "Letter from STEM professor or professional mentor" }
    ]
  },
  {
    id: 5,
    title: "First-Generation College Student Grant",
    description: "Supporting first-generation college students in achieving their educational and career goals.",
    amount: 12000,
    maxAmount: 12000,
    numberOfAwards: 15,
    organizationName: "First Generation Foundation",
    organizationUrl: "https://firstgenfoundation.org",
    applicationUrl: "https://firstgenfoundation.org/student-grant",
    applicationDeadline: "2024-06-30T23:59:59Z",
    notificationDate: "2024-07-30T23:59:59Z",
    categories: ["First Generation", "Education Access", "Diversity"],
    tags: ["first-generation", "education-access", "financial-need"],
    isActive: true,
    isVerified: true,
    eligibilityCriteria: {
      minGpa: 2.8,
      requiredMajors: [], // Open to all majors
      degreeLevel: ["BACHELOR"],
      schoolTypes: ["UNIVERSITY", "FOUR_YEAR_COLLEGE", "COMMUNITY_COLLEGE"],
      incomeRequirement: ["UNDER_25K", "RANGE_25K_50K"]
    },
    requirements: [
      { type: "ESSAY", title: "First-Gen Essay", description: "Your experience as a first-generation college student", wordLimit: 600 },
      { type: "FINANCIAL_STATEMENT", title: "Financial Need Statement", description: "Documentation of financial need" },
      { type: "RECOMMENDATION_LETTER", title: "Academic Reference", description: "Letter from teacher, counselor, or advisor" }
    ]
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const minAmount = searchParams.get('minAmount');
  const maxAmount = searchParams.get('maxAmount');
  const search = searchParams.get('search');
  const userProfile = searchParams.get('userProfile'); // In real app, get from auth session

  try {
    let filteredScholarships = mockScholarships;

    // Apply filters
    if (category) {
      filteredScholarships = filteredScholarships.filter(s => 
        s.categories.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
      );
    }

    if (minAmount) {
      filteredScholarships = filteredScholarships.filter(s => s.amount >= parseInt(minAmount));
    }

    if (maxAmount) {
      filteredScholarships = filteredScholarships.filter(s => s.amount <= parseInt(maxAmount));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredScholarships = filteredScholarships.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower) ||
        s.organizationName.toLowerCase().includes(searchLower) ||
        s.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Calculate match scores if user profile is provided
    if (userProfile) {
      const profile = JSON.parse(userProfile);
      filteredScholarships = filteredScholarships.map(scholarship => ({
        ...scholarship,
        matchScore: calculateMatchScore(profile, scholarship.eligibilityCriteria)
      }));

      // Sort by match score
      filteredScholarships.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }

    return NextResponse.json({
      scholarships: filteredScholarships,
      total: filteredScholarships.length,
      message: 'Scholarships retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching scholarships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scholarships' },
      { status: 500 }
    );
  }
}

// POST endpoint for creating/updating scholarship data (for scraping service)
export async function POST(request) {
  try {
    const scholarshipData = await request.json();
    
    // In real app, this would save to your database
    // For now, just validate and return success
    
    if (!scholarshipData.title || !scholarshipData.amount || !scholarshipData.applicationDeadline) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Here you would save to your Prisma database:
    // const scholarship = await prisma.scholarship.create({
    //   data: scholarshipData
    // });

    return NextResponse.json({
      message: 'Scholarship data saved successfully',
      id: Date.now() // Mock ID
    });

  } catch (error) {
    console.error('Error saving scholarship:', error);
    return NextResponse.json(
      { error: 'Failed to save scholarship data' },
      { status: 500 }
    );
  }
} 