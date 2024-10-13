@component
export class RecipeController extends BaseScriptComponent {
  @input instructionText: Text;
  @input stepText: Text;
  private instructions: string[];

  onAwake() {
    this.instructions = ["1", "2", "3", "4"];

    this.instructionText.text =
      this.instructions.length > 0 ? this.instructions[0] : "";
  }

  public updateInstructions(newInstructions: string[]) {
    this.instructions = newInstructions;
    this.reset();
  }

  updateText(text: string) {
    this.instructionText.text = text;
  }

  public updateIndex(newIndex: number) {
    const returnValue =
      Math.min(Math.max(newIndex, 1), this.instructions.length) - 1;

    this.updateText(this.instructions[returnValue]);

    return returnValue + 1;
  }

  reset() {
    this.updateText(
      this.instructions.length > 0 ? this.instructions[0] : "No instructions :("
    );
    this.stepText.text = "Step #1";
  }
}
