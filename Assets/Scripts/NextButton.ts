import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

@component
export class NewScript extends BaseScriptComponent {
  @input pinchButton: PinchButton;

  onAwake() {
    // Register Listener
    this.pinchButton.onButtonPinched.add(this.onButtonPressed);
  }

  onButtonPressed() {
    print("button pressed");
  }
}
