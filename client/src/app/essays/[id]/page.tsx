import CollabEditor from '@/components/collaboration/CollabEditor';

interface EssayDocumentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EssayDocumentPage({
  params,
}: EssayDocumentPageProps) {
  const { id } = await params;

  return (
    <div className="h-full min-h-0">
      <CollabEditor documentId={id} />
    </div>
  );
}
