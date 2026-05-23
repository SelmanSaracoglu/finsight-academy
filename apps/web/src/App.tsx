import { useState } from "react";
import { sessionScenes } from "@finsight-academy/shared";
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

  const nextSceneId = currentSceneData.nextSceneId;

return (
  <main className="app-shell">
    <section className="welcome-scene">
      <p className="eyebrow">{currentSceneData.eyebrow}</p>

      <h1>{currentSceneData.title}</h1>

      <p className="intro">{currentSceneData.body}</p>

      <div className="notice">{currentSceneData.notice}</div>

      {nextSceneId ? (
        <button
          type="button"
          className="primary-action"
          onClick={() => setCurrentScene(nextSceneId)}
        >
          {currentSceneData.primaryActionLabel}
        </button>
      ) : null}
    </section>
  </main>
);
}

export default App;