const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Generating audio score: The Space Between...');

// 1. Generate 16s audio track (44.1kHz, 16-bit stereo)
const sampleRate = 44100;
const duration = 16.0;
const numSamples = Math.floor(sampleRate * duration);
const buffer = Buffer.alloc(numSamples * 4); // 16-bit stereo = 4 bytes per sample

// Helper for frequencies
function noteToFreq(note) {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const match = note.match(/([A-G]#?)([0-9])/);
  if (!match) return 440;
  const name = match[1];
  const octave = parseInt(match[2], 10);
  const semitones = notes.indexOf(name) + (octave - 4) * 12 - 9; // A4 is index 9 in octave 4
  return 440 * Math.pow(2, semitones / 12);
}

// Chords timeline
// 0.0 - 4.0: Cm9 [C2, G2, Eb3, G3, Bb3, D4]
// 4.0 - 8.0: Abmaj7 [Ab1, Eb2, C3, G3, C4]
// 8.0 - 12.0: Ebadd9 [Eb2, Bb2, G3, Bb3, F4] with cello swelling
// 12.0 - 16.0: Bb/D -> Cm [D2, Bb2, F3, Bb3, D4] -> [C2, G2, Eb3, G3, C4] with resonant chime at 14.0s

const events = [
  // Chord 1: 0.0s
  { time: 0.0, notes: ['C2', 'G2', 'Eb3', 'G3', 'Bb3', 'D4'], type: 'piano', velocity: 0.7, decay: 4.5 },
  { time: 1.5, notes: ['G4', 'Bb4'], type: 'piano', velocity: 0.45, decay: 3.0 },
  
  // Chord 2: 4.0s
  { time: 4.0, notes: ['Ab1', 'Eb2', 'C3', 'G3', 'C4', 'Eb4'], type: 'piano', velocity: 0.72, decay: 4.5 },
  { time: 5.8, notes: ['G4', 'C5'], type: 'piano', velocity: 0.48, decay: 3.0 },

  // Chord 3: 8.0s
  { time: 8.0, notes: ['Eb2', 'Bb2', 'G3', 'Bb3', 'F4'], type: 'piano', velocity: 0.75, decay: 4.5 },
  { time: 9.5, notes: ['G4', 'Bb4', 'D5'], type: 'piano', velocity: 0.5, decay: 3.2 },

  // Cello swell: 7.5s - 14.5s
  { time: 7.5, notes: ['Eb2', 'Bb2', 'G3'], type: 'cello', velocity: 0.55, duration: 6.5 },

  // Chord 4: 12.0s
  { time: 12.0, notes: ['D2', 'Bb2', 'F3', 'Bb3', 'D4'], type: 'piano', velocity: 0.7, decay: 4.0 },
  
  // Resonant strike: 14.0s
  { time: 14.0, notes: ['C2', 'G2', 'Eb3', 'G3', 'C4', 'Eb4', 'G4', 'C5'], type: 'piano_strike', velocity: 0.85, decay: 2.8 },
  { time: 14.0, notes: ['C1', 'C2'], type: 'bass_sub', velocity: 0.6, decay: 3.5 }
];

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  let sampleL = 0;
  let sampleR = 0;

  for (const ev of events) {
    if (t < ev.time) continue;
    const dt = t - ev.time;

    if (ev.type === 'piano' || ev.type === 'piano_strike') {
      const decay = ev.decay || 3.0;
      if (dt > decay) continue;
      // Exponential decay envelope with felt warmth
      const env = Math.exp(-dt * (ev.type === 'piano_strike' ? 1.4 : 1.8)) * ev.velocity;
      
      ev.notes.forEach((n, idx) => {
        const f = noteToFreq(n);
        // Felt piano: fundamental + warm 2nd & 3rd harmonics + subtle tape detune
        const osc1 = Math.sin(2 * Math.PI * f * dt);
        const osc2 = 0.35 * Math.sin(2 * Math.PI * (f * 2) * dt);
        const osc3 = 0.12 * Math.sin(2 * Math.PI * (f * 3) * dt);
        const warmth = Math.tanh((osc1 + osc2 + osc3) * 1.2);
        
        // Slight stereo spread per note
        const pan = (idx / ev.notes.length) * 0.4 - 0.2;
        sampleL += warmth * env * (0.5 - pan);
        sampleR += warmth * env * (0.5 + pan);
      });
    } else if (ev.type === 'cello') {
      if (dt > ev.duration) continue;
      // Cello envelope: swell up, hold, swell down
      let env = 0;
      if (dt < 2.0) {
        env = (dt / 2.0); // swell in
      } else if (dt < ev.duration - 1.5) {
        env = 1.0;
      } else {
        env = (ev.duration - dt) / 1.5; // swell out
      }
      env *= ev.velocity;
      
      // Vibrato
      const vib = 1 + 0.008 * Math.sin(2 * Math.PI * 5.2 * dt);
      ev.notes.forEach((n, idx) => {
        const f = noteToFreq(n) * vib;
        // Cello sawtooth-like warmth via rich harmonics
        const osc1 = Math.sin(2 * Math.PI * f * dt);
        const osc2 = 0.5 * Math.sin(2 * Math.PI * (f * 2) * dt + 0.3);
        const osc3 = 0.3 * Math.sin(2 * Math.PI * (f * 3) * dt + 0.6);
        const osc4 = 0.15 * Math.sin(2 * Math.PI * (f * 4) * dt + 0.9);
        const celloTone = Math.tanh((osc1 + osc2 + osc3 + osc4) * 0.9) * 0.4;
        
        sampleL += celloTone * env * 0.55;
        sampleR += celloTone * env * 0.45;
      });
    } else if (ev.type === 'bass_sub') {
      const decay = ev.decay || 3.0;
      if (dt > decay) continue;
      const env = Math.exp(-dt * 1.2) * ev.velocity;
      const f = 32.7; // C1 deep warm sub
      const sub = Math.sin(2 * Math.PI * f * dt) * env * 0.45;
      sampleL += sub;
      sampleR += sub;
    }
  }

  // Gentle analog room ambiance / soft tape hiss (-60dB)
  const roomNoise = (Math.random() * 2 - 1) * 0.0015;
  sampleL += roomNoise;
  sampleR += roomNoise;

  // Soft master limiter / saturation
  sampleL = Math.tanh(sampleL * 0.7);
  sampleR = Math.tanh(sampleR * 0.7);

  // Write 16-bit signed PCM
  const intL = Math.max(-32768, Math.min(32767, Math.floor(sampleL * 30000)));
  const intR = Math.max(-32768, Math.min(32767, Math.floor(sampleR * 30000)));

  buffer.writeInt16LE(intL, i * 4);
  buffer.writeInt16LE(intR, i * 4 + 2);
}

// WAV header
const wavHeader = Buffer.alloc(44);
wavHeader.write('RIFF', 0);
wavHeader.writeUInt32LE(36 + buffer.length, 4);
wavHeader.write('WAVE', 8);
wavHeader.write('fmt ', 12);
wavHeader.writeUInt32LE(16, 16); // PCM
wavHeader.writeUInt16LE(1, 20); // format = 1
wavHeader.writeUInt16LE(2, 22); // channels = 2
wavHeader.writeUInt32LE(sampleRate, 24);
wavHeader.writeUInt32LE(sampleRate * 4, 28); // byte rate
wavHeader.writeUInt16LE(4, 32); // block align
wavHeader.writeUInt16LE(16, 34); // bits per sample
wavHeader.write('data', 36);
wavHeader.writeUInt32LE(buffer.length, 40);

const fullWav = Buffer.concat([wavHeader, buffer]);
const wavPath = path.join(__dirname, '../public/assets/audio/the_space_between_score.wav');
const mp3Path = path.join(__dirname, '../public/assets/audio/the_space_between_score.mp3');

fs.writeFileSync(wavPath, fullWav);
console.log('Saved WAV to', wavPath);

// Convert to MP3
try {
  execSync(`ffmpeg -y -i "${wavPath}" -codec:a libmp3lame -b:a 192k "${mp3Path}"`);
  console.log('Converted to MP3 at', mp3Path);
} catch (e) {
  console.error('ffmpeg mp3 conversion error:', e.message);
}

// 2. Generate 16-second looping video using source images with cinematic zoom & crossfades
console.log('Generating 16s ambient hero video...');

const img1 = path.join(__dirname, '../src/assets/images/architecture_control_room_1790943666093.jpg');
const img2 = path.join(__dirname, '../src/assets/images/dx_executive_war_room_1792644504101.jpg');
const img3 = path.join(__dirname, '../src/assets/images/hero_enterprise_control_plane_1790943651346.jpg');
const img4 = path.join(__dirname, '../src/assets/images/composable_system_nexus_1792644543951.jpg');

const mp4Out = path.join(__dirname, '../public/assets/videos/continuum_hero_ambient.mp4');
const webmOut = path.join(__dirname, '../public/assets/videos/continuum_hero_ambient.webm');

// Create 4-second clips for each image with gentle slow zoom & obsidian color grading, then crossfade them
// 4 clips x 4.5s with 0.5s xfade = exactly 16.0s!
const ffmpegCmd = `ffmpeg -y \\
  -loop 1 -t 4.5 -i "${img1}" \\
  -loop 1 -t 4.5 -i "${img2}" \\
  -loop 1 -t 4.5 -i "${img3}" \\
  -loop 1 -t 4.5 -i "${img4}" \\
  -filter_complex "\\
    [0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0006,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=24,eq=contrast=1.1:brightness=-0.04:saturation=0.8[v0]; \\
    [1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0006,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=24,eq=contrast=1.1:brightness=-0.04:saturation=0.8[v1]; \\
    [2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0006,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=24,eq=contrast=1.1:brightness=-0.04:saturation=0.8[v2]; \\
    [3:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0006,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=24,eq=contrast=1.1:brightness=-0.04:saturation=0.8[v3]; \\
    [v0][v1]xfade=transition=fade:duration=0.5:offset=4.0[x01]; \\
    [x01][v2]xfade=transition=fade:duration=0.5:offset=8.0[x02]; \\
    [x02][v3]xfade=transition=fade:duration=0.5:offset=12.0,format=yuv420p[vout]\\
  " \\
  -map "[vout]" -t 16 -c:v libx264 -preset fast -crf 24 -movflags +faststart "${mp4Out}"`;

console.log('Running ffmpeg video generation...');
try {
  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log('Generated MP4 successfully:', mp4Out);

  // Also create WebM
  execSync(`ffmpeg -y -i "${mp4Out}" -c:v libvpx-vp9 -b:v 1M -crf 32 "${webmOut}"`);
  console.log('Generated WebM successfully:', webmOut);
} catch (e) {
  console.error('Error generating video:', e);
}
