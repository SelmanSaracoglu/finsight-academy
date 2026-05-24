import type { SceneId, SessionScene } from '@finsight-academy/shared';
import { getSceneProgress } from '@finsight-academy/shared';

type SessionSceneViewProps = {
  scene: SessionScene;
  onNavigate: (sceneId: SceneId) => void;
  isPrimaryActionDisabled?: boolean;
  disabledActionHint?: string;
};

export function SessionSceneView({
  scene,
  onNavigate,
  isPrimaryActionDisabled,
  disabledActionHint,
}: SessionSceneViewProps) {
  const nextSceneId = scene.nextSceneId;
  const progress = getSceneProgress(scene.id);

  return (
    <section className="welcome-scene">
      <p className="scene-progress">
        Scene {progress.currentStep} of {progress.totalSteps}
      </p>
      <p className="eyebrow">{scene.eyebrow}</p>

      <h1>{scene.title}</h1>

      <p className="intro">{scene.body}</p>

      <div className="notice">{scene.notice}</div>

      {nextSceneId ? (
        <>
          <button
            type="button"
            className="primary-action"
            disabled={isPrimaryActionDisabled}
            onClick={() => onNavigate(nextSceneId)}
          >
            {scene.primaryActionLabel}
          </button>

          {isPrimaryActionDisabled && disabledActionHint ? (
            <p className="action-hint">{disabledActionHint}</p>
          ) : null}
        </>
      ) : null}
    </section>
  );
}