document.addEventListener("DOMContentLoaded", () => {
  const generateJokeBtn = document.querySelector(".random-jokes");
  const jokeDisplay = document.querySelector(".joke-display");
  const speakButton = document.getElementById('speak-button');

  generateJokeBtn.addEventListener('click', getJoke);
  speakButton.addEventListener('click', speakJoke);

  function getJoke() {
      fetch('https://hindi-jokes-api.onrender.com/jokes?api_key=47449ede0a82312b48bf686e96cf')
          .then(response => response.json())
          .then(data => {
              jokeDisplay.textContent = data.jokeContent;
          })
          .catch(error => {
              jokeDisplay.textContent = 'Failed to get joke. Please try again later.';
              console.error('Error fetching joke:', error);
          });
  }
  getJoke();

  function speakJoke() {
      const textToSpeak = jokeDisplay.textContent;
      const speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
      speechUtterance.lang = 'hi-IN'; // Set the language to Hindi (India)

      const speechSynthesis = window.speechSynthesis;
      speechSynthesis.onvoiceschanged = function() {
          const voices = speechSynthesis.getVoices();
          const hindiVoice = voices.find(voice => voice.lang === 'hi-IN');

          if (hindiVoice) {
              speechUtterance.voice = hindiVoice;
          } else {
              console.error('Hindi voice not found.');
          }

          speechSynthesis.speak(speechUtterance);
      };
  }

 
  
});
