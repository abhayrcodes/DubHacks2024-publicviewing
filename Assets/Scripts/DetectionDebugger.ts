@component
export class DetectionDebugger extends BaseScriptComponent {
  @input mlController: ScriptComponent;

  onAwake() {
    this.createEvent("OnStartEvent").bind(() => {
      this.onStart();
    });
  }

  onStart() {
    (this.mlController as any).onDetectionsUpdated.add(this.onUpdate);
  }

  onUpdate(detections) {
    print(detections);
  }
}
