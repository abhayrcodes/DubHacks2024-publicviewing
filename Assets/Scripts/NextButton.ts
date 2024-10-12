import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

@component
export class NewScript extends BaseScriptComponent {
  @input pinchButton: PinchButton;
  @input isBack: boolean;
  @input stepText: Text;

  onAwake() {
    // Register Listener
    this.pinchButton.onButtonPinched.add(() => {
      this.onButtonPressed();
    });
  }

  onButtonPressed() {
    let stepNumber = parseInt(
      this.stepText.text[this.stepText.text.length - 1]
    );
    stepNumber += this.isBack ? -1 : 1;
    stepNumber = Math.max(stepNumber, 0);
    this.stepText.text = `Step #${stepNumber}`;
  }
}
