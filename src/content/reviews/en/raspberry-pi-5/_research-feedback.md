# Research Pack Feedback: Raspberry Pi 5

**Status:** REJECTED (Format/Compliance)

## ❌ Critical Issues

1.  **Strict Template Violation**:
    - The submitted `_research-pack.md` used custom headers (`## Product`, `## ASIN Verification`) instead of the required **ReviewHero** template headers (`### Product Identity`, `### Editorial Fields`).
    - **Fix:** You MUST copy-paste the template from the Role definition exactly. Do not invent new sections.

2.  **Missing Mandatory SEO Fields**:
    - `Title candidate`: Missing.
    - `Description candidate`: Missing.
    - **Fix:** Provide a 50-60 char title and 150-160 char description based on your "Angle".

3.  **User Quotes Formatting**:
    - Current: Free-text bullet points.
    - Required: Structured YAML-like format:
      ```markdown
      * user: <name>
        * sentiment: <type>
        * sourceURL: <url>
        * quote: "..."
      ```

## 🛠 Action Item
Re-run the research task.
1.  **Read** the updated `single-researcher.md` role.
2.  **Generate** a new `_research-pack.md` that strictly follows the template.
3.  **Ensure** all SEO fields are filled.
