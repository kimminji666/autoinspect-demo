import type { FC } from 'react';

type Props = {
  variant: 'original' | 'heatmap';
  label: string;
};

// 외부 이미지 URL 없이, CSS 그라데이션 + 인라인 SVG로 금속 부품처럼 보이는
// 플레이스홀더와 AI 주목 영역(히트맵)을 표현한다.
const PartImagePlaceholder: FC<Props> = ({ variant, label }) => {
  return (
    <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden border border-gray-200">
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="metalBase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9CA3AF" />
            <stop offset="45%" stopColor="#D1D5DB" />
            <stop offset="55%" stopColor="#E5E7EB" />
            <stop offset="100%" stopColor="#6B7280" />
          </linearGradient>
          <radialGradient id="heatSpotMain" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#EA580C" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heatSpotSecondary" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#EA580C" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="300" fill="url(#metalBase)" />

        {/* 부품 형태를 암시하는 격자 패턴 (라디에이터 그릴 느낌) */}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={i}
            x={40 + i * 44}
            y={40}
            width="24"
            height="220"
            rx="6"
            fill="#F3F4F6"
            opacity="0.35"
          />
        ))}
        <rect x="20" y="20" width="360" height="260" rx="14" fill="none" stroke="#4B5563" strokeWidth="3" opacity="0.4" />

        {variant === 'heatmap' && (
          <>
            <ellipse cx="255" cy="120" rx="70" ry="55" fill="url(#heatSpotMain)" />
            <ellipse cx="150" cy="200" rx="45" ry="35" fill="url(#heatSpotSecondary)" />
          </>
        )}
      </svg>

      <span className="absolute bottom-2.5 left-2.5 rounded-md bg-black/55 px-2 py-1 text-[11px] font-medium text-white">
        {label}
      </span>
    </div>
  );
};

export default PartImagePlaceholder;
