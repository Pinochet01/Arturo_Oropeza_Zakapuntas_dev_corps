type IconProps = { className?: string; color?: string; size?: number };

function Hexagon({ className, color = '#00FFFF', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" stroke={color} strokeWidth="1.5" fill="none" />
      <polygon points="12,5 17.5,8 17.5,14 12,17 6.5,14 6.5,8" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  );
}

function Lightning({ className, color = '#FF00FF', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="13,2 4,14 11,14 10,22 20,10 13,10" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    </svg>
  );
}

function Layers({ className, color = '#BF00FF', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="16" height="12" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="5" y="7" width="16" height="12" rx="1" stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      <rect x="7" y="9" width="16" height="12" rx="1" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
    </svg>
  );
}

function Play({ className, color = '#00FF9F', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none" />
      <polygon points="10,8 16,12 10,16" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1" />
    </svg>
  );
}

function Diamond({ className, color = '#00FFFF', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <polygon points="12,2 22,12 12,22 2,12" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
      <polygon points="12,6 18,12 12,18 6,12" stroke={color} strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  );
}

function Command({ className, color = '#FF00FF', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="5" y="5" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="14" y="5" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="5" y="14" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="14" y="14" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="7.5" y1="10" x2="7.5" y2="14" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="16.5" y1="10" x2="16.5" y2="14" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="10" y1="7.5" x2="14" y2="7.5" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="10" y1="16.5" x2="14" y2="16.5" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function Grid({ className, color = '#BF00FF', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="6" r="2" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="18" cy="6" r="2" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="6" cy="18" r="2" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="18" cy="18" r="2" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.2" fill="none" />
      <line x1="8" y1="6" x2="16" y2="6" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="6" y1="8" x2="6" y2="16" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="8" x2="18" y2="16" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="8" y1="18" x2="16" y2="18" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function Target({ className, color = '#00FF9F', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="0.8" />
      <line x1="12" y1="2" x2="12" y2="6" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="18" x2="12" y2="22" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="2" y1="12" x2="6" y2="12" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function Circuit({ className, color = '#00FFFF', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="5" cy="5" r="2" stroke={color} strokeWidth="1.2" fill="none" />
      <circle cx="19" cy="19" r="2" stroke={color} strokeWidth="1.2" fill="none" />
      <polyline points="5,7 5,12 10,12 10,19" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <polyline points="19,17 19,12 14,12 14,5" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="5" cy="19" r="1.5" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="19" cy="5" r="1.5" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  );
}

export const Icons = { Hexagon, Lightning, Layers, Play, Diamond, Command, Grid, Target, Circuit };
export type { IconProps };