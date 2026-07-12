'use client';

import { useRouter } from 'next/navigation';

import { University, type UniversityStatus } from '../../lib/types/university.types';
import { getUniversityAccent } from '../../lib/utils/university-accent';
import { universityToListItem } from '../../lib/utils/university-list-mappers';
import UniversityList from '../universities/UniversityList';
import UniversityListItem from '../universities/UniversityListItem';
import UniversityDetailsPanel from './UniversityDetailsPanel';

interface UniversityExplorerProps {
  universities: University[];
  selectedId: number;
  onSelect: (id: number) => void;
  myListIds?: Set<number>;
  onAddToList?: (id: number) => void;
  onChangeStatus?: (id: number, status: UniversityStatus) => void;
}

export default function UniversityExplorer({
  universities,
  selectedId,
  onSelect,
  myListIds,
  onAddToList,
  onChangeStatus,
}: UniversityExplorerProps) {
  const router = useRouter();
  const selectedIndex = universities.findIndex((uni) => uni.id === selectedId);
  const selectedUniversity =
    universities.find((uni) => uni.id === selectedId) ?? universities[0];
  const selectedAccent =
    selectedIndex >= 0
      ? getUniversityAccent(selectedIndex)
      : getUniversityAccent(0);

  if (!selectedUniversity) {
    return (
      <section className="uni-explorer uni-explorer--empty">
        <p className="uni-explorer__empty-message">
          No universities match the selected status filter.
        </p>
      </section>
    );
  }

  return (
    <section className="uni-explorer">
      <header className="uni-explorer__head">
        <div className="uni-explorer__head-list">
          <h2 className="uni-explorer__panel-title">University list</h2>
          <span className="uni-explorer__panel-count">
            {universities.length}
          </span>
        </div>
        <h2 className="uni-explorer__panel-title uni-explorer__panel-title--details">
          University details
        </h2>
      </header>

      <div className="uni-explorer__body">
        <div className="uni-explorer__list">
          <UniversityList>
            {universities.map((university) => (
              <UniversityListItem
                key={university.id}
                university={universityToListItem(university)}
                isSelected={university.id === selectedId}
                isInMyList={myListIds?.has(university.id)}
                onSelect={(id) => router.push(`/universities/${id}`)}
                onOpenDetails={(id) => router.push(`/universities/${id}`)}
                onAddToList={
                  onAddToList ? (id) => onAddToList(Number(id)) : undefined
                }
                onChangeStatus={
                  onChangeStatus
                    ? (id, status) => onChangeStatus(Number(id), status)
                    : undefined
                }
              />
            ))}
          </UniversityList>
        </div>

        <div className="uni-explorer__details">
          <UniversityDetailsPanel
            university={selectedUniversity}
            accent={selectedAccent}
          />
        </div>
      </div>
    </section>
  );
}
