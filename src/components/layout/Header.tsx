import type { FC } from 'react';

type Props = {
  onMenuClick: () => void;
};

const Header: FC<Props> = ({ onMenuClick }) => {
  return (
    <header className="h-16 shrink-0 border-b border-gray-200 bg-white flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden -ml-1 p-2 rounded-lg text-ink hover:bg-surface-alt"
          aria-label="메뉴 열기"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        <span className="hidden md:inline text-sm font-semibold text-ink tracking-wide">
          AUTOINSPECT
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="h-8 w-8 rounded-full bg-blue-100 text-brand flex items-center justify-center text-sm font-semibold">
          김
        </div>
        <span className="text-sm text-ink">
          품질관리자 <span className="text-muted mx-1">·</span> 김민지
        </span>
      </div>
    </header>
  );
};

export default Header;
