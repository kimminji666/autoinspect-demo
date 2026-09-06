import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Toast from './components/common/Toast';
import Dashboard from './screens/Dashboard';
import NewInspection from './screens/NewInspection';
import InspectionResult from './screens/InspectionResult';
import InspectionHistory from './screens/InspectionHistory';
import Statistics from './screens/Statistics';
import type { Inspection, Screen } from './types/inspection';
import {
  DEFAULT_BATCH_NUMBER,
  DEFAULT_INSPECTOR_NAME,
  DEFAULT_PART_TYPE,
  DEMO_AI_RESULT,
  INITIAL_HISTORY,
  TODAY_ID_DATE,
  generateNextInspectionId,
} from './data/mockData';

export type DraftInspection = {
  id: string;
  partType: string;
  batchNumber: string;
  inspectorName: string;
  memo: string;
  confidence: number;
  defectType: string;
  guideMessage: string;
};

function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [history, setHistory] = useState<Inspection[]>(INITIAL_HISTORY);
  const [draft, setDraft] = useState<DraftInspection | null>(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    window.setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2500);
  };

  const navigate = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0 });
  };

  const handleStartAnalysis = (input: {
    partType: string;
    batchNumber: string;
    inspectorName: string;
    memo: string;
  }) => {
    const isDefaultScenario =
      input.partType === DEFAULT_PART_TYPE &&
      input.batchNumber === DEFAULT_BATCH_NUMBER;

    const newDraft: DraftInspection = {
      id: isDefaultScenario
        ? 'INS-20260906-0142'
        : generateNextInspectionId(TODAY_ID_DATE),
      partType: input.partType,
      batchNumber: input.batchNumber,
      inspectorName: input.inspectorName,
      memo: input.memo,
      confidence: DEMO_AI_RESULT.confidence,
      defectType: DEMO_AI_RESULT.defectType,
      guideMessage: DEMO_AI_RESULT.guideMessage,
    };
    setDraft(newDraft);
    navigate('result');
  };

  const handleSaveDecision = (inspection: Inspection) => {
    setHistory((prev) => [inspection, ...prev]);
    showToast('검사 결과가 저장되었습니다.');
    setDraft(null);
    navigate('history');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <Dashboard onStartNewInspection={() => navigate('new-inspection')} />;
      case 'new-inspection':
        return (
          <NewInspection
            defaultPartType={DEFAULT_PART_TYPE}
            defaultBatchNumber={DEFAULT_BATCH_NUMBER}
            defaultInspectorName={DEFAULT_INSPECTOR_NAME}
            onStartAnalysis={handleStartAnalysis}
          />
        );
      case 'result':
        return draft ? (
          <InspectionResult draft={draft} onSave={handleSaveDecision} />
        ) : (
          <Dashboard onStartNewInspection={() => navigate('new-inspection')} />
        );
      case 'history':
        return <InspectionHistory history={history} />;
      case 'stats':
        return <Statistics />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-surface-alt">
      <Sidebar
        current={screen}
        onNavigate={navigate}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />
      <div className="flex flex-1 flex-col min-w-0">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-6xl">{renderScreen()}</div>
        </main>
      </div>
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}

export default App;
