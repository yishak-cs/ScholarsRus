import { NextResponse } from 'next/server';
import { generateDocument } from '@/lib/ai';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.type || !body.scholarshipInfo || !body.userProfile) {
      return NextResponse.json(
        { error: 'Missing required fields: type, scholarshipInfo, or userProfile' },
        { status: 400 }
      );
    }

    // Validate document type
    const validTypes = ['essay', 'resume', 'cover_letter', 'personal_statement'];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid document type. Must be one of: essay, resume, cover_letter, personal_statement' },
        { status: 400 }
      );
    }

    // Generate the document using AI
    const generatedContent = await generateDocument(body);

    // In a real app, you might want to save this to your database
    // const aiGeneration = await prisma.aIGeneration.create({
    //   data: {
    //     userId: session.user.id, // Get from auth session
    //     type: body.type.toUpperCase(),
    //     prompt: JSON.stringify(body),
    //     content: generatedContent,
    //     model: 'gpt-4o-mini'
    //   }
    // });

    return NextResponse.json({
      content: generatedContent,
      type: body.type,
      scholarshipTitle: body.scholarshipInfo.title,
      generatedAt: new Date().toISOString(),
      message: 'Document generated successfully'
    });

  } catch (error) {
    console.error('AI Generation Error:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'AI service configuration error. Please check API keys.' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'AI service rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate document. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve previous AI generations
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const userId = searchParams.get('userId'); // In real app, get from auth session

  try {
    // Mock data - in real app, fetch from database
    const mockGenerations = [
      {
        id: '1',
        type: 'ESSAY',
        content: 'Generated essay content...',
        scholarshipTitle: 'Tech Innovators Scholarship',
        createdAt: '2024-01-15T10:00:00Z',
        rating: 5
      },
      {
        id: '2',
        type: 'RESUME',
        content: 'Generated resume content...',
        scholarshipTitle: 'Future Leaders Grant',
        createdAt: '2024-01-14T15:30:00Z',
        rating: 4
      }
    ];

    let filteredGenerations = mockGenerations;

    if (type) {
      filteredGenerations = filteredGenerations.filter(g => 
        g.type.toLowerCase() === type.toLowerCase()
      );
    }

    return NextResponse.json({
      generations: filteredGenerations,
      total: filteredGenerations.length
    });

  } catch (error) {
    console.error('Error fetching AI generations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI generations' },
      { status: 500 }
    );
  }
} 