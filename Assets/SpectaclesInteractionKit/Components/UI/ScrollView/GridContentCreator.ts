@component
export class GridContentCreator extends BaseScriptComponent {
  @input
  itemPrefab: ObjectPrefab;

  full = {"ingredients":[{"chickenfjyfyjbufbuyfbukfbufbytdfb":"1.5 lbs (700 grams) boneless chicken thighs or breasts"},{"lemon juice":"1 tablespoon"},{"oil":"3 tablespoons (plus 1 tablespoon for marinating) or ghee"},{"ginger garlic paste":"2 tablespoons"},{"kasuri methi (dried fenugreek leaves)":"3 tablespoons"},{"Greek yogurt":"½ cup"},{"onions":"1.5 cups (1 large or 2 medium)"},{"green chili":"1 (optional)"},{"fresh tomatoes":"500 grams (or 1¼ cup bottled tomato puree/passata)"},{"heavy cream":"½ to ¾ cup"},{"sugar":"1 to 2 teaspoons"},{"salt":"to taste"},{"garam masala":"to taste"},{"water":"1 to 2 cups"},{"cashews":"30 whole (for cashew cream, optional)"}],"steps":["Dice chicken","Pat dry","Add lemon juice and oil","Mix in ginger garlic paste and kasuri methi","Incorporate Greek yogurt","Mix well and marinate","Heat oil in a pot","Sauté onions until golden","Add green chili and ginger garlic paste","Add spices and quickly stir","Incorporate tomatoes","Cook until masala thickens","Boil water in a separate pot","Add water and stir","Cover and simmer the sauce","Grill chicken on skewers","Bake or air fry the chicken","Prepare cashew cream, if using","Add heavy cream to the masala","Stir in sugar","Let it simmer until thick","Mix in grilled chicken","Cook covered until chicken is tender","Garnish with cream and coriander leaves"]};

  onAwake() {
    if (!this.itemPrefab) {
      throw new Error(
        "ItemPrefab is not wired in SceneObject:" + this.getSceneObject().name
      );
    }

    const yStart = 0;
    const yOffset = -5.4;

    for (let i = 0; i < this.full.ingredients.length; i++) {
      const item = this.itemPrefab.instantiate(this.getSceneObject());
      //print(typeof item.getChild(0).getComponent("Text").text);
      //print(Object.keys(this.full.ingredients[i])[0]);
      item.getChild(0).getComponent("Text").text = Object.keys(this.full.ingredients[i])[0];
      const screenTransform = item.getComponent("Component.ScreenTransform");
      screenTransform.offsets.setCenter(new vec2(0, yStart + yOffset * i));
      item.enabled = true;
    }
  }
}
