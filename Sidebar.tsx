import type { FC } from 'react';
import type { Screen } from '../../types/inspection';

type MenuItem = {
  key: Screen;
  label: string;
  icon: JSX.Element;
};

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 20 20',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const MENU_ITEMS: MenuItem[] = [
  {
    key: 'dashboard',
    label: '대시보드',
    icon: (
      <svg {...iconProps}>
        <rect x="2.5" y="2.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11.5" y="2.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2.5" y="11.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11.5" y="11.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    key: 'new-inspection',
    label: '새 검사',
    icon: (
      <svg {...iconProps}>
        <path d="M10 4V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 10H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'history',
    label: '검사 이력',
    icon: (
      <svg {...iconProps}>
        <path d="M10 5V10L13 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    key: 'stats',
    label: '통계 분석',
    icon: (
      <svg {...iconProps}>
        <path d="M3.5 16.5V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9.5 16.5V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M15.5 16.5V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

type Props = {
  current: Screen;
  onNavigate: (screen: Screen) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

const Sidebar: FC<Props> = ({ current, onNavigate, mobileOpen, onCloseMobile }) => {
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="메뉴 닫기"
          onClick={onCloseMobile}
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
        />
      )}
      <aside
        className={`fixed z-40 md:static top-0 left-0 h-full w-60 shrink-0 border-r border-gray-200 bg-white flex flex-col transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="h-16 flex items-center px-5 border-b border-gray-100">
          <span className="text-lg font-bold tracking-tight text-ink">
            AUTO<span className="text-brand">INSPECT</span>
          </span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {MENU_ITEMS.map((item) => {
            const active = current === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  onCloseMobile();
                }}
                aria-current={active ? 'page' : undefined}
                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                  ${
                    active
                      ? 'bg-blue-50 text-brand'
                      : 'text-muted hover:bg-surface-alt hover:text-ink'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-5 py-4 border-t border-gray-100 text-xs text-muted">
          데모 버전 · 실제 데이터 아님
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
