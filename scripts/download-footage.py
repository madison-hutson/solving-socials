#!/usr/bin/env python3
"""
Footage Download Script
Downloads royalty-free gameplay and b-roll footage for the content pipeline.

Usage:
    pip install yt-dlp
    python scripts/download-footage.py
"""

import subprocess
import os
from pathlib import Path

# Project root
PROJECT_ROOT = Path(__file__).parent.parent
ASSETS_DIR = PROJECT_ROOT / "assets"

# YouTube sources for gameplay footage
GAMEPLAY_SOURCES = {
    "minecraft_parkour": [
        # Governare - No Copyright Gameplay channel
        # Add specific video URLs here after browsing the channel
        # "https://www.youtube.com/watch?v=EXAMPLE1",
        # "https://www.youtube.com/watch?v=EXAMPLE2",
    ],
    "subway_surfers": [
        # No Copyright Gameplay channel
        # "https://www.youtube.com/watch?v=EXAMPLE",
    ],
    "gta_driving": [
        # Various GTA no-copyright clips
        # "https://www.youtube.com/watch?v=EXAMPLE",
    ],
    "temple_run": [
        # No Copyright Gameplay channel
        # "https://www.youtube.com/watch?v=EXAMPLE",
    ],
}

# Wellness b-roll - manual download from Pexels/Pixabay
# Organized by category for Luca's content
WELLNESS_CATEGORIES = {
    "morning_routine": ["morning routine", "coffee", "stretching", "sunlight", "waking up"],
    "workout": ["gym", "running", "jogging", "bodyweight", "exercise"],
    "food_prep": ["healthy food", "cooking", "smoothie", "meal prep"],
    "meditation": ["meditation", "yoga", "breathing", "mindfulness"],
    "lifestyle": ["walking", "journaling", "relaxation", "self care"],
    "aesthetic": ["sunset", "nature", "calm", "peaceful", "golden hour"],
}


def download_youtube_video(url: str, output_dir: Path, filename_prefix: str = "clip") -> bool:
    """Download a YouTube video using yt-dlp."""
    output_dir.mkdir(parents=True, exist_ok=True)

    # Output template: clip_001.mp4, clip_002.mp4, etc.
    existing = list(output_dir.glob("*.mp4"))
    next_num = len(existing) + 1
    output_template = str(output_dir / f"{filename_prefix}_{next_num:03d}.%(ext)s")

    cmd = [
        "yt-dlp",
        "-f", "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/best[height<=1080][ext=mp4]/best",
        "--merge-output-format", "mp4",
        "-o", output_template,
        url,
    ]

    try:
        print(f"Downloading: {url}")
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"  -> Saved to {output_dir}")
            return True
        else:
            print(f"  -> Error: {result.stderr}")
            return False
    except FileNotFoundError:
        print("Error: yt-dlp not found. Install with: pip install yt-dlp")
        return False


def download_all_gameplay():
    """Download all configured gameplay footage."""
    print("\n=== Downloading Gameplay Footage ===\n")

    for category, urls in GAMEPLAY_SOURCES.items():
        if not urls:
            print(f"[{category}] No URLs configured - skipping")
            continue

        output_dir = ASSETS_DIR / "gameplay" / category
        print(f"\n[{category}] Downloading {len(urls)} clips...")

        for url in urls:
            download_youtube_video(url, output_dir)


def print_manual_download_instructions():
    """Print instructions for manually downloading b-roll."""
    print("\n=== Manual Download Instructions ===\n")

    print("WELLNESS B-ROLL (Luca):")
    print("-" * 40)
    print("Visit: https://pexels.com/search/videos/")
    print("Filter by 'Vertical' for Reels-ready content")
    print()
    print("Search terms by folder:")
    for folder, keywords in WELLNESS_CATEGORIES.items():
        print(f"  {folder}/")
        for kw in keywords:
            print(f"    - \"{kw}\"")
    print()
    print("Curation tips:")
    print("  - Natural lighting, warm tones")
    print("  - Relatable fitness (not bodybuilder)")
    print("  - Male subjects when possible")
    print("  - Mediterranean aesthetic")
    print()
    print(f"Save clips to: {ASSETS_DIR / 'wellness-broll'}")
    print()

    print("TEXT BACKGROUNDS (Jake):")
    print("-" * 40)
    print("Options:")
    print("  - Generate with ffmpeg (gradient backgrounds)")
    print("  - Download from Mixkit: https://mixkit.co/free-stock-video/")
    print("  - Search: 'minimal', 'gradient', 'abstract simple'")
    print(f"Save to: {ASSETS_DIR / 'text-backgrounds'}")
    print()

    print("MOTION GRAPHICS (Flux):")
    print("-" * 40)
    print("Sources:")
    print("  - https://mixkit.co/free-stock-video/ (search: 'abstract', 'technology')")
    print("  - https://videezy.com (check attribution requirements)")
    print(f"Save to: {ASSETS_DIR / 'motion-graphics'}")


def check_library_status():
    """Show current status of the asset library."""
    print("\n=== Asset Library Status ===\n")

    categories = [
        ("gameplay/minecraft_parkour", "Minecraft Parkour"),
        ("gameplay/subway_surfers", "Subway Surfers"),
        ("gameplay/gta_driving", "GTA Driving"),
        ("gameplay/temple_run", "Temple Run"),
        ("wellness-broll/morning_routine", "Wellness - Morning"),
        ("wellness-broll/workout", "Wellness - Workout"),
        ("wellness-broll/food_prep", "Wellness - Food"),
        ("wellness-broll/meditation", "Wellness - Meditation"),
        ("wellness-broll/lifestyle", "Wellness - Lifestyle"),
        ("wellness-broll/aesthetic", "Wellness - Aesthetic"),
        ("text-backgrounds", "Text Backgrounds"),
        ("motion-graphics", "Motion Graphics"),
    ]

    total_clips = 0
    for path, name in categories:
        full_path = ASSETS_DIR / path
        if full_path.exists():
            clips = list(full_path.glob("*.mp4")) + list(full_path.glob("*.webm"))
            count = len(clips)
            total_clips += count
            status = f"{count} clips" if count > 0 else "empty"
        else:
            status = "not created"
        print(f"  {name:25} {status}")

    print(f"\n  Total: {total_clips} clips")

    # Recommendations
    print("\n  Recommended minimums:")
    print("    Gameplay: 10-15 clips total")
    print("    Wellness: 30-40 clips (5-7 per category)")
    print("    Backgrounds: 5-10 each")


def main():
    print("=" * 50)
    print("  FOOTAGE DOWNLOAD SCRIPT")
    print("  Solving Socials - Asset Library Builder")
    print("=" * 50)

    # Show current status
    check_library_status()

    # Download gameplay (if URLs configured)
    download_all_gameplay()

    # Print manual instructions for other content
    print_manual_download_instructions()

    print("\n" + "=" * 50)
    print("  NEXT STEPS:")
    print("  1. Add YouTube URLs to GAMEPLAY_SOURCES in this script")
    print("  2. Run again to download gameplay clips")
    print("  3. Manually download wellness/text/motion content")
    print("  4. Run script again to verify library status")
    print("=" * 50)


if __name__ == "__main__":
    main()
