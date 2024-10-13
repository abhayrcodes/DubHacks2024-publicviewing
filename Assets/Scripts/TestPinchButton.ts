import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

@component
export class TestPinchButton extends BaseScriptComponent {
  @input button: PinchButton;

  onAwake() {
    this.button.onButtonPinched.add(() => {
      this.test();
    });
  }

  test() {
    print("Button clicked.");
  }
}
