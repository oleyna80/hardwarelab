# 📝 User Quotes Guide (v1.3.0)

**Purpose:** How to collect and format DIRECT QUOTES from real users

---

## 🎯 THE RULE

**Use user's EXACT words, NOT your paraphrasing.**

---

## ✅ HardwareLab v1.3.0 Defaults

- Final reviews should include **4–6 quotes** in `<UserFeedback />` (recommended: 6).
- For a cleaner, more symmetric UI block, prefer an **even count**: **4 or 6** (avoid 5 if possible).
- Aim for a balanced mix (recommended for 6: **2 positive / 2 neutral / 2 negative**; for 4: **2 positive / 1 neutral / 1 negative**).
- Keep quote length roughly similar so the UI block looks balanced.

---

## ❌ WRONG: Paraphrasing

```jsx
<UserFeedback feedback={[
  {
    user: "StagePuzzleheaded635",
    sentiment: "positive",
    comment: "Calls the base M4 mini a top price-to-performance pick; says 16GB is enough for most and external storage avoids Apple's upgrade pricing."
    // ❌ This is ChatGPT summarizing in 3rd person
  }
]} />
```

**Problems:**
- "Calls" - 3rd person narrative (ChatGPT voice)
- "says 16GB is enough" - paraphrased, not user's words
- Loses user's tone and personality
- Reads like a report, not feedback

---

## ✅ CORRECT: Direct Quote

```jsx
<UserFeedback feedback={[
  {
    user: "StagePuzzleheaded635",
    sentiment: "positive",
    comment: "The base M4 mini is honestly one of the best price-to-performance options right now. 16GB is plenty for most people, and using external storage lets you avoid Apple's insane upgrade pricing."
    // ✅ This is user's actual words from Reddit
  }
]} />
```

**Why this works:**
- User's voice: "honestly", "insane"
- 1st person or direct statement
- Preserves tone and emphasis
- Feels authentic

---

## 📚 MORE EXAMPLES

### Example 1: Positive Feedback

**❌ WRONG (paraphrased):**
```jsx
{
  user: "techuser99",
  sentiment: "positive",
  comment: "Reports excellent performance and notes significant improvement over previous generation Intel models."
}
```

**✅ CORRECT (direct quote):**
```jsx
{
  user: "techuser99",
  sentiment: "positive",
  comment: "Performance is excellent. Coming from a 2018 Intel mini, this thing absolutely flies. Compile times are 2-3x faster and I haven't heard the fan once."
}
```

---

### Example 2: Negative Feedback

**❌ WRONG (paraphrased):**
```jsx
{
  user: "frustrated_buyer",
  sentiment: "negative",
  comment: "Complains about high temperatures under load and suspects inadequate cooling design."
}
```

**✅ CORRECT (direct quote):**
```jsx
{
  user: "frustrated_buyer",
  sentiment: "negative",
  comment: "Mine gets uncomfortably hot during video exports. Like, too hot to touch. I think Apple prioritized silence over cooling and it shows under sustained load."
}
```

---

### Example 3: Neutral/Mixed Feedback

**❌ WRONG (paraphrased):**
```jsx
{
  user: "realistic_reviewer",
  sentiment: "neutral",
  comment: "Mentions good performance but notes storage limitations require external drives."
}
```

**✅ CORRECT (direct quote):**
```jsx
{
  user: "realistic_reviewer",
  sentiment: "neutral",
  comment: "Performance is great, no complaints there. But 256GB disappears fast with macOS and a few apps. You'll need an external SSD if you do anything beyond basic browsing."
}
```

---

## ✅ QUICK CHECK (before output)

- Direct quote (no “Says/Mentions/Reports…”)
- 2–4 sentences, under ~100 words
- Do NOT truncate mid-thought; if a quote is too long, pick a shorter quote instead
- User voice preserved (don’t formalize)
- **4–6 quotes total** (balanced sentiment; similar length preferred; for symmetry prefer 4 or 6)
- Quote must be copied from an accessible source page (do NOT use search-result snippets)
- In your Research Pack notes, store a `sourceURL` for each quote (don’t add URLs into the MDX unless explicitly requested)

---

## 🔖 VERSION NAMES

v1.3.0

---

**END OF USER QUOTES GUIDE (v1.3.0)**
