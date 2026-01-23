# Content Strategy

Practical guidance for creating engaging content with AI personas.

---

## Discovery Mechanics (0 Followers)

With zero followers, there's exactly **one discovery mechanism**: Reels pushed to non-followers.

| Format | Discovery | Use Case |
|--------|-----------|----------|
| Reels | High (pushed to non-followers) | Primary format for Week 1+ |
| Static/Carousel | Low-Medium | Occasional, for depth |
| Stories | None (followers only) | Skip until you have followers |

**Week 1 is almost entirely Reels.** That's the only way the algorithm can find people to show content to.

---

## Why Someone Stops Scrolling

In order of power:

1. **A face** — Humans are wired to look at faces. This is why faced personas (A-D) have an advantage we're testing against E.
2. **A hook in the first 1 second** — Text on screen or something visually unexpected
3. **Trending audio** — Signals familiarity, also gets algorithmic boost
4. **Relatability / hot take** — "I have an opinion about this too"
5. **Visual quality** — Not polished, just not ugly

---

## What Doesn't Work

**Bad version (slideshow into void):**
- Plain background
- Text appears
- No face
- No audio
- No reason to care
- Posted and dies

A slideshow of AI images with text is a weak format. It exists, but it's not what stops your scroll.

---

## Viable Content Formats

### Option 1: AI-Generated Video from Images

Tools like Runway, Luma, or Kling can animate still images—add subtle movement, camera drift, expressions changing.

- Not a person talking, but more alive than a slideshow
- Quality is hit-or-miss, can look uncanny
- Worth testing

### Option 2: AI Voiceover + Images

Generate an AI voice reading the take (ElevenLabs or similar). Now it's someone "talking" even if not lip-synced.

- More engaging than silent text
- Feels more like content
- Works for all personas

### Option 3: Screen Content (Gaming Personas)

For Evan and Sophia:
- Gameplay clips (sourced or recorded) with text commentary
- Reaction-style to game trailers
- Tier lists, rankings with visual movement

No face required in every frame. The gameplay IS the content. Their "voice" comes through in the takes.

### Option 4: Faceless Trending Formats

Some formats work without a face:
- POV text stories with trending audio
- "Which are you?" interactive polls
- Hot take rankings with motion graphics
- Aesthetic edits

Flux is positioned for this. Others could use it situationally.

---

## Reel Requirements

Every Reel should have:

- [ ] Shows persona's face OR strong brand aesthetic (Flux)
- [ ] Text hook in first second
- [ ] Trending audio
- [ ] Under 15 seconds
- [ ] Ends with something engageable (question, hot take, relatable moment)

---

## Image Library (Per Persona)

Before generating content, build a library of images per persona with different expressions. This enables Reels with visual variety.

For each faced persona (A-D), generate:

| Expression | Purpose |
|------------|---------|
| Neutral/friendly | Default, talking to camera |
| Laughing/amused | Reaction shots |
| Skeptical/raised eyebrow | Hot takes, disagreement |
| Surprised/excited | Hype moments |
| Looking away/candid | B-roll, transitions |

For Flux (E): Generate logo variations, color accent options, template backgrounds.

---

## Format Templates

### Template: Faced Personas (Evan, Luca, Jake)

```
[Image 1: Face looking at camera]
Text on screen: "hot take:"

[Image 2: Same face, different expression]
Text on screen: "[the actual take]"

[Image 3: Optional reaction shot]
Text on screen: "fight me" or question

Audio: Trending sound, something fitting the vibe
Length: 5-10 seconds
```

### Template: Stylized Art (Sophia)

```
[Image 1: Sophia with smug expression]
Text: "me:"

[Image 2: Sophia with unhinged expression]
Text: "[chaotic thing]"

Audio: Trending meme audio
Length: 5-8 seconds, fast cuts
```

Her art style IS the brand. The stylization is a feature.

### Template: Faceless Brand (Flux)

```
[Clean motion graphic]
Bold text with kinetic typography
Curated trending topic, no commentary

Audio: Something ambient/electronic
Length: 10-15 seconds
```

Flux compensates with stronger visual design since there's no face to hook.

---

## Persona-Specific Approaches

| Persona | Primary Content | Face Usage |
|---------|-----------------|------------|
| Evan | Gameplay clips + AI voiceover | Profile/brand identity, not every video |
| Sophia | Gameplay + chaotic edits | Art style IS the hook |
| Luca | Wellness b-roll + AI voiceover | Occasional face, aesthetic focus |
| Jake | Faceless trending formats | Face as brand, text-heavy content |
| Flux | Motion graphics, kinetic typography | No face by design |

---

## Tools

| Tool | Purpose |
|------|---------|
| Midjourney | Persona images with `--cref` |
| Runway/Luma/Kling | Animate still images |
| ElevenLabs | AI voiceover |
| CapCut/Canva | Assembly, text overlays, audio |

---

## Automation Pipeline

Goal: Fully autonomous content generation to avoid human bias affecting the experiment.

### Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  1. CONTENT GENERATION (Claude API)                              │
│     Input:  persona spec + trends + past performance             │
│     Output: 5 scripts per persona (25 total/week)                │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. VOICE SYNTHESIS (ElevenLabs API)                             │
│     Input:  scripts + persona voice_id                           │
│     Output: MP3 voiceover files                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. VISUAL ASSET SELECTION (Random from library)                 │
│     Evan/Sophia: assets/gameplay/*                               │
│     Luca: assets/wellness-broll/*                                │
│     Jake: assets/text-backgrounds/*                              │
│     Flux: assets/motion-graphics/*                               │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. VIDEO ASSEMBLY (ffmpeg or Remotion)                          │
│     - Combine audio + visual                                     │
│     - Auto-generate captions (Whisper)                           │
│     - Add persona branding                                       │
│     - Export MP4 (9:16, <60sec)                                  │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. POSTING (Semi-manual initially)                              │
│     Output folder + human uploads, or Buffer/Later API           │
└─────────────────────────────────────────────────────────────────┘
```

### Why Automation Matters

Human curation introduces bias:
- Which scripts "sound right" (taste)
- Which gameplay clips to use (skill, game choice)
- Which takes are "good enough" (judgment)

Fully automated = cleaner experimental data on persona variables.

---

## Asset Library

All footage lives in `/assets/`. See `assets/README.md` for full documentation.

### Gameplay Sources (Evan/Sophia)

Using royalty-free no-copyright clips avoids bias from personal gameplay.

| Source | Content | URL |
|--------|---------|-----|
| Governare | Minecraft parkour, 4K vertical | youtube.com/@Governare-NoCopyrightGameplay |
| No Copyright Gameplay | Subway Surfers, Temple Run | youtube.com/@NoCopyrightGameplay |
| Various | GTA driving clips | Search "GTA no copyright" |

### Wellness B-Roll (Luca)

| Source | License | URL |
|--------|---------|-----|
| Pexels | Free, no attribution | pexels.com/videos |
| Pixabay | Free, no attribution | pixabay.com/videos |
| Coverr | Free commercial | coverr.co |

Search: nature, meditation, calm, zen, forest, ocean, flowing water

### Text Backgrounds (Jake)

- Generate gradients with ffmpeg
- Minimal animated patterns
- Mixkit abstract clips

### Motion Graphics (Flux)

| Source | License | URL |
|--------|---------|-----|
| Mixkit | Free | mixkit.co/free-stock-video/ |
| Videezy | Free w/ attribution | videezy.com |

Search: abstract, technology, data, futuristic

### Library Size (Minimum)

- Gameplay: 10-15 clips (20-30 min total)
- Wellness: 10-15 clips
- Text backgrounds: 5-10
- Motion graphics: 5-10

Run `python scripts/download-footage.py` to check library status.

---

## Experiment Note

The hypothesis being tested: Maybe AI-image personas can't compete with real video. That's a valid finding. The experiment reveals the limit.

The "face" is more about profile/brand identity than appearing in every piece of content. The actual content is voiceover, gameplay, or visual formats that don't require video of a person.

---

*Last Updated: 2026-01-19*
