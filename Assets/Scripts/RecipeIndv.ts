import { PinchButton } from "SpectaclesInteractionKit/Components/UI/PinchButton/PinchButton";

@component
export class RecipeIndv extends BaseScriptComponent {
  @input selectionButton: PinchButton;
  @input nameText: Text;

  onAwake() {}

  public registerOnPinch(f: () => void) {
    this.selectionButton.onButtonPinched.add(() => {
      f();
    });
  }

  public updateText(txt: string) {
    this.nameText.text = txt;
  }
}
