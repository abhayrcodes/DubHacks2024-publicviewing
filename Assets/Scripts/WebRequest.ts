@component
export class WebRequest extends BaseScriptComponent {
  @input remoteServiceModule: RemoteServiceModule;

  public fetchRecipe(s: string, callback: (body: string) => void) {
    const request = RemoteServiceHttpRequest.create();
    request.method = RemoteServiceHttpRequest.HttpRequestMethod.Get;
    request.url = `https://dub-hacks2024-rosy.vercel.app/?meal=${s}`;

    this.remoteServiceModule.performHttpRequest(request, (response) => {
      print(`HTTP CODE ${response.statusCode}`);
      print(`Content-Type: ${response.contentType}`);
      print(`Headers: ${JSON.stringify(response.headers)}`);
      print(response.body);
      if (response.body.length == 0) return;
      callback(response.body);
    });
  }
}
