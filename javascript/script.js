const audioStates = {};

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll('.button');
    const sliders = document.querySelectorAll('.audio-container input[type="range"]');
    const crossfaderSlider = document.getElementById('crossfader');
    const crossfadeButton = document.querySelector('.faderButton');
    const knob = document.getElementById('knob');
    const indicator = document.getElementById('indicator');

    let isDragging = false;

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            let audioSrc;

            if (index === 0) {
                audioSrc = 'audio/dev_bassdownlow.mp3';
            } else if (index === 1) {
                audioSrc = 'audio/juniorjack_myfeeling.mp3';
            }

            toggleAudio(audioSrc, `audio${index + 1}`, `slider${index + 1}`);
        });
    });

    const button5 = document.getElementById('button5');
    button5.addEventListener("click", function () {
        toggleAudio('audio/bass_high.mp3', 'audio5');
    });

    const button6 = document.getElementById('button6');
    button6.addEventListener("click", function () {
        toggleAudio('audio/jack_low.mp3', 'audio6');
    });

    sliders.forEach((slider, index) => {
        slider.addEventListener("input", (event) => {
            adjustVolume(`audio${index + 1}`, event.target.value);
        });
    });

    crossfadeButton.addEventListener("click", startBothSongs);
    crossfaderSlider.addEventListener("input", updateCrossfadeVolumes);

    knob.addEventListener('mousedown', function (e) {
        isDragging = true;
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', function () {
            isDragging = false;
            document.removeEventListener('mousemove', handleDrag);
        });
    });

    function startBothSongs() {
        const bassAudio = getOrCreateAudio('audio/dev_bassdownlow.mp3', 'audio1', 'slider1');
        const jackAudio = getOrCreateAudio('audio/juniorjack_myfeeling.mp3', 'audio2', 'slider2');

        bassAudio.play();
        jackAudio.play();
    }

    function updateCrossfadeVolumes() {
        const bassAudio = audioStates['audio1'].audio;
        const jackAudio = audioStates['audio2'].audio;

        const crossfadeValue = crossfaderSlider.value / 100;
        const bassVolume = 1 - crossfadeValue;
        const jackVolume = crossfadeValue;

        bassAudio.volume = bassVolume;
        jackAudio.volume = jackVolume;
    }

    function toggleAudio(audioSrc, audioId, sliderId) {
        const audio = getOrCreateAudio(audioSrc, audioId, sliderId);

        if (audio.paused || audio.ended) {
            playAudio(audio);
        } else {
            stopAudio(audio);
        }
    }

    function getOrCreateAudio(audioSrc, audioId, sliderId) {
        if (!audioStates[audioId]) {
            const audio = new Audio(audioSrc);
            audio.volume = 1.0;
            audioStates[audioId] = { audio, sliderId };
        }
        return audioStates[audioId].audio;
    }

    function playAudio(audio) {
        stopAllAudio();
        audio.play();
    }

    function stopAudio(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    function stopAllAudio() {
        for (const key in audioStates) {
            if (audioStates.hasOwnProperty(key)) {
                stopAudio(audioStates[key].audio);
            }
        }
    }

    function adjustVolume(audioId, volume) {
        const audio = audioStates[audioId].audio;
        audio.volume = volume / 100;
    }

    function handleDrag(e) {
    }

});
