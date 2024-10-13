//@input Asset.VoiceMLModule vmlModule {"label": "Voice ML Module"}

var options = VoiceML.ListeningOptions.create();

var onListeningEnabledHandler = function () {
    script.vmlModule.startListening(options);
  };

  var onListeningDisabledHandler = function () {
    script.vmlModule.stopListening();
  };

  var onListeningErrorHandler = function (eventErrorArgs) {
    print(
      'Error: ' + eventErrorArgs.error + ' desc: ' + eventErrorArgs.description
    );
  };

  var onUpdateListeningEventHandler = function(eventArgs) {
    continue
    };