document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const transcription = document.getElementById("transcription");
  const speechContainer = document.querySelector(".speech-container");

  let recognition = null;

  startButton.addEventListener("click", startSpeechRecognition);
  stopButton.addEventListener("click", stopSpeechRecognition);

  function startSpeechRecognition() {
    recognition = new (window.webkitSpeechRecognition ||
      window.SpeechRecognition)();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
      speechContainer.style.display = "flex";
    };

    recognition.onresult = function (event) {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      transcription.value = finalTranscript;
    };

    recognition.onerror = function (event) {
      console.error("Recognition error:", event.error);
    };

    recognition.onend = function () {
      speechContainer.style.display = "none";
    };

    recognition.start();
  }

  function stopSpeechRecognition() {
    if (recognition) {
      recognition.stop();
    }
  }
});
