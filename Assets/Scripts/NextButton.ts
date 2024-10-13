import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";
import { RecipeController } from "./RecipeController";

@component
export class NextButton extends BaseScriptComponent {
  @input pinchButton: PinchButton;
  @input isBack: boolean;
  @input stepText: Text;
  @input recipeController: RecipeController;

  onAwake() {
    this.pinchButton.onButtonPinched.add(() => {
      this.onButtonPressed();
    });
  }

  onButtonPressed() {
    let stepNumber = parseInt(
      this.stepText.text[this.stepText.text.length - 1]
    );

    const incremenet = this.isBack ? -1 : 1;

    const newIndex = this.recipeController.updateIndex(stepNumber + incremenet);
    this.stepText.text = `Step #${newIndex}`;
  }
}
