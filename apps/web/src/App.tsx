import { useState } from "react";
import { sessionScenes } from "@finsight-academy/shared";
import { SessionSceneView } from './components/SessionSceneView';
import { DecisionOptions  } from "./components/DecisionOptions";

import type { SceneId } from '@finsight-academy/shared';
import type { DecisionChoice } from './components/DecisionOptions';


function App() {

  const [currentScene, setCurrentScene ] = useState<SceneId>('welcome');
  const [selectedDecision, setSelectedDecision] =
  useState<DecisionChoice | null>(null);

  const currentSceneData = sessionScenes.find(
    (scene) => scene.id === currentScene,
  );

  if(!currentSceneData) {
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

return (
    <main className="app-shell">
      <SessionSceneView scene={currentSceneData} onNavigate={setCurrentScene} />

      {currentScene === 'decision' ? (
        <DecisionOptions
          selectedChoice={selectedDecision}
          onSelectChoice={setSelectedDecision}
        />
      ) : null}
    </main>
  );
}

export default App;