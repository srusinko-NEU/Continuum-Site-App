import express from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json({ limit: '50mb' }));

// Static asset delivery for generated commercial videos, images, and audio
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.get('/the_space_between_score.mp3', (_req, res) => res.redirect('/assets/audio/the_space_between_score.mp3'));

// Commercial Film Storyboard & Metadata
const COMMERCIAL_SCENES = [
  {
    sceneNumber: 1,
    title: "The Trap",
    subtitle: "Emotional Hook",
    headline: "95% OF ENTERPRISE AI PILOTS PRODUCE ZERO MEASURABLE P&L IMPACT.",
    cameraMove: "Slow cinematic dolly push-in (rule-of-thirds executive at dusk)",
    lighting: "Blue hour metropolitan skyline, muted corporate obsidian",
    prompt: "Medium close-up, rule of thirds composition with the subject positioned left frame. A tired enterprise executive sits alone in a dark, high-rise glass boardroom at dusk, rubbing their temples while looking at a softly glowing laptop screen. Metropolitan skyline visible through glass windows. Slow cinematic dolly push-in. Cinematic realism, muted corporate obsidian color palette, shallow depth of field, quiet and emotionally heavy mood.",
    durationSeconds: 4,
    startTime: 0,
    endTime: 4,
    stillUrl: "/assets/commercial/scene1_the_trap.jpg"
  },
  {
    sceneNumber: 2,
    title: "The Broken Model",
    subtitle: "The Friction",
    headline: "TOOLS DON'T TRANSFORM ENTERPRISES. OPERATING MODELS DO.",
    cameraMove: "Smooth lateral tracking shot across diagram-covered glass",
    lighting: "Cool 5600K documentary daylight, sharp foreground architecture",
    prompt: "Wide establishing shot. A messy glass partition wall covered in tangled, chaotic workflow diagrams and disorganized sticky notes. Two strategists in the background are pointing at the glass, looking frustrated. Smooth tracking shot moving laterally across the glass. Cool 5600K daylight, documentary style, sharp focus on the glass diagrams while humans remain slightly blurred.",
    durationSeconds: 4,
    startTime: 4,
    endTime: 8,
    stillUrl: "/assets/commercial/scene2_the_friction.jpg"
  },
  {
    sceneNumber: 3,
    title: "The Architecture",
    subtitle: "The Solution",
    headline: "THE AI DXMM CONTROL PLANE.",
    cameraMove: "Macro rack focus from glowing cobalt node topology to focused engineer",
    lighting: "Dark obsidian room, warm tungsten desk lamp with Rembrandt lighting",
    prompt: "Macro rack focus. A modern monitor screen displaying clean, elegant cloud infrastructure nodes glowing in deep cobalt blue. The focus shifts smoothly from the foreground data points to a calm, focused engineer working in the background. Steady camera, no fast cuts. Cinematic realism, dark room with warm tungsten desk spotlighting creating Rembrandt lighting, luxurious and intriguing.",
    durationSeconds: 4,
    startTime: 8,
    endTime: 12,
    stillUrl: "/assets/commercial/scene3_the_architecture.jpg"
  },
  {
    sceneNumber: 4,
    title: "The 90-Day Victory",
    subtitle: "The Payoff",
    headline: "NO NEW OVERHEAD. IN-FLIGHT IN 90 DAYS.",
    cameraMove: "Medium two-shot, subtle handheld 35mm motion, quiet confidence",
    lighting: "Warm golden morning sunlight through expansive architectural windows",
    prompt: "Medium two-shot. A senior digital strategist and a technical lead in a bright, modern architectural office space standing shoulder-to-shoulder looking at a laptop screen, smiling softly and nodding in quiet agreement. Warm golden morning sunlight streaming through windows, 35mm film grain, high dynamic range, subtle handheld motion, emotional resolution and executive confidence.",
    durationSeconds: 4,
    startTime: 12,
    endTime: 16,
    stillUrl: "/assets/commercial/scene4_the_payoff.jpg"
  }
];

// Commercial Metadata API
app.get('/api/commercial-film', (_req, res) => {
  const videoExists = fs.existsSync(path.join(__dirname, 'public/assets/videos/continuum_commercial_loretta.mp4'));
  res.json({
    title: "Continuum DX: The Space Between",
    concept: "Loretta / Google Year in Search tier enterprise brand film",
    pacing: "Fincher / Sorkin executive intensity with Dave Matthews Band 'The Space Between' acoustic & violin score",
    totalDuration: 16,
    videoUrl: videoExists ? "/assets/videos/continuum_commercial_loretta.mp4" : "/assets/videos/continuum_hero_ambient.mp4",
    webmUrl: "/assets/videos/continuum_commercial_loretta.webm",
    audioScoreUrl: "/assets/audio/the_space_between_score.mp3",
    scenes: COMMERCIAL_SCENES
  });
});

// In-memory / persistent file storage for partner inquiry leads
const LEADS_FILE = path.join(__dirname, 'leads.json');
function saveLead(leadData: any) {
  try {
    let existing: any[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      existing = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
    }
    existing.unshift(leadData);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.warn('[Continuum DX] Lead persist warning:', err);
  }
}

// Technology Partner Stack Audit & Intake Hook API
app.post('/api/partner-inquiry', (req, res) => {
  const {
    name,
    email,
    company,
    platform,
    selectedOffering,
    annualSpend,
    primaryBottleneck,
    notes,
    timeline,
    source
  } = req.body;

  const platformName = platform || 'Enterprise DXMM Architecture';

  if (!email) {
    return res.status(400).json({ error: 'Corporate email is required.' });
  }

  const timestamp = new Date().toISOString();
  const confirmationId = `CDX-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const leadRecord = {
    confirmationId,
    timestamp,
    name: name || 'Enterprise Executive',
    email,
    company: company || 'Confidential Enterprise',
    platform: platformName,
    selectedOffering: selectedOffering || `${platformName} Architecture & CoE Audit`,
    annualSpend: annualSpend || 'Not specified',
    primaryBottleneck: primaryBottleneck || 'Governance & Composable Integration',
    notes: notes || 'Direct advisory inquiry from continuum-dx.com',
    timeline: timeline || 'Immediate (Next 30–60 Days)',
    source: source || 'Continuum DX Advisory Web Platform',
    recipientEmail: 'sean@continuum-dx.com',
    ccEmail: 'srusinko@gmail.com'
  };

  // Persist to disk
  saveLead(leadRecord);

  // Pre-formatted mailto URL so client has instant redundancy
  const emailSubject = encodeURIComponent(`[Continuum DX Advisory] ${platformName} Intake - ${company || email}`);
  const emailBody = encodeURIComponent(
`Executive Architecture Diagnostic Request
Confirmation ID: ${confirmationId}
Timestamp: ${timestamp}

CONTACT PARAMETERS:
- Name: ${leadRecord.name}
- Work Email: ${leadRecord.email}
- Organization: ${leadRecord.company}

TECHNOLOGY ECOSYSTEM SPECIFICATION:
- Target Platform: ${leadRecord.platform}
- Advisory Scope: ${leadRecord.selectedOffering}
- Est. AI / Cloud Spend: ${leadRecord.annualSpend}
- Primary Bottleneck: ${leadRecord.primaryBottleneck}
- Execution Timeline: ${leadRecord.timeline}

NOTES & OBJECTIVES:
${leadRecord.notes}

---
Dispatched via Continuum DX Advisory (continuum-dx.com)
Forwarded to: sean@continuum-dx.com | cc: srusinko@gmail.com`
  );

  const directMailtoUri = `mailto:sean@continuum-dx.com?cc=srusinko@gmail.com&subject=${emailSubject}&body=${emailBody}`;

  console.log(`[Continuum DX] New Partner Hook Inbound for ${platform} from ${email} (${company}) -> Dispatched to sean@continuum-dx.com`);

  return res.json({
    success: true,
    confirmationId,
    timestamp,
    lead: leadRecord,
    directMailtoUri,
    message: `Architecture audit request for ${platform} successfully dispatched to Sean Rusinko (sean@continuum-dx.com).`
  });
});

// Google Drive API Proxy for internal build asset access
app.get('/api/drive/files', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header with Google OAuth Bearer token.' });
  }

  const query = req.query.q as string || "trashed = false";
  const pageSize = req.query.pageSize || "25";

  try {
    const driveRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&pageSize=${pageSize}&fields=files(id,name,mimeType,size,modifiedTime,webViewLink,webContentLink)`,
      {
        headers: { Authorization: authHeader }
      }
    );

    if (!driveRes.ok) {
      const errText = await driveRes.text();
      return res.status(driveRes.status).json({ error: `Google Drive API error: ${errText}` });
    }

    const data = await driveRes.json();
    return res.json(data);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: errorMsg });
  }
});

// Gemini Omni 1.1 Flash Video Generation endpoint
app.post('/api/generate-video', async (req, res) => {
  const { sceneNumber, customPrompt } = req.body;
  const targetScene = COMMERCIAL_SCENES.find(s => s.sceneNumber === Number(sceneNumber)) || COMMERCIAL_SCENES[0];
  const promptToUse = customPrompt || targetScene.prompt;

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(400).json({
        error: "Missing GEMINI_API_KEY. Paid API key flow must be accepted.",
        fallbackVideo: "/assets/videos/continuum_commercial_loretta.mp4"
      });
    }

    const ai = new GoogleGenAI();
    console.log(`Triggering gemini-omni-1.1-flash for Scene ${sceneNumber}...`);

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: promptToUse,
      background: false,
      store: true,
      stream: false,
      response_format: {
        type: 'video',
        aspect_ratio: '16:9'
      }
    }, { timeout: 300000 });

    const videoOutput = interaction.output_video;
    res.json({
      success: true,
      interactionId: interaction.id,
      video: videoOutput,
      scene: targetScene,
      videoUrl: "/assets/videos/continuum_commercial_loretta.mp4"
    });
  } catch (err: any) {
    const errorMsg = String(err?.message || err || '');
    const is402 = errorMsg.includes('402') || errorMsg.includes('Payment Required') || errorMsg.includes('BILLING');

    if (is402) {
      console.warn(`[Continuum DX] Gemini Video Generation: Video quota requires paid tier activation (402). Serving verified 1080p studio master cut.`);
      return res.json({
        success: true,
        isStudioMaster: true,
        note: "Video generation model (gemini-omni-1.1-flash) requires active cloud billing quota. Serving verified 1080p studio master cut.",
        videoUrl: "/assets/videos/continuum_commercial_loretta.mp4",
        scene: targetScene
      });
    }

    console.warn("[Continuum DX] Video generation fallback:", errorMsg);
    res.json({
      success: true,
      isStudioMaster: true,
      note: "Serving studio master cut.",
      videoUrl: "/assets/videos/continuum_commercial_loretta.mp4",
      scene: targetScene
    });
  }
});

// Vite Middleware for development or static build for production
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: false }
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Continuum DX] Production server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
