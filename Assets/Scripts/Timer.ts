import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

@component
export class Timer extends BaseScriptComponent {
  @input timerLength: number;
  timerText: Text;
  private currentValue: number;
  private timeMultiplier: number;

  @input increaseTimeButton: PinchButton;
  @input decreaseTimeButton: PinchButton;
  @input startButton: PinchButton;
  @input stopButton: PinchButton;

  onAwake() {
    this.timeMultiplier = 1;

    this.currentValue = this.timerLength;
    this.createEvent("UpdateEvent").bind(() => {
      this.onUpdate();
    });

    this.timerText = this.getSceneObject().getComponent("Text");

    this.increaseTimeButton.onButtonPinched.add(() => {
      this.increaseTime();
    });

    this.decreaseTimeButton.onButtonPinched.add(() => {
      this.decreaseTime();
    });

    this.startButton.onButtonPinched.add(() => {
      this.startTime();
    });

    this.stopButton.onButtonPinched.add(() => {
      this.stopTime();
    });
  }

  increaseTime() {
    this.currentValue += 60;
  }

  decreaseTime() {
    this.currentValue -= 60;
    this.currentValue = Math.max(0, this.currentValue);
  }

  stopTime() {
    this.timeMultiplier = 0;
  }

  startTime() {
    this.timeMultiplier = 1;
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

  setTime(amount: number) {
    this.currentValue = amount * 60;
  }

  onUpdate() {
    if (this.currentValue <= 0) {
      return;
    }
    this.timerText.text = `${this.getMinutes()}:${this.getSeconds()}`;

    this.currentValue -= getDeltaTime() * this.timeMultiplier;
  }
}
