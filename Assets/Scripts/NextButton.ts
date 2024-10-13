import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

@component
export class NextButton extends BaseScriptComponent {
  @input pinchButton: PinchButton;
  @input isBack: boolean;
  @input stepText: Text;
  @input currInstruction: Text;
  
  instructions = ["this is instruction 1", "this is instruction 2", "this is instruction 3", "this is instruction 4"]

  onAwake() {
    // Register Listener
    this.currInstruction.text = this.instructions[0];

    this.pinchButton.onButtonPinched.add(() => {
      this.onButtonPressed();
    });
  }

  onButtonPressed() {
    let stepNumber = parseInt(
      this.stepText.text[this.stepText.text.length - 1]
    );
    stepNumber += this.isBack ? -1 : 1;
    stepNumber = Math.min(this.instructions.length, stepNumber);
    stepNumber = Math.max(1, stepNumber);
    this.stepText.text = `Step #${stepNumber}`;

    this.currInstruction.text = this.instructions[stepNumber - 1];
  }
}