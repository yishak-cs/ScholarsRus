import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export interface GenerateDocumentParams {
  type: 'essay' | 'resume' | 'cover_letter' | 'personal_statement'
  scholarshipInfo: {
    title: string
    description: string
    requirements: string[]
    amount: number
  }
  userProfile: {
    name: string
    major: string
    gpa: number
    achievements: string[]
    activities: string[]
    careerGoals: string
    interests: string[]
  }
  additionalContext?: string
}

export async function generateDocument({
  type,
  scholarshipInfo,
  userProfile,
  additionalContext
}: GenerateDocumentParams): Promise<string> {
  const prompts = {
    essay: `Write a compelling scholarship essay for "${scholarshipInfo.title}" (${scholarshipInfo.amount} award). 
    
    Scholarship Description: ${scholarshipInfo.description}
    Requirements: ${scholarshipInfo.requirements.join(', ')}
    
    Student Profile:
    - Name: ${userProfile.name}
    - Major: ${userProfile.major}
    - GPA: ${userProfile.gpa}
    - Key Achievements: ${userProfile.achievements.join(', ')}
    - Activities: ${userProfile.activities.join(', ')}
    - Career Goals: ${userProfile.careerGoals}
    - Interests: ${userProfile.interests.join(', ')}
    
    Additional Context: ${additionalContext || 'None'}
    
    Write a 500-800 word essay that showcases the student's unique qualities, aligns with the scholarship's mission, and demonstrates why they deserve this award. Make it personal, authentic, and compelling.`,

    resume: `Create a professional resume for scholarship applications targeting "${scholarshipInfo.title}".
    
    Student Profile:
    - Name: ${userProfile.name}
    - Major: ${userProfile.major}
    - GPA: ${userProfile.gpa}
    - Achievements: ${userProfile.achievements.join(', ')}
    - Activities: ${userProfile.activities.join(', ')}
    - Career Goals: ${userProfile.careerGoals}
    
    Format as a clean, ATS-friendly resume optimized for scholarship committees. Include relevant sections: Education, Experience, Achievements, Activities, Skills.`,

    cover_letter: `Write a professional cover letter for the "${scholarshipInfo.title}" scholarship application.
    
    Student: ${userProfile.name}, ${userProfile.major} major
    Target Scholarship: ${scholarshipInfo.title} - $${scholarshipInfo.amount}
    
    Create a compelling cover letter that introduces the student, explains their interest in the scholarship, and highlights their qualifications. Keep it professional yet personal.`,

    personal_statement: `Write a personal statement for "${scholarshipInfo.title}" scholarship.
    
    Student Profile: ${userProfile.name}, studying ${userProfile.major}
    Career Goals: ${userProfile.careerGoals}
    Key Experiences: ${userProfile.activities.join(', ')}
    
    Write a 400-600 word personal statement that tells the student's unique story, demonstrates growth, and connects their experiences to their future goals.`
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert scholarship advisor and professional writer. Create compelling, authentic documents that help students win scholarships."
        },
        {
          role: "user",
          content: prompts[type]
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    return completion.choices[0]?.message?.content || "Error generating document"
  } catch (error) {
    console.error('AI Generation Error:', error)
    throw new Error('Failed to generate document')
  }
}

export async function generateScholarshipMatches(userProfile: any): Promise<any[]> {
  // This would integrate with your scholarship database
  // For now, return a sample structure
  return []
} 