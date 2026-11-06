import fs from 'node:fs';
import crypto from 'node:crypto';

async function fetchRights(clipId) {
  const res = await fetch('https://studio-api.prod.suno.com/api/mango/rights', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Origin': 'https://suno.com',
      'Referer': 'https://suno.com/'
    },
    body: JSON.stringify({
      content_params: {
        content_id: clipId,
        content_type: 'clip'
      }
    })
  });
  if (!res.ok) throw new Error(`Rights fetch failed: ${res.status}`);
  return await res.json();
}

async function decryptSunoTrack(clipId, encryptedAudioPath, outputPath) {
  console.log('Fetching rights for clip:', clipId);
  const rights = await fetchRights(clipId);
  console.log('Rights retrieved. GLT present:', !!rights.glt);

  // 1. SHA-256 of glt
  const gltHash = crypto.createHash('sha256').update(rights.glt).digest();

  // 2. Decrypt key and iv using AES-GCM
  const keyEnc = Buffer.from(rights.key, 'base64');
  const ivEnc = Buffer.from(rights.iv, 'base64');
  const clipIdBytes = Buffer.from(clipId, 'utf-8');

  function decryptGCM(encryptedBuffer) {
    const iv = encryptedBuffer.subarray(0, 12);
    // In WebCrypto: ciphertext includes auth tag at the end (last 16 bytes)
    const dataAndTag = encryptedBuffer.subarray(12);
    const tag = dataAndTag.subarray(dataAndTag.length - 16);
    const ciphertext = dataAndTag.subarray(0, dataAndTag.length - 16);

    const decipher = crypto.createDecipheriv('aes-256-gcm', gltHash, iv);
    decipher.setAAD(clipIdBytes);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  }

  const rawKey = decryptGCM(keyEnc);
  const rawIv = decryptGCM(ivEnc);
  console.log('Raw AES-CTR Key length:', rawKey.length, 'IV length:', rawIv.length);

  // 3. Decrypt the audio file using AES-128-CTR or AES-256-CTR
  const algo = rawKey.length === 16 ? 'aes-128-ctr' : 'aes-256-ctr';
  console.log('Using cipher algo:', algo);

  const encryptedData = fs.readFileSync(encryptedAudioPath);
  const decipherAudio = crypto.createDecipheriv(algo, rawKey, rawIv);
  const decryptedAudio = Buffer.concat([decipherAudio.update(encryptedData), decipherAudio.final()]);

  console.log('Decrypted audio length:', decryptedAudio.length);
  // Detect container
  if (decryptedAudio[0] === 0x1A && decryptedAudio[1] === 0x45 && decryptedAudio[2] === 0xDF && decryptedAudio[3] === 0xA3) {
    console.log('Format detected: WebM / Opus container');
  } else if (decryptedAudio.subarray(4, 8).toString('utf-8') === 'ftyp') {
    console.log('Format detected: MP4 / M4A container');
  } else {
    console.log('Format header:', decryptedAudio.subarray(0, 16));
  }

  fs.writeFileSync(outputPath, decryptedAudio);
  console.log('Saved decrypted audio to:', outputPath);
}

decryptSunoTrack(
  '7af8690f-65d8-4ddc-9833-d5072e2b6bb8',
  'public/assets/audio/the_space_between_keynote_master.m4a',
  'public/assets/audio/the_space_between_keynote_master_decrypted.webm'
).catch(err => {
  console.error('Decryption error:', err);
  process.exit(1);
});
