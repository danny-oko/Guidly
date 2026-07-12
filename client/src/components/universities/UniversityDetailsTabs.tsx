'use client';

import { useState } from 'react';

import type { SheetUniversityRecord } from '../../lib/types/sheet-university.types';
import {
  ADMISSIONS_GROUPS,
  CAMPUS_GROUPS,
  DEADLINE_GROUPS,
  FINANCIAL_GROUPS,
  METRIC_FIELD_CONFIG,
  OVERVIEW_GROUPS,
  RANKING_GROUPS,
} from '../../lib/utils/university-field-groups';
import {
  getHighlightBadges,
  getFieldRowsByKeys,
} from '../../lib/utils/university-field-display';
import {
  displayValue,
  getField,
  parseNumericField,
} from '../../lib/utils/sheet-university-mapper';
import UniversityFieldSections from './UniversityFieldSections';
import UniversityWebsiteLink from './UniversityWebsiteLink';

type DetailTab =
  | 'overview'
  | 'admissions'
  | 'financial-aid'
  | 'deadlines'
  | 'rankings'
  | 'campus';

const DETAIL_TABS: { id: DetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'financial-aid', label: 'Financial' },
  { id: 'deadlines', label: 'Deadlines' },
  { id: 'rankings', label: 'Rankings' },
  { id: 'campus', label: 'Campus' },
];

interface UniversityDetailsTabsProps {
  university: SheetUniversityRecord;
}

export default function UniversityDetailsTabs({
  university,
}: UniversityDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  const primaryFocus = getField(university, ['primaryfocus']);
  const notes = getField(university, ['notes']);
  const control = getField(university, ['control']);
  const aidPolicy = getField(university, ['typesofaidforinternationalstudents']);
  const setting = getField(university, ['setting']);
  const howToApply = getField(university, ['howtoapply']);
  const rdDeadline = getField(university, ['rddeadline']);
  const edDeadline = getField(university, ['edapplicationdeadline']);
  const scholarship = getField(university, ['nameandinfooflargestmeritscholarship']);
  const intlRate = getField(university, ['internationaladmissionrate']);
  const eaDeadline = getField(university, ['eaapplicationdeadline']);
  const testingReq = getField(university, ['testingreq']);
  const earlyPlans = getField(university, ['earlyplanoffered']);
  const scholarshipAmount = getField(university, [
    'amountoflargestmeritscholarship',
  ]);
  const meetFullNeed = getField(university, ['meetsfulldemonstratedneed']);
  const intlAidPct = getField(university, [
    'percentageofinternationalstudentswhoreceiveaid',
  ]);
  const rdNotification = getField(university, ['rdnotificationdate']);

  const tags = [setting, aidPolicy].filter(Boolean);
  const badges = getHighlightBadges(university);

  const metrics = METRIC_FIELD_CONFIG.map((config) => {
    const raw = getField(university, [...config.keys]);
    const value = parseNumericField(raw);
    if (value === null) return null;

    let max = 'max' in config ? config.max : 100;
    if ('maxKey' in config && config.maxKey) {
      const maxRaw = parseNumericField(getField(university, [...config.maxKey]));
      if (maxRaw !== null) max = maxRaw;
    }

    let status: 'ok' | 'warn' | 'attention' = 'ok';
    let statusLabel = 'Normal';
    if ('attentionBelow' in config && value < config.attentionBelow) {
      status = 'attention';
      statusLabel = 'Competitive';
    } else if ('competitiveAbove' in config && value >= config.competitiveAbove) {
      status = 'warn';
      statusLabel = 'High bar';
    }

    let range = 'range' in config ? config.range : '';
    if ('rangeKey' in config && config.rangeKey && config.rangeFormat) {
      const rangeVal = parseNumericField(getField(university, [...config.rangeKey]));
      if (rangeVal !== null) range = config.rangeFormat(rangeVal);
    }

    return {
      label: config.label,
      value: config.format(value),
      status,
      statusLabel,
      percent: Math.min(100, Math.round((value / max) * 100)),
      range,
    };
  }).filter(Boolean) as {
    label: string;
    value: string;
    status: 'ok' | 'warn' | 'attention';
    statusLabel: string;
    percent: number;
    range: string;
  }[];

  const quickStats = getFieldRowsByKeys(university, [
    'internationaladmissionrate',
    'rdacceptancerate',
    'testingreq',
    'earlyplanoffered',
    'yieldapprox',
    'meetsfulldemonstratedneed',
    'percentageofinternationalstudentswhoreceiveaid',
    'tuitionandfeeswithoutaid',
  ]);

  const recordFields = [
    { label: 'How to apply', value: howToApply },
    { label: 'RD deadline', value: rdDeadline },
    { label: 'ED deadline', value: edDeadline },
    { label: 'EA deadline', value: eaDeadline },
    { label: 'RD notification', value: rdNotification },
    { label: 'Intl admission', value: intlRate },
    { label: 'Testing', value: testingReq },
    { label: 'Early plans', value: earlyPlans },
    { label: 'Top scholarship', value: scholarship },
    { label: 'Scholarship amount', value: scholarshipAmount },
    { label: 'Intl students on aid', value: intlAidPct },
    { label: 'Meet full need', value: meetFullNeed },
    { label: 'Aid policy', value: aidPolicy },
  ].filter((field) => field.value && displayValue(field.value) !== 'N/A');

  return (
    <section className="intelly-detail__right">
      <header className="intelly-visit-header intelly-visit-header--compact">
        <div className="intelly-visit-header__copy">
          {primaryFocus && (
            <p className="intelly-visit-header__subtitle">{primaryFocus}</p>
          )}
          {badges.length > 0 && (
            <div className="intelly-highlight-badges">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`intelly-highlight-badges__item intelly-highlight-badges__item--${badge.tone}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="intelly-visit-header__actions">
          <UniversityWebsiteLink website={university.website} />
          {control && (
            <span className="intelly-visit-header__status">{control}</span>
          )}
        </div>
      </header>

      <nav className="intelly-main-tabs intelly-main-tabs--compact" aria-label="University sections">
        {DETAIL_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={[
              'intelly-main-tabs__tab',
              activeTab === tab.id ? 'intelly-main-tabs__tab--active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="intelly-panel">
        {activeTab === 'overview' && (
          <>
            {(notes || tags.length > 0) && (
              <article className="intelly-summary intelly-summary--compact">
                {tags.length > 0 && (
                  <div className="intelly-summary__tags">
                    {tags.map((tag) => (
                      <span className="intelly-summary__tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {notes && <p className="intelly-summary__text">{notes}</p>}
              </article>
            )}

            {metrics.length > 0 && (
              <div className="intelly-metrics intelly-metrics--compact">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>
            )}

            {quickStats.length > 0 && (
              <dl className="intelly-quick-stats intelly-quick-stats--inline">
                {quickStats.map((row) => (
                  <div className="intelly-quick-stats__item" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {recordFields.length > 0 && (
              <article className="intelly-lab-card intelly-lab-card--compact">
                <div className="intelly-lab-card__body">
                  <h3 className="intelly-lab-card__title">Application record</h3>
                  <dl className="intelly-lab-card__grid intelly-lab-card__grid--dense">
                    {recordFields.map((field) => (
                      <LabField
                        key={field.label}
                        label={field.label}
                        value={displayValue(field.value)}
                      />
                    ))}
                  </dl>
                </div>
              </article>
            )}

            <div className="intelly-overview-block">
              <UniversityFieldSections
                university={university}
                groups={OVERVIEW_GROUPS}
                compact
              />
            </div>
          </>
        )}

        {activeTab === 'admissions' && (
          <div className="intelly-detail-rows intelly-detail-rows--compact">
            <UniversityFieldSections
              university={university}
              groups={ADMISSIONS_GROUPS}
            />
          </div>
        )}

        {activeTab === 'financial-aid' && (
          <div className="intelly-detail-rows intelly-detail-rows--compact">
            <UniversityFieldSections
              university={university}
              groups={FINANCIAL_GROUPS}
            />
          </div>
        )}

        {activeTab === 'deadlines' && (
          <div className="intelly-detail-rows intelly-detail-rows--compact">
            <UniversityFieldSections
              university={university}
              groups={DEADLINE_GROUPS}
            />
          </div>
        )}

        {activeTab === 'rankings' && (
          <div className="intelly-detail-rows intelly-detail-rows--compact">
            <UniversityFieldSections
              university={university}
              groups={RANKING_GROUPS}
            />
          </div>
        )}

        {activeTab === 'campus' && (
          <div className="intelly-detail-rows intelly-detail-rows--compact">
            <UniversityFieldSections
              university={university}
              groups={CAMPUS_GROUPS}
              emptyMessage="No campus or safety data available."
            />
          </div>
        )}
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  status,
  statusLabel,
  percent,
  range,
}: {
  label: string;
  value: string;
  status: 'ok' | 'warn' | 'attention';
  statusLabel: string;
  percent: number;
  range: string;
}) {
  return (
    <article className="intelly-metric intelly-metric--compact">
      <div className="intelly-metric__head">
        <span className="intelly-metric__label">{label}</span>
        <span className={`intelly-metric__status intelly-metric__status--${status}`}>
          {statusLabel}
        </span>
      </div>
      <p className="intelly-metric__value">{value}</p>
      {range && <p className="intelly-metric__range">{range}</p>}
      <div className="intelly-metric__bar" aria-hidden>
        <span style={{ width: `${percent}%` }} />
      </div>
    </article>
  );
}

function LabField({ label, value }: { label: string; value: string }) {
  return (
    <div className="intelly-lab-card__field">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
