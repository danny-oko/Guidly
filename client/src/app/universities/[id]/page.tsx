import { notFound } from 'next/navigation';

import UniversityDetailsPage from '../../../components/universities/UniversityDetailsPage';
import { getSheetUniversityByRouteId } from '../../../lib/services/sheet-university.service';

interface UniversityDetailsRouteProps {
  params: Promise<{ id: string }>;
}

export default async function UniversityDetailsRoute({
  params,
}: UniversityDetailsRouteProps) {
  const { id } = await params;
  const university = await getSheetUniversityByRouteId(id);

  if (!university) {
    notFound();
  }

  return <UniversityDetailsPage university={university} />;
}
