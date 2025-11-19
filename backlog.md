# Softball Whiteboard App – Backlog & Roadmap

This document tracks future enhancements and improvements for the app.  
Items marked as **[placeholder]** are not part of v1 but are planned for later iterations.

---

## 🚀 Roadmap

### Short-Term (v1 focus)
- Deliver a functional MVP for umpires:
  - Built-in NCAA 2‑umpire scenarios
  - Whiteboard mode with draggable players and sketch layer
  - Mode toggle between Whiteboard and Mechanics
- Keep data modularized (`/data/players.js`, `/data/scenarios.js`)
- Ensure stability and usability for umpire training

### Medium-Term (v2+)
- Custom scenario import [placeholder]
- Audio narration [placeholder]
- Extensibility for rule codes [placeholder]
- Crew size expansion [placeholder]
- UI polish [placeholder]

---

## ✅ Completed / In Progress
- **Data modularization**  
  Player and scenario definitions moved into `/data/players.js` and `/data/scenarios.js`.

---

## 📋 Backlog Items

1. **Custom scenario import** [placeholder]  
   - Allow coaches to upload or import JSON files defining mechanics scenarios.  
   - Validate schema, merge into `scenarios` state, and surface in `ScenarioPicker`.

2. **Audio narration** [placeholder]  
   - Add optional voice‑over that reads scenario descriptions and overlays aloud.  
   - Useful for hands‑free training or accessibility.  
   - Could leverage Expo’s `Speech` API or a lightweight narration library.

3. **Extensibility for rule codes** [placeholder]  
   - Add support for NFHS, USA Softball, or other umpire codes beyond NCAA.  
   - Organize scenarios by rule set, then crew size, then situation.

4. **Crew size expansion** [placeholder]  
   - Extend mechanics logic to 3‑ and 4‑umpire crews.  
   - Ensure scenario playback scales cleanly with additional umpire positions.

5. **UI polish** [placeholder]  
   - Improve scenario overlays (styling, animations, clarity).  
   - Add onboarding tooltips for new users.  
   - Consider a “dark mode” or theme toggle for better visibility outdoors.

---

## 🎯 Priorities

- **High Priority (next release cycle)**  
  - Custom scenario import  
  - Extensibility for rule codes  

- **Medium Priority**  
  - Crew size expansion  
  - Audio narration  

- **Low Priority / Nice-to-have**  
  - UI polish (tooltips, dark mode, animations)

---

## 🔗 Dependencies

- **Custom scenario import**  
  - Depends on defining a JSON schema for scenarios.  
  - Requires validation logic and UI for file selection/import.  

- **Audio narration**  
  - Depends on Expo’s `Speech` API or similar library.  
  - Requires integration into `MechanicsPlayer` to narrate step descriptions.  

- **Extensibility for rule codes**  
  - Depends on refactoring `scenarios.js` to support multiple rule sets.  
  - Requires UI changes in `ScenarioPicker` to select rule code first.  

- **Crew size expansion**  
  - Depends on scenario data refactor (to handle variable umpire counts).  
  - Requires updates to `MechanicsPlayer` rendering logic.  

- **UI polish**  
  - Independent, but benefits from stable core components.  
  - Can be layered in once core functionality is locked.

---

## Notes
- v1 is focused on **umpires** with built‑in NCAA 2‑umpire scenarios.  
- Coach‑authored custom scenarios and accessibility features are deferred to later versions.  