import { ExternalLink } from 'lucide-react';

interface UniversityWebsiteLinkProps {
  website?: string;
  className?: string;
}

export default function UniversityWebsiteLink({
  website,
  className = 'intelly-website-btn',
}: UniversityWebsiteLinkProps) {
  if (!website) return null;

  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Visit website
      <ExternalLink size={14} strokeWidth={2.2} aria-hidden />
    </a>
  );
}
