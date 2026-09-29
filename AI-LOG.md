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

## 2026-09-25
In the gym-plan-builder React project, wire up the "add to plan" feature using lifted state.

1. In src/App.jsx:
   - Add a useState for "plan", initialized as an empty array []
   - Write a function handleAddToPlan(exercise) that adds the exercise to the plan array 
     only if its id isn't already in there (prevent duplicates), using a new array (no push/mutation)
   - Write a function handleRemoveFromPlan(exerciseId) that returns a new plan array with 
     that id filtered out
   - Pass "plan" and "onAddToPlan" (handleAddToPlan) as props to ExerciseLibrary
   - Pass "plan" and "onRemoveFromPlan" (handleRemoveFromPlan) as props to PlanPanel

2. In src/components/ExerciseLibrary.jsx:
   - Accept new props "plan" and "onAddToPlan"
   - For each exercise rendered, compute isAdded by checking if plan contains an item 
     with that exercise's id
   - Pass isAdded and onAdd={() => onAddToPlan(exercise)} to each ExerciseCard

3. In src/components/ExerciseCard.jsx:
   - Render a <button> that calls onAdd when clicked
   - If isAdded is true, the button should say "Added ✓" and be disabled
   - If isAdded is false, the button should say "Add to Plan"

4. In src/components/PlanPanel.jsx:
   - Accept new props "plan" and "onRemoveFromPlan"
   - If plan.length is 0, render a message like "Your plan is empty. Add exercises from 
     the library." (this is our conditional rendering requirement)
   - If plan.length is greater than 0, render the plan using .map(), one <PlanItem> per 
     exercise, using exercise.id as the key
   - Pass each exercise and a function to remove it (onRemove={() => onRemoveFromPlan(exercise.id)}) 
     to PlanItem
   - Still render <PlanSummary plan={plan} /> below the list

5. In src/components/PlanItem.jsx:
   - Display the exercise's name
   - Render a "Remove" button that calls the onRemove prop when clicked

Do not add styling yet. Do not modify FilterBar.jsx, PlanSummary.jsx, or exercises.js.
Never mutate state directly — always create new arrays.

## 2026-09-28
Prompt:
In the gym-plan-builder React project, wire up search and filtering in the exercise library.

1. In src/components/ExerciseLibrary.jsx:
   - Add a useState for "searchTerm", initialized as an empty string ""
   - Add a useState for "activeGroup", initialized as "All"
   - Add a controlled <input> above the exercise list:
     - type="text", placeholder="Search exercises..."
     - value={searchTerm}
     - onChange updates searchTerm via setSearchTerm(e.target.value)
   - Filter EXERCISES before mapping: an exercise should show only if
     (activeGroup === "All" OR exercise.muscleGroup === activeGroup)
     AND its name includes searchTerm (case-insensitive)
   - If the filtered list is empty, render a message like "No exercises match your search."
     (conditional rendering)
   - Pass "activeGroup" and a function "onSelect" (that calls setActiveGroup) as props to FilterBar

2. In src/components/FilterBar.jsx:
   - Render one button per group: "All", "Push", "Pull", "Legs", "Core"
   - Each button calls onSelect(group) when clicked
   - The button matching the current activeGroup prop should visually indicate it's active 
     (e.g. add a class name like "active" — no need for real styling yet, just apply the class)

Do not modify ExerciseCard.jsx, PlanPanel.jsx, PlanItem.jsx, PlanSummary.jsx, App.jsx, or exercises.js.

## 2026-09-29
Prompt:
In the gym-plan-builder React project, add a form for users to create their own custom exercises.

1. Create src/components/AddExerciseForm.jsx:
   - A form with controlled inputs (all values in useState, no defaultValue):
     - Text input for "name" (required)
     - <select> for "muscleGroup" with options: Push, Pull, Legs, Core
     - Text input for "equipment" (e.g. Barbell, Dumbbell, Bodyweight, Machine, Cable)
     - <select> for "difficulty" with options: Beginner, Intermediate, Advanced
     - Text input for "description" (required)
   - A submit button labeled "Add Exercise"
   - On submit (handle via onSubmit, call e.preventDefault()):
     - If name or description is empty, do not submit — show a small inline message 
       like "Name and description are required." (conditional rendering)
     - Otherwise, build an exercise object with a unique id (use something like 
       `custom-${Date.now()}`), and call a prop function called onAddExercise with 
       that object
     - After successful submit, clear all the form fields back to empty/default

2. In src/components/ExerciseLibrary.jsx:
   - Add a useState called "customExercises", initialized as an empty array []
   - Write a function handleAddExercise(exercise) that adds the new exercise to 
     customExercises using a new array (no mutation)
   - Combine EXERCISES and customExercises into one array before filtering/mapping 
     (so custom exercises appear in the list, are searchable, and filterable, exactly 
     like the built-in ones)
   - Render <AddExerciseForm onAddExercise={handleAddExercise} /> above the exercise list, 
     below the search/filter controls

Do not modify App.jsx, PlanPanel.jsx, PlanItem.jsx, PlanSummary.jsx, or exercises.js.
Never mutate arrays directly — always create new ones.
