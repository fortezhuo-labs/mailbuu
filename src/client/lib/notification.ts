let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}


export function playNotificationSound() {
  try {
    const audioCtx = getAudioContext();
    const now = audioCtx.currentTime;

    const play = (freq: number, startTime: number, duration: number, volume = 0.06) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, startTime);
      filter.frequency.exponentialRampToValueAtTime(800, startTime + duration);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.02, startTime + duration * 0.5);

      // attack → sustain → release
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
      gain.gain.setValueAtTime(volume, startTime + duration * 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // dua nada naik — seperti notif modern
    play(620, now,        0.18, 0.05);
    play(820, now + 0.13, 0.22, 0.06);

  } catch (e) {
    // diabaikan jika browser memblokir audio
  }
}