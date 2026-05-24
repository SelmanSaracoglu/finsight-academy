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
  const currentPhaseLabel = 
    status === 'allocation' ? 'Allocation Phase' : 'Result Phase';

  const currentObjective =
    status === 'allocation'
      ? 'Deploy credits while keeping risk and flexibility in mind.'
      : 'Review how your allocation handled the market event.';

  const rivalBenchmarkValue = 1002;

  const rivalStanding =
    result && result.finalValue >= rivalBenchmarkValue
      ? 'Ahead of the academy benchmark'
      : 'Behind the academy benchmark';

  const rivalStandingHint =
    result && result.finalValue >= rivalBenchmarkValue
      ? 'Your allocation handled this event slightly better than the fictional benchmark portfolio.'
      : 'The fictional benchmark handled this event better. Review whether your allocation was too concentrated or too exposed.';

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
    <main className="game-stage">
      <section className="trial-hud">
        <div>
          <span>Trial 01</span>
          <strong>Capital Allocation</strong>
        </div>

        <div>
          <span>Current Phase</span>
          <strong>{currentPhaseLabel}</strong>
        </div>

        <div>
          <span>Objective</span>
          <strong>{currentObjective}</strong>
        </div>
      </section>

      <section className="academy-command">
        <div>
          <p className="eyebrow">Academy Simulation Deck</p>
          <h1>Capital Trial: First Allocation</h1>
          <p>
            You are managing fictional academy credits inside a controlled
            market simulation. Read the briefing, deploy your credits, then
            observe how the event changes your position.
          </p>
        </div>

        <div className="resource-orb">
          <span>Available Credits</span>
          <strong>{formatCredits(portfolio.cash)}</strong>
        </div>
      </section>

      <section className="briefing-scroll">
        <div className="briefing-icon">◆</div>
        <div>
          <p className="eyebrow">Market Briefing</p>
          <h2>Three sectors are moving under uncertainty</h2>
          <p>
            Food infrastructure looks steady, consumer technology is sensitive
            to sudden news, and clean energy carries higher uncertainty. Your
            task is not to guess perfectly; your task is to build a decision
            that can survive surprise.
          </p>
        </div>
      </section>

      {status === 'allocation' && (
        <section className="simulation-board">
          <div className="board-header">
            <div>
              <p className="eyebrow">Allocation Phase</p>
              <h2>Deploy your fictional credits</h2>
            </div>
            <p>
              You may keep credits undeployed. Cash is not exciting, but it can
              protect flexibility.
            </p>
          </div>

          <div className="asset-deck">
            {starterAssets.map((asset) => (
              <article className="asset-token" key={asset.id}>
                <div className="asset-token-top">
                  <span className={`risk-badge risk-${asset.riskLevel}`}>
                    {asset.riskLevel} risk
                  </span>
                  <span className="asset-price">
                    {formatCredits(asset.startingPrice)}
                  </span>
                </div>

                <div>
                  <h3>{asset.name}</h3>
                  <p className="asset-sector">{asset.sector}</p>
                </div>

                <p className="asset-lore">{asset.description}</p>

                <label className="credit-control">
                  <span>Credit deployment</span>
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

          <div className="command-footer">
            <div className="credit-meter">
              <div>
                <span>Deployed</span>
                <strong>{formatCredits(Math.max(totalAllocated, 0))}</strong>
              </div>
              <div>
                <span>Reserve</span>
                <strong>{formatCredits(remainingCashPreview)}</strong>
              </div>
            </div>

            <button type="button" onClick={runMarketEvent}>
              Resolve Simulation
            </button>
          </div>

          {errorMessage && <p className="error-rune">{errorMessage}</p>}
        </section>
      )}

      {status === 'result' && result && feedback && (
        <>
          <section className="event-reveal">
            <p className="eyebrow">Market Event Revealed</p>
            <h2>{starterMarketEvent.title}</h2>
            <p>{starterMarketEvent.description}</p>
            <small>{starterMarketEvent.educationalConcept}</small>
          </section>

          <section className="simulation-board">
            <div className="board-header">
              <div>
                <p className="eyebrow">Simulation Result</p>
                <h2>Your portfolio after the event</h2>
              </div>
              <p>
                The result is not a grade. It is evidence about how your
                allocation handled uncertainty.
              </p>
            </div>

            <div className="score-strip">
              <article>
                <span>Start</span>
                <strong>{formatCredits(result.startingValue)}</strong>
              </article>
              <article>
                <span>End</span>
                <strong>{formatCredits(result.finalValue)}</strong>
              </article>
              <article>
                <span>Shift</span>
                <strong>{formatCredits(result.change)}</strong>
              </article>
              <article>
                <span>Momentum</span>
                <strong>{result.changePercent.toFixed(2)}%</strong>
              </article>
            </div>

            <div className="rival-benchmark">
              <div>
                <p className="eyebrow">Fictional Rival Benchmark</p>
                <h3>Northbridge Academy Portfolio</h3>
                <p>
                  A simulated rival portfolio used only for local practice. It
                  is not a real leaderboard.
                </p>
              </div>

              <div className="benchmark-score">
                <span>Benchmark End Value</span>
                <strong>{formatCredits(rivalBenchmarkValue)}</strong>
              </div>

              <div className="benchmark-standing">
                <strong>{rivalStanding}</strong>
                <p>{rivalStandingHint}</p>
              </div>
            </div>

            <div className="asset-outcome-list">
              {result.holdingResults.map((holding) => {
                const asset = starterAssets.find(
                  (item) => item.id === holding.assetId,
                );

                return (
                  <article key={holding.assetId} className="asset-outcome">
                    <div>
                      <strong>{asset?.name ?? holding.assetId}</strong>
                      <p>
                        Quantity controlled: {holding.quantity.toFixed(2)}
                      </p>
                    </div>

                    <div className="value-shift">
                      <span>{formatCredits(holding.startingValue)}</span>
                      <span>→</span>
                      <strong>{formatCredits(holding.finalValue)}</strong>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="coach-terminal">
            <p className="eyebrow">Academy Coach</p>
            <h2>{feedback.title}</h2>
            <p>{feedback.message}</p>

            <div className="tag-row">
              {feedback.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <button type="button" onClick={restartLoop}>
              Replay Trial
            </button>
          </section>
        </>
      )}
    </main>
  );
}