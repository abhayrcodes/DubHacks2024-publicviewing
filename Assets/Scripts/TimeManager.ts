import { Timer } from "./Timer";

@component
export class TimeManager extends BaseScriptComponent {
  @input timerPrefab: ObjectPrefab;

  public instantiateTimer(time: number) {
    if (Number.isNaN(time)) return;

    const item = this.timerPrefab.instantiate(this.getSceneObject());
    item.getTransform().setLocalPosition(new vec3(0, 0, 0));

    item
      .getChild(0)
      .getChild(0)
      .getChild(4)
      .getComponent(Timer.getTypeName())
      .setTime(time);
  }
}
