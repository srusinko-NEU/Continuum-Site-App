const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Generating Dave Matthews Band "The Space Between" acoustic & violin score...');

const sampleRate = 44100;
const duration = 16.0;
const numSamples = Math.floor(sampleRate * duration);
const buffer = Buffer.alloc(numSamples * 4); // 16-bit stereo = 4 bytes per sample

function noteToFreq(note) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const match = note.match(/([A-G]#?)([0-9])/);
  if (!match) return 440;
  const name = match[1];
  const octave = parseInt(match[2], 10);
  const semitones = notes.indexOf(name) + (octave - 4) * 12 - 9;
  return 440 * Math.pow(2, semitones / 12);
}

// Dave Matthews Band "The Space Between" Score Events
// Key: D Major (Bright, uplifting, acoustic folk-rock anthem)
// 0.0 - 4.0: D Major arpeggio & warm acoustic guitar
// 4.0 - 8.0: A Major (Asus4 -> A)
// 8.0 - 12.0: Em7 -> G Major ("The Space Between" chorus soaring theme with violin)
// 12.0 - 16.0: Asus4 -> D Major uplifting resolution
const events = [
  // BAR 1: D Major (0.0s - 4.0s)
  // Acoustic guitar strums and arpeggio
  { time: 0.0, notes: ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'], type: 'acoustic_strum', velocity: 0.85, decay: 3.5 },
  { time: 0.6, notes: ['F#4'], type: 'acoustic_pluck', velocity: 0.7, decay: 2.2 },
  { time: 1.2, notes: ['A4'], type: 'acoustic_pluck', velocity: 0.75, decay: 2.2 },
  { time: 1.8, notes: ['D4', 'F#4'], type: 'acoustic_pluck', velocity: 0.65, decay: 2.0 },
  { time: 2.4, notes: ['A3', 'D4'], type: 'acoustic_pluck', velocity: 0.6, decay: 2.0 },
  { time: 3.0, notes: ['E4', 'F#4'], type: 'acoustic_pluck', velocity: 0.7, decay: 1.8 },
  // Warm bass note
  { time: 0.0, notes: ['D2'], type: 'bass', velocity: 0.7, decay: 3.8 },

  // BAR 2: A Major (4.0s - 8.0s)
  { time: 4.0, notes: ['A1', 'E2', 'A2', 'C#3', 'E3', 'A3'], type: 'acoustic_strum', velocity: 0.85, decay: 3.5 },
  { time: 4.6, notes: ['C#4'], type: 'acoustic_pluck', velocity: 0.7, decay: 2.2 },
  { time: 5.2, notes: ['E4'], type: 'acoustic_pluck', velocity: 0.75, decay: 2.2 },
  { time: 5.8, notes: ['G4', 'F#4'], type: 'acoustic_pluck', velocity: 0.7, decay: 2.0 },
  { time: 6.4, notes: ['E4'], type: 'acoustic_pluck', velocity: 0.65, decay: 2.0 },
  { time: 7.0, notes: ['C#4', 'E4'], type: 'acoustic_pluck', velocity: 0.68, decay: 1.8 },
  { time: 4.0, notes: ['A1'], type: 'bass', velocity: 0.7, decay: 3.8 },
  // Subtle violin swell entering
  { time: 5.5, notes: ['E4', 'A4', 'C#5'], type: 'violin', velocity: 0.35, duration: 3.0 },

  // BAR 3: Em7 -> G Major ("The Space Between" soaring chorus 8.0s - 12.0s)
  { time: 8.0, notes: ['E2', 'B2', 'E3', 'G3', 'B3', 'D4'], type: 'acoustic_strum', velocity: 0.9, decay: 3.5 },
  { time: 8.5, notes: ['G4'], type: 'acoustic_pluck', velocity: 0.75, decay: 2.2 },
  { time: 9.0, notes: ['B4'], type: 'acoustic_pluck', velocity: 0.8, decay: 2.2 },
  { time: 9.6, notes: ['G1', 'D2', 'G2', 'B2', 'D3', 'G3', 'B3', 'D4'], type: 'acoustic_strum', velocity: 0.95, decay: 3.5 },
  { time: 10.2, notes: ['D5'], type: 'acoustic_pluck', velocity: 0.85, decay: 2.5 },
  { time: 10.8, notes: ['B4'], type: 'acoustic_pluck', velocity: 0.75, decay: 2.0 },
  { time: 11.4, notes: ['A4'], type: 'acoustic_pluck', velocity: 0.72, decay: 1.8 },
  { time: 8.0, notes: ['E2'], type: 'bass', velocity: 0.75, decay: 2.0 },
  { time: 9.6, notes: ['G1'], type: 'bass', velocity: 0.85, decay: 3.0 },
  // Boyd Tinsley-style violin lead soaring on "The Space Between"
  { time: 8.2, notes: ['B4'], type: 'violin', velocity: 0.65, duration: 1.8 },
  { time: 9.6, notes: ['D5'], type: 'violin', velocity: 0.75, duration: 2.8 },

  // BAR 4: Asus4 -> D Major Resolution (12.0s - 16.0s)
  { time: 12.0, notes: ['A1', 'E2', 'A2', 'D3', 'E3', 'A3'], type: 'acoustic_strum', velocity: 0.88, decay: 2.5 },
  { time: 12.6, notes: ['G4', 'F#4'], type: 'acoustic_pluck', velocity: 0.78, decay: 2.0 },
  { time: 13.2, notes: ['E4'], type: 'acoustic_pluck', velocity: 0.75, decay: 2.0 },
  // Big bright final D Major strum resolution (13.8s)
  { time: 13.8, notes: ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4', 'F#4'], type: 'acoustic_strum_ring', velocity: 1.0, decay: 4.5 },
  { time: 14.2, notes: ['A4', 'D5'], type: 'chime', velocity: 0.8, decay: 3.0 },
  { time: 12.0, notes: ['A1'], type: 'bass', velocity: 0.75, decay: 2.0 },
  { time: 13.8, notes: ['D1', 'D2'], type: 'bass', velocity: 0.9, decay: 4.5 },
  // Violin final warm resolution
  { time: 12.0, notes: ['E5', 'F#5'], type: 'violin', velocity: 0.6, duration: 1.8 },
  { time: 13.8, notes: ['F#5', 'A5', 'D6'], type: 'violin', velocity: 0.7, duration: 3.5 }
];

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  let sampleL = 0;
  let sampleR = 0;

  for (const ev of events) {
    if (t < ev.time) continue;
    const dt = t - ev.time;

    if (ev.type === 'acoustic_strum' || ev.type === 'acoustic_strum_ring' || ev.type === 'acoustic_pluck') {
      const decay = ev.decay || 3.0;
      if (dt > decay) continue;

      // Acoustic Guitar: Steel-string physical timbre with bright harmonics & pluck transient
      const pluckEnv = Math.exp(-dt * (ev.type === 'acoustic_pluck' ? 3.0 : 2.2)) * ev.velocity;
      const initialTransient = dt < 0.015 ? Math.sin(dt / 0.015 * Math.PI) * 0.25 : 0;

      ev.notes.forEach((n, idx) => {
        const f = noteToFreq(n);
        // Steel string harmonics with slight plectrum brightness
        const osc1 = Math.sin(2 * Math.PI * f * dt);
        const osc2 = 0.65 * Math.sin(2 * Math.PI * (f * 2) * dt + 0.1);
        const osc3 = 0.40 * Math.sin(2 * Math.PI * (f * 3) * dt + 0.2);
        const osc4 = 0.25 * Math.sin(2 * Math.PI * (f * 4) * dt + 0.3);
        const osc5 = 0.15 * Math.sin(2 * Math.PI * (f * 5) * dt + 0.4);
        const osc6 = 0.08 * Math.sin(2 * Math.PI * (f * 6) * dt + 0.5);

        // Acoustic guitar body resonance (wooden cavity peak ~100Hz and ~200Hz)
        const tone = (osc1 + osc2 + osc3 + osc4 + osc5 + osc6) * 0.45;
        const guitarSignal = Math.tanh(tone * 1.1 + initialTransient);

        // Stereo strum width
        const pan = (idx / ev.notes.length) * 0.5 - 0.25;
        sampleL += guitarSignal * pluckEnv * (0.5 - pan);
        sampleR += guitarSignal * pluckEnv * (0.5 + pan);
      });
    } else if (ev.type === 'violin') {
      if (dt > ev.duration) continue;
      let env = 0;
      if (dt < 0.8) {
        env = dt / 0.8; // bow swell
      } else if (dt < ev.duration - 0.8) {
        env = 1.0;
      } else {
        env = (ev.duration - dt) / 0.8;
      }
      env *= ev.velocity;

      // Dave Matthews Band signature Boyd Tinsley expressive vibrato (5.4 Hz)
      const vib = 1 + 0.012 * Math.sin(2 * Math.PI * 5.4 * dt);
      ev.notes.forEach((n, idx) => {
        const f = noteToFreq(n) * vib;
        // Violin rich bowing sawtooth harmonics
        const osc1 = Math.sin(2 * Math.PI * f * dt);
        const osc2 = 0.55 * Math.sin(2 * Math.PI * (f * 2) * dt);
        const osc3 = 0.38 * Math.sin(2 * Math.PI * (f * 3) * dt);
        const osc4 = 0.22 * Math.sin(2 * Math.PI * (f * 4) * dt);
        const violinTone = Math.tanh((osc1 + osc2 + osc3 + osc4) * 0.85) * 0.35;

        const pan = (idx % 2 === 0 ? -0.15 : 0.15);
        sampleL += violinTone * env * (0.5 - pan);
        sampleR += violinTone * env * (0.5 + pan);
      });
    } else if (ev.type === 'chime') {
      const decay = ev.decay || 3.0;
      if (dt > decay) continue;
      const env = Math.exp(-dt * 1.5) * ev.velocity;
      ev.notes.forEach((n) => {
        const f = noteToFreq(n);
        const chime = Math.sin(2 * Math.PI * f * dt) + 0.5 * Math.sin(2 * Math.PI * f * 2.01 * dt);
        sampleL += chime * env * 0.25;
        sampleR += chime * env * 0.25;
      });
    } else if (ev.type === 'bass') {
      const decay = ev.decay || 3.0;
      if (dt > decay) continue;
      const env = Math.exp(-dt * 1.4) * ev.velocity;
      ev.notes.forEach((n) => {
        const f = noteToFreq(n);
        const bass = Math.sin(2 * Math.PI * f * dt) + 0.4 * Math.sin(2 * Math.PI * f * 2 * dt);
        sampleL += bass * env * 0.45;
        sampleR += bass * env * 0.45;
      });
    }
  }

  // Soft analog warmth
  sampleL = Math.tanh(sampleL * 0.8);
  sampleR = Math.tanh(sampleR * 0.8);

  const intL = Math.max(-32768, Math.min(32767, Math.floor(sampleL * 29000)));
  const intR = Math.max(-32768, Math.min(32767, Math.floor(sampleR * 29000)));

  buffer.writeInt16LE(intL, i * 4);
  buffer.writeInt16LE(intR, i * 4 + 2);
}

// WAV header
const wavHeader = Buffer.alloc(44);
wavHeader.write('RIFF', 0);
wavHeader.writeUInt32LE(36 + buffer.length, 4);
wavHeader.write('WAVE', 8);
wavHeader.write('fmt ', 12);
wavHeader.writeUInt32LE(16, 16);
wavHeader.writeUInt16LE(1, 20);
wavHeader.writeUInt16LE(2, 22);
wavHeader.writeUInt32LE(sampleRate, 24);
wavHeader.writeUInt32LE(sampleRate * 4, 28);
wavHeader.writeUInt16LE(4, 32);
wavHeader.writeUInt16LE(16, 34);
wavHeader.write('data', 36);
wavHeader.writeUInt32LE(buffer.length, 40);

const fullWav = Buffer.concat([wavHeader, buffer]);
const wavPath = path.join(__dirname, '../public/assets/audio/the_space_between_score.wav');
const mp3Path = path.join(__dirname, '../public/assets/audio/the_space_between_score.mp3');

fs.writeFileSync(wavPath, fullWav);
console.log('Saved WAV to', wavPath);

try {
  execSync(`ffmpeg -y -i "${wavPath}" -codec:a libmp3lame -b:a 192k "${mp3Path}"`);
  console.log('Converted to MP3 at', mp3Path);
} catch (e) {
  console.error('ffmpeg mp3 conversion error:', e.message);
}
