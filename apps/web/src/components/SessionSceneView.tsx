import type { SceneId, SessionScene } from '@finsight-academy/shared';

type SessionSceneViewProps = {
  scene: SessionScene;
  onNavigate: (sceneId: SceneId) => void;
};

export function SessionSceneView({
  scene,
  onNavigate,
}: SessionSceneViewProps) {
  const nextSceneId = scene.nextSceneId;

  return (
    <section className="welcome-scene">
      <p className="eyebrow">{scene.eyebrow}</p>

      <h1>{scene.title}</h1>

      <p className="intro">{scene.body}</p>

      <div className="notice">{scene.notice}</div>

      {nextSceneId ? (
        <button
          type="button"
          className="primary-action"
          onClick={() => onNavigate(nextSceneId)}
        >
          {scene.primaryActionLabel}
        </button>
      ) : null}
    </section>
  );
}