import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

@component
export class RecipeIndv extends BaseScriptComponent {
  @input selectionButton: PinchButton;
  @input nameText: Text;

  onAwake() {}

  registerOnPinch(f: () => void) {
    this.selectionButton.onButtonPinched.add(() => {
      f();
    });
  }
}
