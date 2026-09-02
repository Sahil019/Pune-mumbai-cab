# Product Requirements Document (PRD)

## 1. Document Info

| Field | Value |
|---|---|
| **Product Name** | Recruiter Shortlisting & Profile Optimization Audit |
| **Candidate / Owner** | Sahil Sharma |
| **Author** | Profile Audit Project |
| **Date** | 30 Aug 2026 |
| **Status** | Draft → Ready for Implementation |
| **Version** | 1.0 |

---

## 2. Overview

### 2.1 Problem Statement
Sahil Sharma has ~1 year 8 months of genuine, verifiable full-time experience as a
MERN Full Stack and React Native Developer, plus strong project work (JalSaathi,
WhatsApp-Automation). However, recruiters searching Naukri and LinkedIn for
"1–2 years Full Stack / React Native Developer in Pune" are unlikely to find or
shortlist him because:

1. The Naukri Total Experience field reads **0 Year(s) 8 Month(s)** — bucketing him
   into the "fresher" experience filter.
2. The LinkedIn profile has **no Experience section at all**.
3. Both profiles contain duplicate entries, conflicting degree/employer data, and
   unsupported skill tags that read as carelessness in a 10-second recruiter scan.

### 2.2 Proposed Solution
A structured audit + remediation project that:
- Verifies every profile fact against its source (no assumptions),
- Fixes all data-entry and consistency errors,
- Rewrites headline, summary, experience bullets, and project descriptions,
- Aligns keywords with real recruiter search behavior,
- Applies results against a live Pune job search.

### 2.3 Goals & Success Metrics

| Goal | Metric | Current | Target |
|---|---|---|---|
| Appear in correct experience-bucket searches | Total Experience field accuracy | 0Y8M (wrong) | 1Y8M (verified) |
| Overall recruiter conversion | Audit score (§12 of audit) | ~50/100 | 75+/100 |
| LinkedIn completeness | Experience section filled | Empty | 2 roles, rewritten |
| Profile consistency | Cross-platform inconsistencies | 6 major | 0 |
| Keyword coverage | JWT, RBAC, REST API tagged | Missing | Present |
| Credibility | Unsubstantiated skill tags | 4 | 0 |

### 2.4 Non-Goals (Out of Scope)
- Fabricating experience, metrics, or skills not supported by evidence.
- Targeting roles not supported by the profile (Python, Java, Data Science, DevOps, QA).
- Paid promotions / LinkedIn Premium / Naukri FastForward services.
- Resume PDF redesign (this PRD covers profile fields only).

---

## 3. Target Users

| User | Need |
|---|---|
| **Primary:** The candidate | Accurate, searchable, shortlist-optimized profiles on Naukri + LinkedIn |
| **Secondary:** Recruiters (agency + in-house) | Fast, trustworthy signal in a 10–20 second scan; correct experience filter match |
| **Tertiary:** ATS systems | Keyword coverage (JWT, RBAC, REST API, MERN components) |

---

## 4. Source of Truth & Data Rules

1. Only two named sources may supply candidate facts: the live LinkedIn profile
   (`linkedin.com/in/sahilsharma19`) and the live Naukri profile.
2. Every fact is tagged with its origin. Unverifiable facts are marked
   **NOT VERIFIED**, never guessed.
3. Where sources conflict (degree, headline, employer name), the conflict is
   flagged for the candidate to resolve against the actual document (e.g., degree
   certificate) — not silently "fixed."
4. No skill may be listed unless it is evidenced in a paid role or a named project.

---

## 5. Functional Requirements

### FR-1: Data Corrections (P0 — Critical)
| ID | Requirement |
|---|---|
| FR-1.1 | Change Naukri Total Experience from 0Y8M → 1Y8M (confirmed by Employment dates + IT Skills table). |
| FR-1.2 | Delete 2 of 3 duplicate BALCO internship entries; keep one with a consistent category label. |
| FR-1.3 | Resolve "T3 wire rod malfunction detection" project: rewrite description to match title OR rename title to match content. |
| FR-1.4 | Standardize employer name to one spelling ("Rena Soft Tech") across Employment, Projects, Summary. |
| FR-1.5 | Resolve degree conflict: CSE (Naukri) vs. AI (LinkedIn) — whichever matches the degree certificate, identically on both platforms. |
| FR-1.6 | Remove 2 duplicate "Online profile" Accomplishment entries and 2 duplicate LinkedIn Education entries. |

### FR-2: LinkedIn Experience Section (P0 — Critical)
| ID | Requirement |
|---|---|
| FR-2.1 | Add Experience entries for Rena Technology (Mar 2026–Present) and Glistara (Jan 2025–Feb 2026). |
| FR-2.2 | Use the rewritten bullets from §8 of the audit; Glistara bullet pending product/domain specifics from candidate. |

### FR-3: Headline & Positioning (P0 — Critical)
| ID | Requirement |
|---|---|
| FR-3.1 | Replace Naukri resume headline with Option A. |
| FR-3.2 | Replace LinkedIn headline with the matching version (copy-paste package, §20). |
| FR-3.3 | Acceptance: exactly ONE self-description text across both platforms. |

### FR-4: Summary & Content Rewrites (P1 — High)
| ID | Requirement |
|---|---|
| FR-4.1 | Replace Naukri Profile Summary with the §7 rewrite (line breaks or "•" fallback). |
| FR-4.2 | Rewrite Rena experience bullet to ship/outcome-focused language. |
| FR-4.3 | Rewrite Glistara bullet once candidate supplies: product/domain, owned features, team/cadence info. |
| FR-4.4 | Reorder Projects: JalSaathi first, then WhatsApp-Automation; restructure JalSaathi as Problem → Solution → Technology → Challenge → Result. |
| FR-4.5 | Relabel projects done during full-time employment as personal/freelance, not "(Full Time)". |

### FR-5: Skills & Keywords (P1 — High)
| ID | Requirement |
|---|---|
| FR-5.1 | Add Key Skills tags: JWT Authentication, RBAC, REST API Design. |
| FR-5.2 | Remove or substantiate: Next.js, GraphQL, Firebase, Swagger/OpenAPI. |
| FR-5.3 | Merge "Websocket" into Socket.io; fix "Expresjs" → "Express.js". |
| FR-5.4 | Expand LinkedIn Skills section from 8 generic entries to the final evidence-backed list (§10). |

### FR-6: Settings & Preferences (P2 — Medium)
| ID | Requirement |
|---|---|
| FR-6.1 | Confirm current salary (₹1.8 LPA) is accurate before it's used in offers. |
| FR-6.2 | Candidate decision required: drop "Contractual" from Desired Job Type unless genuinely open. |
| FR-6.3 | Candidate decision required: narrow 7-city location list vs. keep broad. |
| FR-6.4 | Specify notice period in days to match "15 Days" claim. |
| FR-6.5 | Verify profile photo clears Naukri moderation; fill Personal Details section. |
| FR-6.6 | Confirm "Visible to all recruiters" setting in Naukri. |

---

## 6. Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-1 | **Accuracy:** Zero invented facts; every claim traceable to a source. |
| NFR-2 | **Consistency:** One headline, one employer spelling, one project name per project, everywhere. |
| NFR-3 | **Scannability:** Every section must survive a 10–20 second recruiter scan. |
| NFR-4 | **Defensibility:** Any skill listed must be explainable in a technical screen. |
| NFR-5 | **Completeness:** No empty required sections on either platform. |

---

## 7. Job Search Requirements (Live Market Validation)

| ID | Requirement |
|---|---|
| FR-7.1 | Search Pune for target titles (Full Stack / React Native / Software Developer). |
| FR-7.2 | Apply filters: Pune, ≤24 hours posted, strong match. |
| FR-7.3 | If no listing qualifies, report honestly — do not pad the list. |
| FR-7.4 | For each opened listing, record: title, company, salary, experience band, applicant count, posting date, active status, match score, matching/missing skills, concerns, direct link. |
| FR-7.5 | Produce a ranked comparison table and an apply-first recommendation with rationale. |

**Validated output (as of 30 Aug 2026):** No 24-hour listings found; two verified ~5-day-old alternatives — Osumare Full Stack Developer (58/100, apply first) and Shashwath Solution React Native Developer (52/100, second priority).

---

## 8. Dependencies & Inputs Needed from Candidate

| # | Input | Blocks |
|---|---|---|
| 1 | Glistara product/domain + owned features | FR-4.3 |
| 2 | Degree certificate (CSE vs. AI) | FR-1.5 |
| 3 | Confirmation Bhilai Steel Plant internship exists or is the same as BALCO | FR-1.2 |
| 4 | Salary figure confirmation | FR-6.1 |
| 5 | Relocation willingness & contract-work openness | FR-6.2, FR-6.3 |
| 6 | Quantified metrics per role/project (users, features shipped, perf) | FR-4.4 enhancement |

---

## 9. Release Plan / Milestones

| Phase | Scope | Timeline |
|---|---|---|
| **Day 0 (Today)** | FR-1.1–1.4, FR-2, FR-3 (headline, experience field, LinkedIn Experience, dedupe, employer name) | Same day |
| **Week 1** | FR-4, FR-5 (summary, bullets, projects, skills), FR-1.5–1.6 (degree conflict, remaining dedupes) | 7 days |
| **Week 2+** | FR-6 settings, quantify metrics, apply to verified jobs, weekly freshness-filtered searches | Ongoing |

---

## 10. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Salary gap (₹1.8L → ₹7.5L, ~4.2×) triggers recruiter filters/lowballs | High | Justify via JalSaathi-level depth in profile + interview; verify current salary is accurate |
| Unsupported skills surface in a screen call | High | Remove tags until a project evidences them (FR-5.2) |
| Naukri search filter unresponsive (tooling) | Medium | Verify recency via per-listing "Posted X ago" labels; disclose limitation |
| 100+ applicants on target listings | Medium | Prioritize profile fixes (visibility) over raw application volume |
| Glistara info never supplied | Medium | Ship placeholder rewrite using only confirmed facts; flag for later |

---

## 11. Acceptance Criteria

- [ ] Naukri header shows 1 Year 8 Months.
- [ ] LinkedIn Experience section shows both roles with rewritten bullets.
- [ ] Exactly one headline text exists across both platforms (Option A).
- [ ] Zero duplicate entries (internships, accomplishments, education).
- [ ] One employer spelling everywhere.
- [ ] Degree specialization identical on both platforms.
- [ ] JWT, RBAC, REST API Design present as Key Skills; Next.js/GraphQL/Firebase/Swagger removed or evidenced.
- [ ] JalSaathi is the first project, in the 5-part structure.
- [ ] All "Inputs Needed" in §8 either resolved or explicitly marked pending.

---

## 12. Appendix — Reference Artifacts

- **A.** Full audit document (`Sahil_Sharma_Naukri_LinkedIn_Audit.md`) — source of all findings, rewrites, and the copy-paste package (§20).
- **B.** Final headline (copy-paste): `Full Stack Developer | MERN Stack (React.js, Node.js, Express.js, MongoDB) | React Native | REST API | JWT Auth | 1.8 Yrs Exp | Pune`
- **C.** Final skills list (copy-paste): `React Native, React.js, Node.js, Express.js, MongoDB, JavaScript, MERN Stack, Redux, JWT Authentication, RBAC, REST API Design, Socket.io, PostgreSQL, Tailwind CSS, Expo, Git, GitHub, API Integration, Mobile Application Development`
- **D.** Target titles: Full Stack Developer (MERN), React Native Developer, MERN Stack Developer, JavaScript Developer, Node.js Developer.
