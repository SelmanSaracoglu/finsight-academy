import { useState } from 'react';
import {
  getDecisionReflection,
  getLessonSummary,
  getMarketReaction,
  sessionScenes,
} from '@finsight-academy/shared';
import { SessionSceneView } from './components/SessionSceneView';
import { DecisionOptions } from './components/DecisionOptions';

import type { DecisionChoice, SceneId } from '@finsight-academy/shared';

function App() {
  const [currentScene, setCurrentScene] = useState<SceneId>('welcome');
  const [selectedDecision, setSelectedDecision] =
    useState<DecisionChoice | null>(null);

  const currentSceneData = sessionScenes.find(
    (scene) => scene.id === currentScene,
  );

  if (!currentSceneData) {
    return (
      <main className="app-shell">
        <section className="welcome-scene">
          <p className="eyebrow">Session unavailable</p>
          <h1>We could not find this learning scene.</h1>
          <p className="intro">
            This is a safe fallback for an invalid session state.
          </p>
        </section>
      </main>
    );
  }

  const isDecisionScene = currentScene === 'decision';
  const isPrimaryActionDisabled = isDecisionScene && !selectedDecision;

  function handleNavigate(sceneId: SceneId) {
    if (sceneId === 'welcome') {
      setSelectedDecision(null);
    }
    setCurrentScene(sceneId);
  }

  return (
    <main className="app-shell">
      <SessionSceneView
        scene={currentSceneData}
        onNavigate={handleNavigate}
        isPrimaryActionDisabled={isPrimaryActionDisabled}
        disabledActionHint="Choose one response before continuing to reflection."
      />

      {isDecisionScene ? (
        <DecisionOptions
          selectedChoice={selectedDecision}
          onSelectChoice={setSelectedDecision}
        />
      ) : null}

      {currentScene === 'reflection' ? (
        <section className="reflection-card">
          <p className="reflection-label">Your selected response</p>
          <p className="reflection-text">
            {getDecisionReflection(selectedDecision)}
          </p>
        </section>
      ) : null}

      {currentScene === 'market-reaction' ? (
        <section className="reflection-card">
          <p className="reflection-label">Fictional market response</p>
          <p className="reflection-text">
            {getMarketReaction(selectedDecision)}
          </p>
        </section>
      ) : null}

      {currentScene === 'lesson-summary' ? (
        <section className="reflection-card">
          <p className="reflection-label">Your learning takeaway</p>
          <p className="reflection-text">
            {getLessonSummary(selectedDecision)}
          </p>
        </section>
      ) : null}
    </main>
  );
}

export default App;