import { ArrowUpRight, GraduationCap } from 'lucide-react';

import type { SheetUniversityRecord } from '../../lib/types/sheet-university.types';
import { PROFILE_SIDEBAR_KEYS, PROGRAM_HIGHLIGHT_KEYS } from '../../lib/utils/university-field-groups';
import { getFieldRowsByKeys } from '../../lib/utils/university-field-display';
import {
  displayValue,
  getField,
  parseNumericField,
} from '../../lib/utils/sheet-university-mapper';
import { getUniversityInitials } from '../../lib/utils/university-list-format';

interface UniversityProfileCardProps {
  university: SheetUniversityRecord;
}

export default function UniversityProfileCard({
  university,
}: UniversityProfileCardProps) {
  const coaYear = getField(university, ['coafromyear']);
  const totalCoa = getField(university, ['totalcostofattendancewithoutaid']);
  const rdDeadline = getField(university, ['rddeadline']);
  const rdAcceptance = getField(university, ['rdacceptancerate']);
  const edAcceptance = getField(university, ['edacceptancerate']);
  const eaAcceptance = getField(university, ['eaacceptancerate']);
  const edDeadline = getField(university, ['edapplicationdeadline']);
  const eaDeadline = getField(university, ['eaapplicationdeadline']);

  const location = [university.city, university.state, university.stateFullName]
    .filter(Boolean)
    .join(', ');

  const refCode = university.id
    .split('-')
    .slice(0, 3)
    .map((part) => part.slice(0, 2).toUpperCase())
    .join('')
    .padEnd(6, 'X')
    .slice(0, 6);

  const profileRows = getFieldRowsByKeys(university, PROFILE_SIDEBAR_KEYS);

  const infoCardHeader = (() => {
    const rd = rdDeadline ? displayValue(rdDeadline) : '';
    if (rd && rd !== 'N/A') return `RD ${rd}`;
    if (coaYear) return `COA ${coaYear}`;
    return null;
  })();

  const programHighlights = PROGRAM_HIGHLIGHT_KEYS.map((program) => {
    const value = getField(university, [...program.keys]);
    if (!value?.trim() || displayValue(value) === 'N/A') return null;
    return { label: program.label, value: displayValue(value) };
  }).filter(Boolean) as { label: string; value: string }[];

  const trackAlerts = [
    { label: 'RD', value: rdAcceptance, deadline: rdDeadline },
    { label: 'ED', value: edAcceptance, deadline: edDeadline },
    { label: 'EA', value: eaAcceptance, deadline: eaDeadline },
  ].filter((track) => track.value || track.deadline);

  const alertCount = trackAlerts.filter((track) => {
    const rate = parseNumericField(track.value);
    return rate !== null && rate < 15;
  }).length;

  const rankings = [
    {
      label: 'US News',
      value: getField(university, ['usnewsnationaluniversities2025']),
      icon: 'blue' as const,
    },
    {
      label: 'QS World',
      value: getField(university, [
        'qsworlduniversitieswithintheunitedstates',
        'qsworlduniversities',
      ]),
      icon: 'pink' as const,
    },
    {
      label: 'THE World',
      value: getField(university, ['timeshighereducation2024worlduniversities']),
      icon: 'green' as const,
    },
    {
      label: 'WSJ',
      value: getField(university, ['wsjbestcollegesrank']),
      icon: 'yellow' as const,
    },
  ].filter((item) => item.value && displayValue(item.value) !== 'N/A');

  return (
    <aside className="intelly-detail__left">
      <div className="intelly-profile intelly-profile--compact">
        <span className="intelly-profile__avatar">
          {getUniversityInitials(university.name)}
        </span>
        <div className="intelly-profile__copy">
          <h1 className="intelly-profile__name">{university.name}</h1>
          <p className="intelly-profile__location">{location}</p>
          <p className="intelly-profile__meta-line">
            <span>{refCode}</span>
            {coaYear ? <span>COA {coaYear}</span> : null}
            {totalCoa ? <span>{displayValue(totalCoa)} total</span> : null}
          </p>
        </div>
      </div>

      {profileRows.length > 0 && (
        <article className="intelly-info-card">
          <header className="intelly-info-card__header">
            <span className="intelly-info-card__ref">{refCode}-UNI</span>
            {infoCardHeader ? (
              <span className="intelly-info-card__date">{infoCardHeader}</span>
            ) : null}
          </header>
          <dl className="intelly-info-card__grid intelly-info-card__grid--sidebar">
            {profileRows.map((row) => (
              <InfoField key={row.label} label={row.label} value={row.value} />
            ))}
          </dl>
        </article>
      )}

      {trackAlerts.length > 0 && (
        <section className="intelly-alerts intelly-alerts--compact">
          <header className="intelly-alerts__head">
            <h2 className="intelly-alerts__title">Application tracks</h2>
            {alertCount > 0 && (
              <span className="intelly-alerts__badge">{alertCount} alerts</span>
            )}
          </header>
          <ul className="intelly-track-list">
            {trackAlerts.map((track) => (
              <AlertItem
                key={track.label}
                name={track.label}
                value={track.value}
                deadline={track.deadline}
              />
            ))}
          </ul>
        </section>
      )}

      {programHighlights.length > 0 && (
        <section className="intelly-program-highlights">
          <h2 className="intelly-program-highlights__title">Program rankings</h2>
          <ul className="intelly-program-highlights__list">
            {programHighlights.map((program) => (
              <li className="intelly-program-highlights__item" key={program.label}>
                <span className="intelly-program-highlights__label">
                  {program.label}
                </span>
                <span className="intelly-program-highlights__value">
                  {program.value}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {rankings.length > 0 && (
        <section className="intelly-history intelly-history--compact">
          <h2 className="intelly-history__title">Top rankings</h2>
          <ul className="intelly-history__list">
            {rankings.map((item) => (
              <li className="intelly-history__item" key={item.label}>
                <span
                  className={`intelly-history__icon intelly-history__icon--${item.icon}`}
                  aria-hidden
                >
                  <GraduationCap size={13} strokeWidth={2.2} />
                </span>
                <div className="intelly-history__body">
                  <span className="intelly-history__name">{item.label}</span>
                  <span className="intelly-history__ref">{item.value}</span>
                </div>
                <ArrowUpRight size={13} strokeWidth={2.2} aria-hidden />
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="intelly-info-card__field">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function AlertItem({
  name,
  value,
  deadline,
}: {
  name: string;
  value?: string;
  deadline?: string;
}) {
  const rate = parseNumericField(value);
  const isAttention = rate !== null && rate < 15;

  return (
    <li
      className={[
        'intelly-track-list__item',
        isAttention ? 'intelly-track-list__item--attention' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="intelly-track-list__label">{name}</span>
      <span className="intelly-track-list__value">
        {value ? `${value}${value.includes('%') ? '' : '%'}` : 'Open'}
        {deadline ? ` · ${deadline}` : ''}
      </span>
    </li>
  );
}
