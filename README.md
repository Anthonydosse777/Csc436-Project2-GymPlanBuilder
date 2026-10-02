# Gym Plan Builder

An interactive React app where users browse an exercise library, build a personal workout 
plan, and track it with a live summary.

Built for CSC 436 · Full-Stack Web Development · Project 2: React Fundamentals.

Live site: https://csc436-gym-project2.netlify.app

## Running it locally

This project uses Vite and npm. Clone the repository and install dependencies:

```
git clone https://github.com/Anthonydosse777/Csc436-Project2-GymPlanBuilder.git
cd Csc436-Project2-GymPlanBuilder
npm install
npm run dev
```

Then visit the local URL Vite prints (usually http://localhost:5173).

To build for production:

```
npm run build
```

This outputs a dist/ folder, which is what gets deployed to Netlify (build command 
npm run build, publish directory dist).

## Files

| File / Folder | Contents |
|---|---|
| src/App.jsx | Root component — holds the plan and plan name state, renders Header, ExerciseLibrary, and PlanPanel |
| src/components/Header.jsx | Editable plan name (controlled input) |
| src/components/ExerciseLibrary.jsx | Search, muscle-group filter, renders the exercise list |
| src/components/FilterBar.jsx | Muscle group filter pills |
| src/components/ExerciseCard.jsx | A single exercise with its "Add to Plan" button |
| src/components/MuscleIcon.jsx | Small SVG icon per muscle group |
| src/components/AddExerciseForm.jsx | Form for creating a custom exercise |
| src/components/PlanPanel.jsx | The user's current plan, renders PlanItem and PlanSummary |
| src/components/PlanItem.jsx | A single exercise in the plan, with a Remove button |
| src/components/PlanSummary.jsx | Live totals: exercise count and muscle groups covered |
| src/data/exercises.js | The built-in exercise library (16 exercises, 4 per muscle group) |
| AI-LOG.md | Log of AI-assisted prompts used while building this project |

## How the project meets the brief

Components. Nine components, each in its own file, each receiving data through props 
rather than hardcoding its own content.

State. Five independent pieces of useState: plan and planName in App, searchTerm and 
activeGroup in ExerciseLibrary, and customExercises also in ExerciseLibrary. State is 
never mutated directly — every update builds a new array or value with spread/filter/map.

Lists. The exercise library and the plan list are both rendered with .map(), keyed by 
each exercise's unique id (not array index), so React can track items correctly even as 
the list is filtered, reordered, or items are added/removed.

Controlled inputs. The search box, the plan name field, and all five fields of the custom 
exercise form (name, muscle group, equipment, difficulty, description) are controlled — 
their values live in state, not the DOM.

Lifted state. plan is owned by App and shared between ExerciseLibrary (to know which 
exercises are already added) and PlanPanel (to display them). planName is owned by App 
and shared between Header (where it's edited) and PlanPanel (where it's also displayed), 
so both stay in sync.

Conditional rendering. An empty-plan message, a "no exercises match your search" message, 
the "Added ✓" vs. "Add to Plan" button state, the custom-exercise form's required-fields 
validation message, and the plan summary's balanced-plan note all render conditionally 
based on current state.

What the app does. This isn't a page of disconnected widgets — adding an exercise in the 
library immediately updates the plan panel, the plan summary, and the "Added ✓" state on 
that same card, because they all read from the same lifted plan state in App.

## Features

- Browse a library of 16 built-in exercises across Push, Pull, Legs, and Core
- Search exercises by name and filter by muscle group
- Add your own custom exercises (name, muscle group, equipment, difficulty, description), 
  which are fully searchable and filterable alongside the built-in library
- Build a personal plan by adding exercises from the library
- Remove exercises from your plan
- Rename your plan — the name updates live across the app
- A live plan summary: total exercises and which muscle groups are covered, with a note 
  if your plan isn't balanced across all four groups

## Accessibility notes

- Every text input and select has an associated label (visible or screen-reader-only)
- Muscle group icons carry an aria-label describing what they represent
- Visible focus states on every interactive element
- Checked at 375px width for mobile layout with no horizontal scrolling

## AI usage

This project was built with help from Claude and Claude Code. See AI-LOG.md for the 
prompts used and what was reviewed after each one.
