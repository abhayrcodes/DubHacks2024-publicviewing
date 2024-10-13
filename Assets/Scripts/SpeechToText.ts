import { RecipeSelector } from "./RecipeSelector";
import { cleanString } from "./utils";

@component
export class SpeechToText extends BaseScriptComponent {
  @input keyword: string;
  @input recipeSelector: RecipeSelector;

  private readonly voiceMlModule =
    require("LensStudio:VoiceMLModule") as VoiceMLModule;

  onAwake() {
    this.createEvent("OnStartEvent").bind(() => this.onStart());
  }

  onStart() {
    const options = VoiceML.ListeningOptions.create();
    options.shouldReturnInterimAsrTranscription = false;
    options.shouldReturnAsrTranscription = true;

    this.voiceMlModule.onListeningUpdate.add((event) => {
      if (event.transcription) {
        print(event.transcription);

        const index = event.transcription.toLowerCase().indexOf(this.keyword);

        if (index != -1) {
          const searchTerm = cleanString(
            event.transcription.slice(
              index + this.keyword.length,
              event.transcription.length
            )
          );

          print(`Searching for: ${searchTerm}`);
        }
      }
    });
    this.voiceMlModule.startListening(options);
  }
}
