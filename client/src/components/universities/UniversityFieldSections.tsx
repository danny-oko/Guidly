import type { SheetUniversityRecord } from '../../lib/types/sheet-university.types';
import type { UniversityFieldGroup } from '../../lib/utils/university-field-groups';
import { getGroupedFieldRows } from '../../lib/utils/university-field-display';

interface UniversityFieldSectionsProps {
  university: SheetUniversityRecord;
  groups: UniversityFieldGroup[];
  emptyMessage?: string;
  compact?: boolean;
}

export default function UniversityFieldSections({
  university,
  groups,
  emptyMessage = 'No data available for this section.',
  compact = false,
}: UniversityFieldSectionsProps) {
  const sections = getGroupedFieldRows(university, groups);

  if (sections.length === 0) {
    return compact ? null : <p className="intelly-empty">{emptyMessage}</p>;
  }

  return (
    <div
      className={[
        'intelly-field-sections',
        compact ? 'intelly-field-sections--compact' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {sections.map(({ group, rows }) => (
        <section className="intelly-field-section" key={group.id}>
          <h3 className="intelly-field-section__title">{group.label}</h3>
          <dl
            className={[
              'intelly-info-card__grid intelly-info-card__grid--plain',
              compact ? 'intelly-info-card__grid--overview' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {rows.map((row) => (
              <div className="intelly-info-card__field" key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
