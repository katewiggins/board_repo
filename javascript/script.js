const audioStates = {};

        function toggleAudio(audioSrc, audioId) {
            // Check if the audio is already playing
            if (audioStates[audioId] && audioStates[audioId].isPlaying) {
                stopAudio(audioId);
            } else {
                playAudio(audioSrc, audioId);
            }
        }

        function playAudio(audioSrc, audioId) {
            // Check if the audio is not playing
            if (!audioStates[audioId] || !audioStates[audioId].isPlaying) {
                // Create an audio element if not already present
                if (!audioStates[audioId]) {
                    audioStates[audioId] = new Audio(audioSrc);
                }

                // Stop any other playing audio
                stopAllAudio();

                // Play the audio
                audioStates[audioId].play();
                audioStates[audioId].isPlaying = true;
            }
        }

        function stopAudio(audioId) {
            // Check if the audio is playing
            if (audioStates[audioId] && audioStates[audioId].isPlaying) {
                // Pause and reset the audio
                audioStates[audioId].pause();
                audioStates[audioId].currentTime = 0;
                audioStates[audioId].isPlaying = false;
            }
        }

        function stopAllAudio() {
            // Stop all playing audio
            for (const key in audioStates) {
                if (audioStates.hasOwnProperty(key) && audioStates[key].isPlaying) {
                    stopAudio(key);
                }
            }
        }