import subprocess
import os
import shutil

def main():
    print("=== Continuum DX Master Keynote Production: Audio Remaster & Video Assembly ===")
    
    workspace = "/app/applet"
    voice_path = f"{workspace}/public/assets/aistudio/Record__online-voice-recorder.com__continuum_9a22d7ac.mp3"
    score_path = f"{workspace}/public/assets/aistudio/ES_Awake_My_Dreams_-_Edgar_Hopp_1a54d251.mp3"
    
    out_audio_public = f"{workspace}/public/assets/audio/the_space_between_master_keynote.mp3"
    out_audio_root = f"{workspace}/assets/audio/the_space_between_master_keynote.mp3"
    
    out_video_public = f"{workspace}/public/assets/videos/the_space_between_keynote_film.mp4"
    out_video_root = f"{workspace}/assets/videos/the_space_between_keynote_film.mp4"
    out_video_dist = f"{workspace}/dist/assets/videos/the_space_between_keynote_film.mp4"
    
    # 1. Master Audio Mix (Full Dynamic Range, Loudness Normalized to -13.5 LUFS)
    # Voice: highpass at 80Hz, 3.2kHz vocal presence boost, gentle compression
    # Music: sidechain ducking controlled by Sean's voice (seamless swells during pauses and intro/outro)
    # Master: loudnorm to -13.5 LUFS, True Peak -0.9 dB
    print("\n[Step 1/3] Remastering Master Audio Track...")
    filter_complex = (
        "[0:a]highpass=f=80,equalizer=f=3200:t=q:w=1.2:g=2.5,acompressor=threshold=-16dB:ratio=2.5:attack=10:release=100,asplit=2[v_mix][v_sc];"
        "[1:a]volume=0.75[m_base];"
        "[m_base][v_sc]sidechaincompress=threshold=0.05:ratio=3.5:attack=30:release=500[m_ducked];"
        "[v_mix][m_ducked]amix=inputs=2:duration=first:dropout_transition=2[mixed];"
        "[mixed]loudnorm=I=-13.5:LRA=6:TP=-0.9[out]"
    )
    
    cmd_audio = [
        "ffmpeg", "-y",
        "-i", voice_path,
        "-i", score_path,
        "-filter_complex", filter_complex,
        "-map", "[out]",
        "-c:a", "libmp3lame", "-b:a", "320k",
        out_audio_public
    ]
    
    res = subprocess.run(cmd_audio, capture_output=True, text=True)
    if res.returncode != 0:
        print("Audio mix failed:", res.stderr)
        return False
    print("Master audio successfully rendered to:", out_audio_public)
    shutil.copy2(out_audio_public, out_audio_root)
    print("Mirrored audio to root assets:", out_audio_root)
    
    # Verify Audio Loudness
    cmd_check = ["ffmpeg", "-i", out_audio_public, "-af", "volumedetect", "-f", "null", "/dev/null"]
    chk = subprocess.run(cmd_check, capture_output=True, text=True)
    for line in chk.stderr.splitlines():
        if "mean_volume" in line or "max_volume" in line:
            print("  Audio check:", line.strip())
            
    # 2. Cinema Video Assembly
    print("\n[Step 2/3] Assembling 1080p Cinema Video Film...")
    img_dir = f"{workspace}/public/assets/commercial"
    scenes = [
        {"img": f"{img_dir}/boardroom_monolith.jpg", "duration": 7},    # 0:00 - 0:07 (Intro)
        {"img": f"{img_dir}/scene1_the_trap.jpg", "duration": 32},       # 0:07 - 0:39 (Act I The Commodity Trap)
        {"img": f"{img_dir}/scene2_the_friction.jpg", "duration": 36},   # 0:39 - 1:15 (Act II Torpedoed Whale)
        {"img": f"{img_dir}/skybridge_dawn.jpg", "duration": 25},        # 1:15 - 1:40 (Act III The Space Between)
        {"img": f"{img_dir}/scene3_the_architecture.jpg", "duration": 25},# 1:40 - 2:05 (Act III Control Plane)
        {"img": f"{img_dir}/warroom_telemetry.jpg", "duration": 22},     # 2:05 - 2:27 (Act IV Operating Moat)
        {"img": f"{img_dir}/scene4_the_payoff.jpg", "duration": 18},     # 2:27 - 2:45 (Act V Continuum Mandate)
    ]
    
    concat_txt = "/tmp/keynote_scenes_master.txt"
    with open(concat_txt, "w") as f:
        for s in scenes:
            f.write(f"file '{s['img']}'\n")
            f.write(f"duration {s['duration']}\n")
        # Final image repeat for ffmpeg concat demuxer boundary
        f.write(f"file '{scenes[-1]['img']}'\n")
        
    cmd_video = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", concat_txt,
        "-i", out_audio_public,
        "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "19",
        "-c:a", "aac", "-b:a", "256k",
        "-shortest",
        out_video_public
    ]
    
    res_vid = subprocess.run(cmd_video, capture_output=True, text=True)
    if res_vid.returncode != 0:
        print("Video render failed:", res_vid.stderr)
        return False
        
    print(f"Keynote video film rendered to: {out_video_public} ({os.path.getsize(out_video_public)} bytes)")
    shutil.copy2(out_video_public, out_video_root)
    os.makedirs(os.path.dirname(out_video_dist), exist_ok=True)
    shutil.copy2(out_video_public, out_video_dist)
    print("Mirrored video to root assets and dist!")
    
    # 3. Verify Video Loudness
    print("\n[Step 3/3] Verifying Output Video Audio Levels...")
    cmd_check_vid = ["ffmpeg", "-i", out_video_public, "-af", "volumedetect", "-f", "null", "/dev/null"]
    chk_vid = subprocess.run(cmd_check_vid, capture_output=True, text=True)
    for line in chk_vid.stderr.splitlines():
        if "mean_volume" in line or "max_volume" in line:
            print("  Video audio check:", line.strip())
            
    print("\n=== Master Keynote Production Complete! High Volume, Cinema Clarity Locked. ===")
    return True

if __name__ == "__main__":
    main()
