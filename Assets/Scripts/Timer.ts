@component
export class Timer extends BaseScriptComponent {
  @input timerLength: number;
  timerText: Text;
  private currentValue: number;

  onAwake() {
    this.currentValue = this.timerLength;
    this.createEvent("UpdateEvent").bind(() => {
      this.onUpdate();
    });

    this.timerText = this.getSceneObject().getComponent("Text");
  }

  getMinutes() {
    return Math.floor(this.currentValue / 60);
  }

  getSeconds() {
    const storedValue = Math.floor(this.currentValue) % 60;
    let ret = storedValue.toString();

    if (ret.length < 2) {
      ret = "0" + ret;
    }

    return ret;
  }

  onUpdate() {
    if (this.currentValue <= 0) {
      return;
    }
    this.timerText.text = `${this.getMinutes()}:${this.getSeconds()}`;

    this.currentValue -= getDeltaTime();
  }
}
