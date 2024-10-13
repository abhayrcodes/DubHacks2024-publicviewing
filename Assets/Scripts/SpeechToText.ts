import { GridContentCreator } from "../SpectaclesInteractionKit/Components/UI/ScrollView/GridContentCreator";
import { RecipeSelector } from "./RecipeSelector";
import { TimeManager } from "./TimeManager";
import { cleanString, getNumber } from "./utils";
import { WebRequest } from "./WebRequest";

@component
export class SpeechToText extends BaseScriptComponent {
  @input searchKeyword: string;
  @input timerKeyword: string;
  @input recipeSelector: RecipeSelector;
  @input webRequest: WebRequest;
  @input timeManager: TimeManager;
  @input gridCC: GridContentCreator;

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

      let data: any = {};

      this.webRequest.fetchRecipe(searchTerm, (s: string) => {
        data = JSON.parse(s);
        this.gridCC.updateIngs(data.ingredients.keys);
        this.recipeSelector.loadData(data);
      });
    }
  }

  handleTimer(transcription: string) {
    const cleaned = cleanString(transcription).toLowerCase();

    print(cleaned);

    const index = cleaned.indexOf(this.timerKeyword);

    if (index == -1) return;

    const rest = cleaned.slice(
      index + this.timerKeyword.length,
      transcription.length
    );

    const number = parseInt(rest.trim().split(" ")[1]);

    this.timeManager.instantiateTimer(number);
  }

  onStart() {
    const options = VoiceML.ListeningOptions.create();
    options.shouldReturnInterimAsrTranscription = false;
    options.shouldReturnAsrTranscription = true;

    this.voiceMlModule.onListeningEnabled.add(() => {
      this.voiceMlModule.startListening(options);
    });
    this.voiceMlModule.onListeningDisabled.add(() => {
      this.voiceMlModule.stopListening();
    });
    this.voiceMlModule.onListeningError.add((event) => {
      print(`${event.error}: ${event.description}`);
    });
    this.voiceMlModule.onListeningUpdate.add((event) => {
      if (event.transcription) {
        print(event.transcription);

        this.handleSearch(event.transcription);
        this.handleTimer(event.transcription);
      }
    });
  }
}
