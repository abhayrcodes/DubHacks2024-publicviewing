import { OPEN_AI_KEY } from "./env";

@component
export class WebRequest extends BaseScriptComponent {
  @input remoteServiceModule: RemoteServiceModule;

  public fetchRecipe(s: string) {
    const request = RemoteServiceHttpRequest.create();
    request.method = RemoteServiceHttpRequest.HttpRequestMethod.Post;
    request.url = "https://api.openai.com/v1/chat/completions";
    request.body = JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            'Reverse the string I say. Example: If I say "cat", reply "tac"',
        },
        {
          role: "user",
          content: s,
        },
      ],
    });

    request.setHeader("Content-Type", "application/json");
    request.setHeader("Authorization", `Bearer ${OPEN_AI_KEY}`);

    this.remoteServiceModule.performHttpRequest(request, (response) => {
      print(`HTTP CODE ${response.statusCode}`);
      print(`Content-Type: ${response.contentType}`);
      print(`Headers: ${JSON.stringify(response.headers)}`);
      print(response.body);
    });
  }
}
