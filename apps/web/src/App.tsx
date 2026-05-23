import { useState } from "react";
import { sessionScenes } from "@finsight-academy/shared";
import { SessionSceneView } from './components/SessionSceneView';
import type { SceneId } from '@finsight-academy/shared';


function App() {

  const [currentScene, setCurrentScene ] = useState<SceneId>('welcome');

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
      <SessionSceneView
        scene={currentSceneData}
        onNavigate={setCurrentScene}
      />
    </main>
  );
}

export default App;