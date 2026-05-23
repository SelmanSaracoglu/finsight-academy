function App() {
  return (
    <main className="app-shell">
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

        <button type="button" className="primary-action">
          Begin Session
        </button>
      </section>
    </main>
  );
}

export default App;