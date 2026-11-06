import subprocess
import os

def render_keynote_film():
    print("Starting keynote film assembly...")
    
    # Input audio
    audio_path = "/app/applet/public/assets/audio/the_space_between_master_keynote.mp3"
    output_path = "/app/applet/public/assets/videos/the_space_between_keynote_film.mp4"
    
    # Image scenes
    img_dir = "/app/applet/public/assets/commercial"
    scenes = [
        {"img": f"{img_dir}/boardroom_monolith.jpg", "duration": 7},   # 0:00 - 0:07 (Intro)
        {"img": f"{img_dir}/scene1_the_trap.jpg", "duration": 18},      # 0:07 - 0:25 (Act I Part 1)
        {"img": f"{img_dir}/boardroom_monolith.jpg", "duration": 14},   # 0:25 - 0:39 (Act I Friction)
        {"img": f"{img_dir}/scene2_the_friction.jpg", "duration": 36},  # 0:39 - 1:15 (Act II Torpedoed Whale)
        {"img": f"{img_dir}/skybridge_dawn.jpg", "duration": 25},       # 1:15 - 1:40 (Act III Master Thesis)
        {"img": f"{img_dir}/skybridge_dawn.jpg", "duration": 25},       # 1:40 - 2:05 (Act III Space Between)
        {"img": f"{img_dir}/warroom_telemetry.jpg", "duration": 22},    # 2:05 - 2:27 (Act IV Operating Moat)
        {"img": f"{img_dir}/scene4_the_payoff.jpg", "duration": 18},    # 2:27 - 2:45 (Act V Continuum Mandate)
    ]
    
    # Create concat demuxer file
    concat_txt = "/tmp/keynote_scenes.txt"
    with open(concat_txt, "w") as f:
        for s in scenes:
            f.write(f"file '{s['img']}'\n")
            f.write(f"duration {s['duration']}\n")
        # Final image repeat for ffmpeg concat bug
        f.write(f"file '{scenes[-1]['img']}'\n")
        
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat", "-safe", "0", "-i", concat_txt,
        "-i", audio_path,
        "-vf", "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,format=yuv420p",
        "-c:v", "libx264", "-preset", "veryfast", "-crf", "20",
        "-c:a", "aac", "-b:a", "256k",
        "-shortest",
        output_path
    ]
    
    print("Executing ffmpeg render command...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("FFmpeg error:", res.stderr)
        return False
        
    print(f"Keynote film successfully rendered to: {output_path}")
    print(f"File size: {os.path.getsize(output_path)} bytes")
    return True

if __name__ == "__main__":
    render_keynote_film()
