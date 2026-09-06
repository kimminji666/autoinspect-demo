import type { FC } from 'react';

export type BadgeTone = 'ok' | 'defect' | 'recheck' | 'neutral';

const TONE_STYLES: Record<BadgeTone, string> = {
  ok: 'bg-green-50 text-ok border border-green-200',
  defect: 'bg-red-50 text-defect border border-red-200',
  recheck: 'bg-orange-50 text-recheck border border-orange-200',
  neutral: 'bg-gray-100 text-muted border border-gray-200',
};

type Props = {
  label: string;
  tone: BadgeTone;
  size?: 'sm' | 'md';
};

const StatusBadge: FC<Props> = ({ label, tone, size = 'sm' }) => {
  const sizeClass =
    size === 'md' ? 'text-sm px-3 py-1.5' : 'text-xs px-2.5 py-1';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap ${sizeClass} ${TONE_STYLES[tone]}`}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          tone === 'ok'
            ? 'bg-ok'
            : tone === 'defect'
              ? 'bg-defect'
              : tone === 'recheck'
                ? 'bg-recheck'
                : 'bg-muted'
        }`}
      />
      {label}
    </span>
  );
};

export default StatusBadge;
