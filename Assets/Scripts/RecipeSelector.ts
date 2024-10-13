import { RecipeIndv } from "./RecipeIndv";
import { RecipeController } from "./RecipeController";

@component
export class RecipeSelector extends BaseScriptComponent {
  @input recipe1: RecipeIndv;
  @input recipe2: RecipeIndv;
  @input recipe3: RecipeIndv;
  @input recipe4: RecipeIndv;

  @input recipeController: RecipeController;

  private recipeData: any;
  private steps: any;

  onAwake() {
    this.createEvent("OnStartEvent").bind(() => {
      this.onStart();
    });
  }

  onStart() {
    const buttons = [this.recipe1, this.recipe2, this.recipe3, this.recipe4];

    this.recipeData = [
      {
        steps: ["a", "b", "c", "d"],
      },
      {
        steps: ["d", "e", "f", "g"],
      },
      {
        steps: ["h", "i", "j", "k"],
      },
      {
        steps: ["l", "m", "n", "o"],
      },
    ];

    buttons.forEach((button, idx) => {
      button.registerOnPinch(() => {
        this.registerButton(idx)();
      });
    });
  }

  registerButton(idx: number) {
    return () => {
      this.recipeController.updateInstructions(this.recipeData[idx].steps);
    };
  }

  public loadData(jsonData: any) {
    this.steps = jsonData.steps;
    this.recipeController.updateInstructions(this.steps);
  }
}
