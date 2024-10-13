@component
export class TimeManager extends BaseScriptComponent {
  @input timerPrefab: ObjectPrefab;

  public instantiateTimer(time: number) {
    if (Number.isNaN(time)) return;

    const item = this.timerPrefab.instantiate(this.getSceneObject());

    (
      item
        .getChild(0)
        .getChild(0)
        .getChild(4)
        .getComponent("ScriptComponent") as any
    ).setTime(time);
  }
}
