const audioStates = {};

// Function to play or stop audio based on its current state
function toggleAudio(audioSrc, audioId) {
    if (audioStates[audioId] && audioStates[audioId].isPlaying) {
        stopAudio(audioId);
    } else {
        playAudio(audioSrc, audioId);
    }
}

// Function to play audio
function playAudio(audioSrc, audioId) {
    // Check if the audio is not playing
    if (!audioStates[audioId] || !audioStates[audioId].isPlaying) {
        // Create an audio element if not already present
        if (!audioStates[audioId]) {
            audioStates[audioId] = new Audio(audioSrc);
        }

        // Play the audio
        audioStates[audioId].play();
        audioStates[audioId].isPlaying = true;
    }
}

// Function to stop audio
function stopAudio(audioId) {
    // Check if the audio is playing
    if (audioStates[audioId] && audioStates[audioId].isPlaying) {
        // Pause and reset the audio
        audioStates[audioId].pause();
        audioStates[audioId].currentTime = 0;
        audioStates[audioId].isPlaying = false;
    }
}

// Function to stop all playing audio
function stopAllAudio() {
    for (const key in audioStates) {
        if (audioStates.hasOwnProperty(key) && audioStates[key].isPlaying) {
            stopAudio(key);
        }
    }
}

// Event listener for the slider input
volume.addEventListener("input", (e) => {
    const sliderValue = e.currentTarget.value / 100;

    // Set volumes based on slider position for each audio element
    audioStates['audio1'].volume = 1 - sliderValue;  // Switched the volumes
    audioStates['audio2'].volume = sliderValue;
});

// Play button click event
play.addEventListener("click", () => {
    let isPlaying = false;

    for (const key in audioStates) {
        if (audioStates.hasOwnProperty(key)) {
            const audio = audioStates[key];
            if (audio.isPaused) {
                audio.play();
                audio.isPaused = false;
                isPlaying = true;
            } else {
                audio.pause();
                audio.isPaused = true;
            }
        }
    }

    if (isPlaying) {
        for (const key in audioStates) {
            if (audioStates.hasOwnProperty(key)) {
                stopAudio(key);
            }
        }
    }
});