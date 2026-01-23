# Asset Library

This folder contains royalty-free footage for automated content generation.

## Folder Structure

```
assets/
├── gameplay/              # Evan & Sophia - gaming commentary backgrounds
│   ├── minecraft_parkour/ # Governare channel clips
│   ├── subway_surfers/    # No Copyright Gameplay channel
│   ├── gta_driving/       # Various TikTok/YouTube sources
│   └── temple_run/        # No Copyright Gameplay channel
├── wellness-broll/        # Luca - wellness content backgrounds
│   ├── morning_routine/   # Coffee, stretching, sunlight
│   ├── workout/           # Gym, running, bodyweight
│   ├── food_prep/         # Cooking, smoothies, meals
│   ├── meditation/        # Yoga, breathing, nature
│   ├── lifestyle/         # Walking, journaling, rest
│   └── aesthetic/         # Sunsets, nature, calm vibes
├── text-backgrounds/      # Jake - minimalist backgrounds for text overlays
└── motion-graphics/       # Flux - abstract visuals, tech aesthetics
```

## Gameplay Sources (Evan/Sophia)

### Primary Sources

1. **Governare (Minecraft Parkour)** - RECOMMENDED
   - YouTube: https://youtube.com/@Governare-NoCopyrightGameplay
   - Ko-fi downloads: https://ko-fi.com/governarencg/shop
   - Format: 4K vertical (9:16), with/without music
   - License: Free to use, no attribution required

2. **No Copyright Gameplay (Mobile Games)**
   - YouTube: https://youtube.com/@NoCopyrightGameplay
   - Content: Subway Surfers, Temple Run, mobile games
   - Format: Mixed, some vertical

3. **GTA Driving Clips**
   - Search: "GTA no copyright gameplay free to use" on TikTok/YouTube
   - Content: Night driving, city cruising, ramp clips
   - Note: Check individual video descriptions for license

## Wellness B-Roll Sources (Luca)

### Primary Sources

1. **Pexels Videos** (BEST - huge library)
   - https://pexels.com/search/videos/
   - License: Free, no attribution required
   - Filter by "Vertical" for Reels-ready content

2. **Pixabay Videos**
   - https://pixabay.com/videos
   - License: Free, no attribution
   - Smaller but quality content

3. **Coverr**
   - https://coverr.co
   - License: Free for commercial use

### Search Terms by Category

| Folder | Search Terms |
|--------|--------------|
| morning_routine | "morning routine", "coffee", "stretching", "sunlight" |
| workout | "gym", "running", "jogging", "bodyweight", "exercise" |
| food_prep | "healthy food", "cooking", "smoothie", "meal prep" |
| meditation | "meditation", "yoga", "breathing", "mindfulness" |
| lifestyle | "walking", "journaling", "relaxation", "self care" |
| aesthetic | "sunset", "nature", "calm", "peaceful", "golden hour" |

### Curation Guidelines (Match Luca's Vibe)

**Use:**
- Natural lighting, warm tones
- Relatable/achievable fitness (not bodybuilder energy)
- Male subjects when possible (matches persona)
- Mediterranean aesthetic (outdoor cafes, olive oil, linen)

**Avoid:**
- Overly polished "influencer" aesthetic
- Extreme fitness / gym bro energy
- Cold/clinical health imagery

## Text Background Sources (Jake)

- Simple gradient backgrounds
- Minimalist animated patterns
- Can generate programmatically with ffmpeg or Remotion

## Motion Graphics Sources (Flux)

1. **Mixkit**
   - https://mixkit.co/free-stock-video/
   - License: Free
   - Search: "abstract", "technology", "data", "futuristic"

2. **Videezy**
   - https://videezy.com
   - License: Free with attribution (check each clip)
   - Search: "motion graphics", "abstract"

---

## Download Script

Use `scripts/download-footage.py` to batch download from YouTube sources.

```bash
# Install yt-dlp first
pip install yt-dlp

# Run download script
python scripts/download-footage.py
```

## Usage in Pipeline

The automated pipeline randomly selects clips from these folders:
- Evan/Sophia/Marcus: `gameplay/*`
- Luca: `wellness-broll/*`
- Jake: `text-backgrounds/*`
- Flux: `motion-graphics/*`

## Recommended Library Size

Start with:
- 10-15 gameplay clips (20-30 min total)
- 30-40 wellness b-roll clips (5-7 per category)
- 5-10 text backgrounds
- 5-10 motion graphics loops

This provides enough variety to avoid obvious repeats in Week 1.
