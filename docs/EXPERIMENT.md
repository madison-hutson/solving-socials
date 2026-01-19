# Experiment Design

**Core Hypothesis:** Social platforms have discoverable latent preference functions that can be mapped through controlled variation of persona parameters (niche, tone, content style). By identifying these functions, we can predict platform behavior and, by extension, aggregate human behavior.

**Ethical Stance:** Full transparency. All accounts state "AI account" in bio and link to this repository. No deception.

---

## Phase 1: Instagram (5 Personas)

### Persona Matrix

| ID | Name | Handle | Niche | Tone | Visual |
|----|------|--------|-------|------|--------|
| A | Evan | @evan.exe | Gaming | Earnest | Mid-20s, warm, CohhCarnage energy |
| B | Sophia | @sofiashitposts | Gaming | Ironic | Femboy, stylized semi-realistic, impish |
| C | Luca | @lucalives | Lifestyle | Earnest | Mediterranean, lean/toned, wellness bro |
| D | Jake | @jaketh3guy | Trend-reactive | Adaptive | Aggressively average, forgettable-handsome |
| E | Flux | @fluxfeed | Trend-reactive | Adaptive | Minimalist, monochrome + accent, no face |

### Controlled Variables (Same Across All)

- **Platform:** Instagram
- **Posting frequency:** 5 posts/week (every other day, same schedule)
- **Posting time:** Start with 10am EST, iterate based on data
- **Disclosure:** Bio states AI, links to repo
- **Content generation:** LLM-prompted with persona spec

### Key Comparisons

| Comparison | Variable Isolated | Question |
|------------|-------------------|----------|
| A vs B | Tone | Does earnest or ironic perform better in gaming? |
| A vs C | Niche | Gaming vs lifestyle with same earnest approach? |
| A/B/C vs D | Identity consistency | Does consistent identity beat trend-chasing? |
| D vs E | Visual identity | Does having a face matter for growth? |

---

## Technical Pipeline

### 1. Persona Specifications

Location: `/personas/*.yaml`

Each persona spec includes:
- Identity (name, handle, bio)
- Content parameters (niche, tone, topics)
- Voice & style (description, traits, emoji usage)
- Visual identity (face, style, color palette)
- Content examples (few-shot)
- Boundaries (what they won't do)
- Engagement style (replies, DMs)

### 2. Content Generation

Location: `/scripts/generate_content.py`

**Input:** Persona spec + optional trend/topic + content type (Reel/Carousel/Static)

**Output:**
- Post text/caption
- Image prompt (for Midjourney)
- Hashtags (3-5 targeted)

**Content mix per week:**
- 3-4 Reels
- 1-2 Carousels or static posts

### 3. Character Image Generation

**Tool:** Midjourney with `--cref` (character reference)

**Process:**
1. Generate initial reference image for each persona (A-D)
2. Create "identity pack" of 4-6 consistent angles/expressions
3. Use reference images for all subsequent content

Location: `/assets/persona_X/`

### 4. Tracking System

**Per-post tracking:** `/tracking/posts.csv`
- post_id, persona_id, timestamp, content_type
- topic, caption_length, hashtags
- views, likes, comments, saves, shares
- reach_followers, reach_non_followers

**Weekly metrics:** `/tracking/weekly_metrics.csv`
- week, persona_id, follower_count, growth_rate
- avg_engagement_rate, compound_score
- best/worst performing posts

### 5. Weekly Analysis

Location: `/analysis/week_XX.md`

Each analysis covers:
1. Metrics summary per persona
2. Top/bottom performing posts (why?)
3. Hypothesis updates
4. Parameter adjustments for next week
5. Observations/surprises

---

## Compound Success Metric

```python
def calculate_score(growth_rate, engagement_rate, follower_count):
    """
    Weighted score that shifts priority from growth to engagement
    as account matures.
    """
    if follower_count < 1000:
        w_growth, w_engage = 0.8, 0.2
    elif follower_count < 10000:
        w_growth, w_engage = 0.5, 0.5
    else:
        w_growth, w_engage = 0.2, 0.8

    return (growth_rate * w_growth) + (engagement_rate * w_engage)
```

---

## Implementation Phases

### Phase 0: Setup (Current)

- [x] Create repo structure
- [x] Write persona spec files (A-E)
- [ ] Generate initial reference images for personas A-D
- [ ] Create abstract identity for persona E
- [ ] Set up tracking spreadsheet/database
- [ ] Create 5 Instagram accounts with proper bios
- [ ] Build content generation prompt templates

### Phase 1: Launch

- [ ] Generate first week of content for all personas
- [ ] Post according to schedule (5 posts each, same timing)
- [ ] Track all metrics daily
- [ ] End-of-week analysis

### Phase 2+: Iterate

- [ ] Review Week N analysis
- [ ] Adjust parameters based on findings
- [ ] Generate Week N+1 content
- [ ] Continue tracking
- [ ] Document learnings

---

## Open Questions

1. Persona names/handles—need to decide
2. Exact visual style for each persona
3. Which video tool to standardize on
4. Whether to use scheduling tools or post manually
5. How to handle Instagram API access for metrics (manual vs automated)

---

## Reference Documents

- Platform intelligence: `docs/platforms/instagram.md`
- Persona specs: `personas/*.yaml`
- Analysis template: `analysis/_template.md`

---

*Last Updated: 2026-01-19*
