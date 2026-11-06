const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Compiling Loretta-tier commercial film: "The Space Between"...');

const commercialDir = path.join(__dirname, '../public/assets/commercial');
const videoDir = path.join(__dirname, '../public/assets/videos');
const audioPath = path.join(__dirname, '../public/assets/audio/the_space_between_score.wav');

if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

const s1 = path.join(commercialDir, 'scene1_the_trap.jpg');
const s2 = path.join(commercialDir, 'scene2_the_friction.jpg');
const s3 = path.join(commercialDir, 'scene3_the_architecture.jpg');
const s4 = path.join(commercialDir, 'scene4_the_payoff.jpg');

const mp4Out = path.join(videoDir, 'continuum_commercial_loretta.mp4');
const webmOut = path.join(videoDir, 'continuum_commercial_loretta.webm');
const heroMp4 = path.join(videoDir, 'continuum_hero_ambient.mp4');
const heroWebm = path.join(videoDir, 'continuum_hero_ambient.webm');

// 4 scenes x 4.5s each with 0.5s crossfade = exactly 16.0s!
// Scene 1: Slow dolly push-in on executive (zoom 1.0 -> 1.14)
// Scene 2: Lateral pan across messy glass partition (zoom 1.08 with x-panning)
// Scene 3: Rack focus zoom toward cobalt monitor (zoom 1.0 -> 1.12)
// Scene 4: Golden hour breathing pan & settle (zoom 1.06 -> 1.00)
const ffmpegCmd = `ffmpeg -y \\
  -loop 1 -t 4.5 -i "${s1}" \\
  -loop 1 -t 4.5 -i "${s2}" \\
  -loop 1 -t 4.5 -i "${s3}" \\
  -loop 1 -t 4.5 -i "${s4}" \\
  -i "${audioPath}" \\
  -filter_complex "\\
    [0:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0007,1.14)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=24,eq=contrast=1.12:brightness=-0.02:saturation=0.88[v0]; \\
    [1:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='1.10':x='(on/108)*(iw-iw/zoom)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=24,eq=contrast=1.08:brightness=-0.01:saturation=0.92[v1]; \\
    [2:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0006,1.12)':x='iw/3-(iw/zoom/3)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=24,eq=contrast=1.15:brightness=-0.02:saturation=0.95[v2]; \\
    [3:v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='max(1.10-0.0006*on,1.0)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=24,eq=contrast=1.06:brightness=0.01:saturation=1.02[v3]; \\
    [v0][v1]xfade=transition=fade:duration=0.5:offset=4.0[x01]; \\
    [x01][v2]xfade=transition=fade:duration=0.5:offset=8.0[x02]; \\
    [x02][v3]xfade=transition=fade:duration=0.5:offset=12.0[vx]; \\
    [vx]format=yuv420p[vout]; \\
    [4:a]afade=t=in:ss=0:d=0.8,afade=t=out:st=15.2:d=0.8[aout]\\
  " \\
  -map "[vout]" -map "[aout]" -t 16 -c:v libx264 -preset medium -crf 20 -c:a aac -b:a 192k -movflags +faststart "${mp4Out}"`;

console.log('Rendering high-bitrate commercial MP4...');
try {
  execSync(ffmpegCmd, { stdio: 'inherit' });
  console.log('Loretta Commercial Film rendered successfully:', mp4Out);

  // Copy to hero ambient video so background hero immediately benefits
  fs.copyFileSync(mp4Out, heroMp4);
  console.log('Updated hero ambient MP4');

  // Render WebM for cross-browser fallback
  console.log('Rendering WebM version...');
  execSync(`ffmpeg -y -i "${mp4Out}" -c:v libvpx-vp9 -b:v 1.5M -crf 28 -c:a libopus -b:a 128k "${webmOut}"`, { stdio: 'inherit' });
  fs.copyFileSync(webmOut, heroWebm);
  console.log('Updated hero ambient WebM');
} catch (err) {
  console.error('Error compiling film:', err.message);
  process.exit(1);
}
