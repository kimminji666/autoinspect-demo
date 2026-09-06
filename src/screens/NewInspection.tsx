import { useState, type FC } from 'react';
import { PART_TYPES } from '../data/mockData';
import PartImagePlaceholder from '../components/common/PartImagePlaceholder';

type Props = {
  defaultPartType: string;
  defaultBatchNumber: string;
  defaultInspectorName: string;
  onStartAnalysis: (input: {
    partType: string;
    batchNumber: string;
    inspectorName: string;
    memo: string;
  }) => void;
};

const NewInspection: FC<Props> = ({
  defaultPartType,
  defaultBatchNumber,
  defaultInspectorName,
  onStartAnalysis,
}) => {
  const [partType, setPartType] = useState(defaultPartType);
  const [batchNumber, setBatchNumber] = useState(defaultBatchNumber);
  const [inspectorName, setInspectorName] = useState(defaultInspectorName);
  const [memo, setMemo] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUseDemoImage = () => {
    setImageUploaded(true);
  };

  const handleStartAnalysis = () => {
    if (!imageUploaded || analyzing) return;
    setAnalyzing(true);
    window.setTimeout(() => {
      onStartAnalysis({ partType, batchNumber, inspectorName, memo });
    }, 1500);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-ink mb-6">새 검사 등록</h1>

      <div className="bg-white rounded-card border border-gray-200 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              부품 종류
            </label>
            <select
              value={partType}
              onChange={(e) => setPartType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
            >
              {PART_TYPES.map((part) => (
                <option key={part} value={part}>
                  {part}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              생산 배치 번호
            </label>
            <input
              type="text"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-1.5">
              검사자 이름
            </label>
            <input
              type="text"
              value={inspectorName}
              onChange={(e) => setInspectorName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            검사 이미지
          </label>
          {imageUploaded ? (
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-full sm:w-56">
                <PartImagePlaceholder variant="original" label={partType} />
              </div>
              <div className="flex-1 text-sm text-muted">
                <p className="text-ink font-medium mb-1">
                  데모 이미지가 업로드되었습니다.
                </p>
                <p>{partType}_inspection_photo.jpg</p>
                <button
                  onClick={() => setImageUploaded(false)}
                  className="mt-3 text-brand text-sm font-medium hover:underline"
                >
                  이미지 다시 선택
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                setImageUploaded(true);
              }}
              className={`rounded-card border-2 border-dashed px-6 py-10 text-center transition-colors ${
                isDragging ? 'border-brand bg-blue-50/40' : 'border-gray-300 bg-surface-alt'
              }`}
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                className="mx-auto mb-3 text-muted"
              >
                <path
                  d="M12 16V4M12 4L7 9M12 4L17 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 16V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V16"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-sm text-ink font-medium">
                이미지를 이곳에 끌어다 놓으세요
              </p>
              <p className="text-xs text-muted mt-1">
                또는 아래 버튼으로 데모 이미지를 사용할 수 있습니다
              </p>
              <button
                onClick={handleUseDemoImage}
                className="mt-4 inline-flex items-center rounded-lg border border-brand text-brand px-4 py-2 text-sm font-semibold hover:bg-blue-50"
              >
                데모 이미지 사용
              </button>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            작업자 메모
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="특이사항이 있으면 입력하세요"
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-ink resize-none focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand"
          />
        </div>

        <div className="pt-2 border-t border-gray-100">
          <button
            onClick={handleStartAnalysis}
            disabled={!imageUploaded || analyzing}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-colors
              ${
                imageUploaded && !analyzing
                  ? 'bg-brand text-white hover:bg-brand-dark'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            {analyzing && (
              <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            )}
            {analyzing ? 'AI가 부품 이미지를 분석하고 있습니다...' : 'AI 분석 시작'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewInspection;
