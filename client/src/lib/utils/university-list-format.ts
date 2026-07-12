export function getUniversityInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function formatQsBadge(value: string | number): string {
  if (value === null || value === undefined || value === '') return 'QS N/A';

  if (typeof value === 'number') {
    return Number.isNaN(value) ? 'QS N/A' : `QS #${value}`;
  }

  const numeric = value.replace(/[^0-9]/g, '');
  if (numeric) return `QS #${numeric}`;

  return `QS ${value}`;
}

export function formatAcceptanceRate(value: string | number): string {
  if (value === null || value === undefined || value === '') return 'N/A';

  if (typeof value === 'number') {
    if (Number.isNaN(value)) return 'N/A';
    const formatted = Number.isInteger(value) ? String(value) : value.toFixed(1);
    return `${formatted}%`;
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === 'N/A') return 'N/A';
  if (trimmed.includes('%')) return trimmed;

  const numeric = Number(trimmed.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(numeric)) return trimmed;

  const rate = numeric <= 1 ? numeric * 100 : numeric;
  const formatted = Number.isInteger(rate) ? String(rate) : rate.toFixed(1);

  return `${formatted}%`;
}
