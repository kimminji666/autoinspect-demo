import type { FC } from 'react';

type Props = {
  message: string;
  visible: boolean;
};

const Toast: FC<Props> = ({ message, visible }) => {
  if (!visible) return null;
  return (
    <div className="fixed top-5 right-5 z-50 animate-toast-in">
      <div className="flex items-center gap-2 rounded-card bg-ink text-white px-4 py-3 shadow-lg">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="10" fill="#16A34A" />
          <path
            d="M6 10.5L8.5 13L14 7"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
