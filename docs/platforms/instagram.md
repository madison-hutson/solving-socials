# Instagram Platform Intelligence

**Last Updated:** January 2026
**Purpose:** Living reference document for AI persona experiment. Update as platform dynamics evolve.

---

## Posting Frequency

| Frequency | Growth Impact | Notes |
|-----------|---------------|-------|
| 1-2x/week | Baseline | Risk of stagnation |
| 3-5x/week | 2x baseline growth | **Recommended starting point** |
| 6-9x/week | 3.7x baseline growth | Diminishing returns begin |
| 10+x/week | Up to 5.5x growth | Quality risk; burnout likely |

**Key finding:** Returns diminish after 5 posts/week. Consistency and quality matter more than volume.

**Source:** Buffer analysis of 2+ million posts (2025)

---

## Content Format Performance

### By Account Size

| Account Size | Best for Reach | Best for Engagement |
|--------------|----------------|---------------------|
| <5K followers | Reels | Reels |
| 5K-50K | Reels | Reels/Carousels |
| 50K+ | Carousels | Carousels |

**Key insight:** Reels are the growth engine for small accounts. Carousels become more valuable as audience grows.

### Reels Specifics

- **Optimal length for virality:** 15-30 seconds
- **Optimal length for shares:** 60-90 seconds (24% more shares than shorter)
- **Critical window:** Hook viewer in first 2-3 seconds
- **Format:** Always vertical (9:16)
- **Captions:** Auto-captions on, but verify accuracy

**Current stat:** ~59% of creator content on Instagram is now Reels.

---

## Algorithm Ranking Signals (December 2025 Update)

### Primary Signals (in order of weight)

1. **Watch time** (especially % of video watched)
2. **Saves**
3. **Shares (especially via DMs)**
4. **Likes**
5. **Comments**

**Key shift:** Saves and shares now weighted higher than likes. Algorithm rewards content people want to return to or send to friends.

### Topic Clarity

The algorithm heavily emphasizes **topic clarity**—how easily it can categorize your content. Accounts with consistent, focused themes receive better distribution.

**Example:** "sustainable travel and local cuisine" (clear) vs "travel, food, fashion, fitness" (too broad)

### Connected vs Unconnected Reach

- **Connected reach** (followers): Likes more important
- **Unconnected reach** (Explore/Reels feed): Shares more important

---

## Hashtag Strategy (2026)

Hashtags have shifted from "growth levers" to "filing labels" for categorization.

**Current best practice:**
- 3-5 highly targeted hashtags
- Focus on Instagram SEO (keywords in captions and on-screen text)
- Avoid hashtag spam

---

## Optimal Posting Times

No universal answer—depends on audience. However:

- **General guidance:** 9am-12pm tends to perform well
- **Best practice:** Use Instagram Insights to identify when *your specific* followers are active
- **For new accounts:** Start with 10am, 2pm, or 7pm local time and iterate based on data

---

## Content Mix Recommendations

### For Growth Phase (<10K followers)

| Content Type | Frequency | Purpose |
|--------------|-----------|---------|
| Reels | 3-4x/week | Discovery, reach |
| Carousels | 1-2x/week | Depth, saves |
| Stories | Daily | Connection, retention |
| Static images | Sparingly | Only if highly relevant |

### Content That Performs

- Educational (most saved)
- Entertaining (without being promotional)
- Behind-the-scenes / authentic
- User-generated content
- Trend participation (timely)

---

## AI Disclosure Considerations

### Research Findings

- AI disclosure generally reduces trust (University of Arizona, 2025: 13 experiments, 5000+ participants)
- However, under certain conditions, disclosed AI can be perceived as *more* authentic than humans
- Getting "caught" using AI is worse than self-disclosure
- Positive tech attitudes lessen (but don't eliminate) trust penalty

### Platform Requirements

- Instagram/Meta requires AI-generated content to be labeled
- EU AI Act mandates clear disclosure
- FTC increasing focus on transparency

### Recommendation for Experiment

- Bio: Clear "AI account" statement
- Link to repo for full transparency
- Lean into AI identity as differentiator rather than hiding it

---

## Virtual Influencer Benchmarks

| Account | Followers | Platform | Notes |
|---------|-----------|----------|-------|
| Lu do Magalu | 8.1M | Instagram | Oldest, retail-owned |
| Lil Miquela | 2.6M | Instagram | Fashion, music, politics |
| Noonoouri | ~400K | Instagram | High fashion, cartoon style |
| Aitana López | 325K | Instagram | Spain, gaming/fitness |
| Rozy | 170K | Instagram | South Korea, lifestyle |

**Key observation:** Successful virtual influencers have consistent visual identity, clear niche, and regular posting cadence—same as human influencers.

---

## Tools Reference

### Character Consistency (Images)

- **Midjourney:** `--cref` parameter with character weight `--cw` (0-100)
- **Best practice:** Start with 1-3 clean headshots, neutral lighting, consistent seed
- **Expect:** ~75% consistency across images with proper technique

### Reels Creation (No Editing Experience)

| Tool | Best For | Notes |
|------|----------|-------|
| Canva | General purpose | Free tier, templates |
| InVideo | Text-to-video | AI script generation |
| VEED.io | Quick polish | Stock footage, subtitles |
| FlexClip | Storyboarding | AI scene generation |
| Predis.ai | Blog-to-reel | URL input, auto voiceover |

### Approach for Non-Editors

1. **Text-on-screen + trending audio:** Lowest effort, proven format
2. **AI image → animated:** Tools like Luma AI add motion to stills
3. **Template-based:** Canva/CapCut templates with swap-in content

---

## Metrics to Track

### Per-Post Metrics

- Views (Reels)
- Watch time / completion rate
- Likes
- Comments
- Saves
- Shares
- Reach (followers vs non-followers)

### Account-Level Metrics (Weekly)

- Follower count (absolute + growth rate)
- Engagement rate (engagements / reach)
- Profile visits
- Website clicks (if applicable)
- Best performing content type

### Compound Score Formula (Proposed)

```
Score = (Growth_Rate × W_g) + (Engagement_Rate × W_e)

Where W_g + W_e = 1

Suggested weight schedule:
- 0-1K followers: W_g = 0.8, W_e = 0.2
- 1K-10K: W_g = 0.5, W_e = 0.5
- 10K+: W_g = 0.2, W_e = 0.8
```

---

## Changelog

| Date | Update |
|------|--------|
| Jan 2026 | Initial document created |

---

## Sources

- Buffer 2025 posting frequency analysis
- Instagram head Adam Mosseri statements (2025)
- SocialInsider Instagram Benchmarks 2025
- Teleprompter.com Reels Statistics 2025
- University of Arizona AI disclosure research
- Various tool documentation
