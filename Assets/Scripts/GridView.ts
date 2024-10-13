@component
export class GridContentCreator extends BaseScriptComponent {
  @input
  itemPrefab: ObjectPrefab;
  @input
  itemsCount: number = 10;

  ingredients = [
    "egg",
    "cheese",
    "milk",
    "water",
    "noodles",
    "chili",
    "sugar",
    "salt",
    "coconut",
    "goon",
  ];

  onAwake() {
    if (!this.itemPrefab) {
      throw new Error(
        "ItemPrefab is not wired in SceneObject:" + this.getSceneObject().name
      );
    }

    const yStart = 0;
    const yOffset = -5.4;

    for (let i = 0; i < this.itemsCount; i++) {
      const item = this.itemPrefab.instantiate(this.getSceneObject());
      item.getChild(0).getComponent("Text").text =
        this.ingredients[i];
      const screenTransform = item.getComponent("Component.ScreenTransform");
      screenTransform.offsets.setCenter(new vec2(0, yStart + yOffset * i));
      item.enabled = true;
    }
  }
}
