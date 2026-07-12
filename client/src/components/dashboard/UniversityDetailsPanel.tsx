import { University } from '../../lib/types/university.types';
import { UniversityAccent } from '../../lib/utils/university-accent';

function formatDeadline(date: string | null): string {
  if (!date) return 'N/A';
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface UniversityDetailsPanelProps {
  university: University;
  accent: UniversityAccent;
}

export default function UniversityDetailsPanel({
  university,
  accent,
}: UniversityDetailsPanelProps) {
  return (
    <article className={`uni-details uni-details--${accent}`}>
      <header className="uni-details__header">
        <div className="uni-details__header-copy">
          <h3 className="uni-details__title">{university.name}</h3>
          <p className="uni-details__location">
            {university.city}, {university.state} · {university.country}
          </p>
        </div>
        <span className="uni-details__rank">QS #{university.qs_rank}</span>
      </header>

      <div className="uni-details__tags">
        <span className="uni-details__tag">{university.control}</span>
        <span className="uni-details__tag">{university.best_field}</span>
        <span className="uni-details__tag">{university.aid_international}</span>
      </div>

      <dl className="uni-details__rows">
        <div className="uni-details__row">
          <dt>Acceptance rate</dt>
          <dd>{university.acceptance_rate}%</dd>
        </div>
        <div className="uni-details__row">
          <dt>Avg SAT</dt>
          <dd>{university.average_sat_score}</dd>
        </div>
        <div className="uni-details__row">
          <dt>Total cost</dt>
          <dd>{university.coa}</dd>
        </div>
        <div className="uni-details__row">
          <dt>Cost after aid</dt>
          <dd>${university.cost_after_aid.toLocaleString()}</dd>
        </div>
        <div className="uni-details__row">
          <dt>RD deadline</dt>
          <dd>{formatDeadline(university.rd_deadline)}</dd>
        </div>
        <div className="uni-details__row">
          <dt>How to apply</dt>
          <dd>{university.how_to_apply}</dd>
        </div>
      </dl>

      <div className="uni-details__section">
        <h4>About</h4>
        <p>{university.description}</p>
      </div>

      {university.max_aid_name && (
        <div className="uni-details__section">
          <h4>Top scholarship</h4>
          <p>
            {university.max_aid_name} — up to $
            {university.max_aid.toLocaleString()}
          </p>
        </div>
      )}

      <div className="uni-details__section">
        <h4>Note</h4>
        <p>{university.note}</p>
      </div>
    </article>
  );
}
