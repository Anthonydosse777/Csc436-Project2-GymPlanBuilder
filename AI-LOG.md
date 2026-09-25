# AI Usage Log


## 2026-09-25
Prompt:
In the gym-plan-builder project, create a new file at src/data/exercises.js.

Export a constant named EXERCISES as an array of at least 16 exercise objects, 
covering these four muscle groups evenly (4 each): "Push", "Pull", "Legs", "Core".

Each object must have these exact fields:
- id: a unique string (e.g. "push-01", "pull-01", "legs-01", "core-01")
- name: string, the real exercise name (e.g. "Barbell Bench Press")
- muscleGroup: string, one of "Push", "Pull", "Legs", "Core"
- equipment: string (e.g. "Barbell", "Dumbbell", "Bodyweight", "Machine", "Cable")
- difficulty: string, one of "Beginner", "Intermediate", "Advanced"
- description: a one-sentence real description of how to perform the exercise

Use real, accurate exercise names and descriptions — no placeholder or lorem ipsum text.
Do not modify any other files. Just create this one data file.

## 2026-09-25
Prompt:
In the gym-plan-builder React project, create these component files. Each should be a 
minimal functional component that renders a labeled placeholder <div> for now — no 
real logic yet, just the file structure and basic JSX so the app renders without errors.

1. src/components/Header.jsx — accepts a prop "planName" and renders it inside an <h1>
2. src/components/FilterBar.jsx — accepts props "activeGroup" and "onSelect", renders 
   a placeholder <div>Filter Bar</div> for now
3. src/components/ExerciseCard.jsx — accepts props "exercise", "isAdded", "onAdd", 
   renders a placeholder <div>Exercise Card</div> for now
4. src/components/ExerciseLibrary.jsx — renders <FilterBar /> and a placeholder 
   <div>Exercise Library</div>, importing FilterBar from './FilterBar'
5. src/components/PlanItem.jsx — accepts props "item", "onUpdate", "onRemove", "onMove", 
   renders a placeholder <div>Plan Item</div> for now
6. src/components/PlanSummary.jsx — accepts prop "plan", renders a placeholder 
   <div>Plan Summary</div> for now
7. src/components/PlanPanel.jsx — renders <PlanSummary /> and a placeholder 
   <div>Plan Panel</div>, importing PlanSummary from './PlanSummary'

Then update src/App.jsx to:
- Import Header, ExerciseLibrary, and PlanPanel from the components folder
- Render Header with a hardcoded planName prop like "My Workout Plan"
- Render ExerciseLibrary and PlanPanel below it inside a <main> element

Keep every component's JSX minimal — this is just scaffolding the file structure and 
import chain so everything renders without console errors. Do not add styling or real 
logic yet. Do not modify src/data/exercises.js.