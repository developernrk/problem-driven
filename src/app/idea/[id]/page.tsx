import { notFound } from 'next/navigation';
import IdeaDetailView from '@/components/idea/IdeaDetailView';
import connectDB from '@/lib/database';
import Idea from '@/models/Idea';

interface IdeaPageProps {
  params: {
    id: string;
  };
}

async function getIdea(id: string) {
  try {
    await connectDB();
    const idea = await Idea.findById(id);
    
    if (!idea) {
      return null;
    }

    return JSON.parse(JSON.stringify(idea));
  } catch (error) {
    console.error('Error fetching idea:', error);
    
return null;
  }
}

export default async function IdeaPage({ params }: IdeaPageProps) {
  const idea = await getIdea(params.id);

  if (!idea) {
    notFound();
  }

  return <IdeaDetailView idea={idea} />;
}

export async function generateMetadata({ params }: IdeaPageProps) {
  const idea = await getIdea(params.id);

  if (!idea) {
    return {
      title: 'Idea Not Found',
    };
  }

  return {
    title: `${idea.title} | Innovation Hub`,
    description: idea.shortDescription,
    openGraph: {
      title: idea.title,
      description: idea.shortDescription,
      type: 'article',
    },
  };
}