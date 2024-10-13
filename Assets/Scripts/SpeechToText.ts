import { RecipeSelector } from "./RecipeSelector";
import { cleanString, getNumber } from "./utils";
import { WebRequest } from "./WebRequest";

@component
export class SpeechToText extends BaseScriptComponent {
  @input searchKeyword: string;
  @input timerKeyword: string;
  @input recipeSelector: RecipeSelector;
  @input webRequest: WebRequest;

  private readonly voiceMlModule =
    require("LensStudio:VoiceMLModule") as VoiceMLModule;

  onAwake() {
    this.createEvent("OnStartEvent").bind(() => this.onStart());
  }

  handleSearch(transcription: string) {
    const index = transcription.toLowerCase().indexOf(this.searchKeyword);

    if (index != -1) {
      const searchTerm = cleanString(
        transcription.slice(
          index + this.searchKeyword.length,
          transcription.length
        )
      );

      print(`Searching for: ${searchTerm}`);

      const sampleJSON = JSON.stringify({
        ingredients: [
          {
            chicken: "1.5 lbs (700 grams) boneless chicken thighs or breasts",
          },
          { "lemon juice": "1 tablespoon" },
          {
            oil: "3 tablespoons (plus 1 tablespoon for marinating) or ghee",
          },
          { "ginger garlic paste": "2 tablespoons" },
          { "kasuri methi (dried fenugreek leaves)": "3 tablespoons" },
          { "Greek yogurt": "½ cup" },
          { onions: "1.5 cups (1 large or 2 medium)" },
          { "green chili": "1 (optional)" },
          {
            "fresh tomatoes":
              "500 grams (or 1¼ cup bottled tomato puree/passata)",
          },
          { "heavy cream": "½ to ¾ cup" },
          { sugar: "1 to 2 teaspoons" },
          { salt: "to taste" },
          { "garam masala": "to taste" },
          { water: "1 to 2 cups" },
          { cashews: "30 whole (for cashew cream, optional)" },
        ],
        steps: [
          `${searchTerm}`,
          "Pat dry",
          "Add lemon juice and oil",
          "Mix in ginger garlic paste and kasuri methi",
          "Incorporate Greek yogurt",
          "Mix well and marinate",
          "Heat oil in a pot",
          "Sauté onions until golden",
          "Add green chili and ginger garlic paste",
          "Add spices and quickly stir",
          "Incorporate tomatoes",
          "Cook until masala thickens",
          "Boil water in a separate pot",
          "Add water and stir",
          "Cover and simmer the sauce",
          "Grill chicken on skewers",
          "Bake or air fry the chicken",
          "Prepare cashew cream, if using",
          "Add heavy cream to the masala",
          "Stir in sugar",
          "Let it simmer until thick",
          "Mix in grilled chicken",
          "Cook covered until chicken is tender",
          "Garnish with cream and coriander leaves",
        ],
      });

      this.recipeSelector.loadData(sampleJSON);
    }
  }

  handleTimer(transcription: string) {
    const index = transcription.toLowerCase().indexOf(this.timerKeyword);

    if (index == -1) return;

    const rest = cleanString(transcription).slice(
      index + this.timerKeyword.length,
      transcription.length
    );

    const number = parseInt(rest.trim().split(" ")[1]);

    print(number);
  }

  onStart() {
    const options = VoiceML.ListeningOptions.create();
    options.shouldReturnInterimAsrTranscription = false;
    options.shouldReturnAsrTranscription = true;

    this.voiceMlModule.onListeningUpdate.add((event) => {
      if (event.transcription) {
        print(event.transcription);

        this.handleSearch(event.transcription);
        this.handleTimer(event.transcription);
      }
    });
    this.voiceMlModule.startListening(options);
  }
}
