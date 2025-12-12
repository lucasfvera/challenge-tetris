# Vinci Frontend/3D Take-Home Project
## Overview
Choose one of the two options below and complete it within ~4–6 hours of focused work. We don’t expect feature-parity with production apps—what we care about most is code quality, clarity of thought, and UX polish. If you go over time, just note where you stopped and what you’d do next.

You may use TypeScript (preferred), React 18+, Next.js, Python, PosrgreSQL and common libraries. For 3D, React Three Fiber is preferred (it matches our stack), but plain Three.js is acceptable.
Please include a short README that explains: goals, decisions, trade-offs, how to run, and what you’d tackle next.

## Option A — Interactive 3D Scene (React Three Fiber preferred)
Build a small web app that renders a single 3D object or assembly and supports at least three distinct manipulations.
Core Requirements
Rendering


Render a 3D object (e.g., parametric primitive, GLTF, or a small mechanical assembly).


Basic scene setup: camera, lights, and a neutral background.


Responsive canvas (handles window resize).


Manipulations (pick 3+):


Appearance: Change color or switch PBR materials/textures without losing fine surface detail (e.g., preserve normal/roughness maps).


Geometry: Live manipulation of a point cloud or vertex positions (e.g., filter, threshold, or deform a small region).


Camera: Smooth zoom from “whole object” to extreme close-up without clipping; preserve detail with appropriate near/far planes.


Exploded view: If using a mechanical part with subparts, toggle an exploded view that clearly reveals the assembly layers/pieces, and a smooth transition back.


Sectioning/Slicing: Clip planes to inspect the interior.


Interaction: Object picking (click or hover), highlight on selection, show small metadata tooltip.
Version History
Record the changes to the manipulations.
Ability to go back and visualize the older version.


Controls & UX


Intuitive controls (mouse/touch). If you use orbit controls, keep limits sensible.


A compact UI (sidebar, toolbar, or HUD) to trigger manipulations and show the current state.


60fps target on a modest laptop for typical scenes; degrade gracefully when heavy.


Engineering Quality


Typed code (TS), modular components (e.g., <Scene>, <Controls>, <Model>).


No obvious memory leaks; clean up animations and event listeners.


Linting/formatting (e.g., ESLint + Prettier) and at least a couple of unit tests for non-visual logic (e.g., math utilities).


Nice-to-Haves (pick any)
Load a GLTF/GLB model asynchronously with a suspense fallback.


Basic physically-based materials with environment lighting (HDRI).


A shader touch (e.g., custom matcap, clipping outline, or a simple GLSL effect).


Performance hooks: frustum culling, instancing, or useMemo/useFrame optimizations.


Minimal accessibility (keyboard shortcuts, focus states, aria labels on controls).


Tech Tips (if using React Three Fiber)
@react-three/fiber + @react-three/drei for helpers.


Keep camera near/far tuned to avoid z-fighting during extreme zoom.


If you do point clouds: THREE.Points with a small test dataset (e.g., generated sphere).




## Option B — Tetris in the Browser (React preferred; Three.js bonus)
Implement the classic Tetris game with a clean UI and solid game loop. Feel free to get creative with visuals; gameplay must be correct.
<span id="option-b-tetris"><span>

### Core Requirements
**Gameplay**

- Standard 10×20 board, 7 tetrominoes with correct rotations (SRS or your documented variant).
- Gravity with increasing speed per level.
- Line clear detection (single/double/triple/tetris) and scoring.
- Next piece preview and restart.
- Keyboard controls: left/right, rotate (CW), soft drop; hard drop optional.


**UX/Visuals**

- Smooth piece movement (no jank on key repeat).
- Clear visual states: active piece, locked blocks, ghost/landing preview (optional).
- Responsive layout; looks good on laptop and tablet sizes.


**Maintain game state**

By using the backend (Python/PostgreSQL) save the state of the game.
Means if you refresh the browser it should show the ability to resume the game from the last saved spot.


**(Bonus) Checkpoints**
- Provide pause/resume.
- Provide a way to save the paused game. Also resume from previous checkpoints.


**Engineering Quality**

- Clean separation of game state (board, piece, RNG/“bag”) from rendering.
- Unit tests for core logic (e.g., rotation, collision, line clear).
- No timers piling up; pause/resume behaves correctly.


### Nice-to-Haves (pick any)

- Hold piece and modern 7-bag randomizer.
- Three.js/React Three Fiber rendering (3D blocks, simple lighting).
- Sound effects (muteable).
- Persist high score to localStorage.
- Basic accessibility (keyboard-only works; focus/aria on controls).


## What to Submit

- Git repo (GitHub/GitLab link) with:
- /src code
- README: how to run, your choices/trade-offs, what’s incomplete, and next steps
- Tests (at least a couple for logic)
- If deployed, add a link (Vercel/Netlify/etc.)

Scripts:

```sh
    npm run dev # start
    npm run build #production build
    npm run test # unit tests
```


## Constraints & Guidelines

- Timebox: Aim for 4–6 hours. It’s okay to submit partial work—call out what’s left.
- Libraries: Use anything reasonable; for 3D, React Three Fiber preferred (or vanilla Three.js).
- Assets: If you use external models/textures/sounds, include licensing/links in the README.
- AI tools: Allowed for boilerplate or reference, but you must understand and own the code. Note any AI-generated portions in the README.
- Accessibility: Do something small but intentional (keyboard focus, aria labels, color contrast).
- No build errors or console spam in normal usage.


## Review Process

We’ll run your app locally, skim the code, and spend ~10–15 minutes trying features. In the follow-up chat, we’ll ask about:
Why you chose your architecture


Performance trade-offs (e.g., render loop, memoization, culling)


One thing you’d refactor with more time


For 3D: camera/lighting/material choices; for Tetris: rotation/collision design







Submission Checklist
Runs with npm i && npm run dev


Clear README with screenshots or a short GIF


At least 2 focused unit tests


No obvious performance or memory issues


Notes on what you’d do next

