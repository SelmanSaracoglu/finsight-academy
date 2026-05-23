import { useState } from "react";
import type { SceneId } from '@finsight-academy/shared';


function App() {

  const [currentScene, setCurrentScene ] = useState<SceneId>('welcome');

  return (
    <main className="app-shell">
      {currentScene === 'welcome' && (
        <section className="welcome-scene">
          <p className="eyebrow">FinSight Academy</p>
          <h1>Learn to think through market decisions calmly.</h1>

          <p className="intro">
            Enter a fictional market session where you will review a short
            briefing, make one focused decision, and reflect on the reasoning
            behind it.
          </p>
          <div className="notice">
            <strong>Safe learning space:</strong> All assets, prices, and market
            events are fictional. This is not investment advice.
          </div>
          <button
            type="button"
            className="primary-action"
            onClick={() => setCurrentScene('market-briefing')}
          >
            Begin Session
          </button>
        </section>
      )}

      {currentScene === 'market-briefing' && (
        <section className="welcome-scene">
          <p className="eyebrow">Market Briefing</p>

          <h1>A quiet shift in the fictional energy sector.</h1>

          <p className="intro">
            In today's simulated session, renewable infrastructure companies
            are seeing cautious interest after a fictional city announced a
            long-term grid modernization plan.
          </p>

          <div className="notice">
            The market reaction is uncertain. Some investors may see opportunity,
            while others may worry that expectations are already too high.
          </div>

          <button
            type="button"
            className="primary-action"
            onClick={() => setCurrentScene('welcome')}
          >
            Back to Welcome
          </button>
        </section>
      )}
    </main>
  );
}

export default App;