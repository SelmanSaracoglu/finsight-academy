import { useMemo, useState } from 'react';

import {
  applyAllocationDecision,
  applyMarketEvent,
  calculatePortfolioResult,
  createStarterPortfolio,
  generateCoachingFeedback,
  starterAssets,
  starterMarketEvent,
  type AllocationItem,
  type CoachingFeedback,
  type Portfolio,
  type PortfolioResult,
} from '@finsight-academy/shared';

type GameStatus = 'allocation' | 'result';

type AllocationInputs = Record<string, string>;

function createInitialAllocationInputs(): AllocationInputs {
  return starterAssets.reduce<AllocationInputs>((inputs, asset) => {
    inputs[asset.id] = '';
    return inputs;
  }, {});
}

function formatCredits(value: number): string {
  return `${value.toFixed(2)} credits`;
}

function createAllocationItems(inputs: AllocationInputs): AllocationItem[] {
  return Object.entries(inputs)
    .map(([assetId, value]) => ({
      assetId,
      amount: Number(value),
    }))
    .filter((item) => item.amount > 0);
}

export function PortfolioGameLoop() {
  const [status, setStatus] = useState<GameStatus>('allocation');
  const [portfolio, setPortfolio] = useState<Portfolio>(() =>
    createStarterPortfolio(),
  );
  const [allocationInputs, setAllocationInputs] = useState<AllocationInputs>(() =>
    createInitialAllocationInputs(),
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<PortfolioResult | null>(null);
  const [feedback, setFeedback] = useState<CoachingFeedback | null>(null);

  const totalAllocated = useMemo(() => {
    return createAllocationItems(allocationInputs).reduce((total, item) => {
      return total + item.amount;
    }, 0);
  }, [allocationInputs]);

  const remainingCashPreview = portfolio.cash - totalAllocated;

  function updateAllocationInput(assetId: string, value: string) {
    setAllocationInputs((currentInputs) => ({
      ...currentInputs,
      [assetId]: value,
    }));
  }

  function runMarketEvent() {
    const allocationResult = applyAllocationDecision(
      portfolio,
      starterAssets,
      {
        items: createAllocationItems(allocationInputs),
      },
    );

    if (!allocationResult.success) {
      setErrorMessage(allocationResult.reason);
      return;
    }

    const eventAssets = applyMarketEvent(starterAssets, starterMarketEvent);

    const portfolioResult = calculatePortfolioResult(
      allocationResult.portfolio,
      starterAssets,
      eventAssets,
    );

    const coachingFeedback = generateCoachingFeedback(
      allocationResult.portfolio,
      portfolioResult,
      starterAssets,
    );

    setPortfolio(allocationResult.portfolio);
    setResult(portfolioResult);
    setFeedback(coachingFeedback);
    setErrorMessage(null);
    setStatus('result');
  }

  function restartLoop() {
    setStatus('allocation');
    setPortfolio(createStarterPortfolio());
    setAllocationInputs(createInitialAllocationInputs());
    setErrorMessage(null);
    setResult(null);
    setFeedback(null);
  }

  return (
    <main className="portfolio-game">
      <section className="game-panel hero-panel">
        <p className="eyebrow">Phase 1B Prototype</p>
        <h1>Portfolio Game Loop MVP</h1>
        <p>
          Manage fictional learning credits, allocate across fictional assets,
          face a market event, and review the consequence of your decision.
        </p>
      </section>

      <section className="game-panel">
        <h2>Market Briefing</h2>
        <p>
          The academy simulation opens with a calm but uncertain market. Food
          infrastructure looks stable, consumer technology is sensitive to news,
          and clean energy carries higher uncertainty.
        </p>
        <p className="resource-line">
          Starting cash: <strong>{formatCredits(portfolio.cash)}</strong>
        </p>
      </section>

      {status === 'allocation' && (
        <section className="game-panel">
          <h2>Allocation Decision</h2>
          <p>
            Choose how many fictional credits to allocate. You do not need to
            spend everything; keeping cash can protect flexibility.
          </p>

          <div className="asset-grid">
            {starterAssets.map((asset) => (
              <article className="asset-card" key={asset.id}>
                <div>
                  <h3>{asset.name}</h3>
                  <p className="muted">{asset.sector}</p>
                </div>

                <p>{asset.description}</p>

                <dl className="asset-stats">
                  <div>
                    <dt>Risk</dt>
                    <dd>{asset.riskLevel}</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>{formatCredits(asset.startingPrice)}</dd>
                  </div>
                </dl>

                <label className="allocation-label">
                  Allocate credits
                  <input
                    min="0"
                    type="number"
                    value={allocationInputs[asset.id]}
                    onChange={(event) =>
                      updateAllocationInput(asset.id, event.target.value)
                    }
                    placeholder="0"
                  />
                </label>
              </article>
            ))}
          </div>

          <div className="decision-summary">
            <p>
              Allocated:{' '}
              <strong>{formatCredits(Math.max(totalAllocated, 0))}</strong>
            </p>
            <p>
              Cash preview:{' '}
              <strong>{formatCredits(remainingCashPreview)}</strong>
            </p>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="button" onClick={runMarketEvent}>
            Run Market Event
          </button>
        </section>
      )}

      {status === 'result' && result && feedback && (
        <>
          <section className="game-panel event-panel">
            <p className="eyebrow">Market Event</p>
            <h2>{starterMarketEvent.title}</h2>
            <p>{starterMarketEvent.description}</p>
            <p className="muted">{starterMarketEvent.educationalConcept}</p>
          </section>

          <section className="game-panel">
            <h2>Portfolio Result</h2>

            <div className="result-grid">
              <article>
                <span>Starting value</span>
                <strong>{formatCredits(result.startingValue)}</strong>
              </article>
              <article>
                <span>Final value</span>
                <strong>{formatCredits(result.finalValue)}</strong>
              </article>
              <article>
                <span>Change</span>
                <strong>{formatCredits(result.change)}</strong>
              </article>
              <article>
                <span>Change percent</span>
                <strong>{result.changePercent.toFixed(2)}%</strong>
              </article>
            </div>

            <div className="holding-breakdown">
              {result.holdingResults.map((holding) => {
                const asset = starterAssets.find(
                  (item) => item.id === holding.assetId,
                );

                return (
                  <article key={holding.assetId} className="holding-row">
                    <div>
                      <strong>{asset?.name ?? holding.assetId}</strong>
                      <p className="muted">
                        Quantity: {holding.quantity.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span>{formatCredits(holding.startingValue)}</span>
                      <span>→</span>
                      <strong>{formatCredits(holding.finalValue)}</strong>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="game-panel feedback-panel">
            <p className="eyebrow">Coach Feedback</p>
            <h2>{feedback.title}</h2>
            <p>{feedback.message}</p>

            <div className="tag-row">
              {feedback.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <button type="button" onClick={restartLoop}>
              Restart Loop
            </button>
          </section>
        </>
      )}
    </main>
  );
}