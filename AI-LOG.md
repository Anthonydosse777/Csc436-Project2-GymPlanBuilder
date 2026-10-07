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
Prompt:
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

## 2026-09-29
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


## 2026-10-01
Prompt:
In the gym-plan-builder React project, restyle the app to match a dark, premium 
fitness-brand aesthetic (dark charcoal background, gold/amber accent color, bold 
uppercase headings, cards with a colored left-border accent). Updated CSS custom 
properties for the dark color theme, restyled the header, cards, buttons, filter pills, 
inputs, and icons to use the new palette while preserving existing layout, spacing, 
shadows, and animations from prior styling passes.

Reviewed: Confirmed text contrast is readable on the dark background, checked desktop 
and mobile widths, and confirmed all existing functionality (search, filter, add/remove, 
custom exercise form) still works after the restyle.

## 2026-10-03
Prompt:
In the gym-plan-builder React project, restyle the app to match the visual direction of 
my Project 1 "Gym Starter Guide" site: dark premium fitness brand, black and gold, heavy 
uppercase typography. Keep all React logic, state, props and component behavior working 
exactly as-is. Replace the centered header with a sticky top nav (brand name, 2px gold 
bottom line, theme toggle), add a hero card holding the editable plan name as a large gold 
headline with real intro copy, give section headings a gold bar and rule, add a dark/light 
theme toggle remembered in localStorage, use Poppins 800/700 and Inter, share one card style, 
turn the plan summary into a stat card, and add an IntersectionObserver scroll reveal 
(src/hooks/useReveal.js) plus a 3D hover tilt on exercise cards, all disabled under 
prefers-reduced-motion. Use CSS custom properties, no repeated blocks, no horizontal scroll 
at 375px, visible focus outlines, and 4.5:1 text contrast in both themes.

Reviewed: Ran npm run build successfully. Checked in headless Chrome at 375px and 1280px in 
both themes: no horizontal scroll, no console errors, theme persists across reloads, 
add/remove, rename, filter and search still work, and reduced motion shows all content 
immediately. Checked text contrast ratios for both palettes (all at least 4.5:1).


## 2026-10-03
Prompt:
In the gym-plan-builder React project, restyle the app to match this visual direction 
(modeled on my Project 1 "Gym Starter Guide" site): dark premium fitness brand, black 
and gold, heavy uppercase typography. Keep all React logic, state, props and component 
behavior working exactly as-is. Do not copy any files from another project and do not 
use any external image URLs.

1. TOP NAV: Replace the centered header with a sticky top bar: bold uppercase brand name 
   on the left ("GYM PLAN BUILDER"), a thin 2px gold line along its bottom edge, and a 
   theme toggle button on the right (see 4). Keep the editable plan name input working 
   by placing it in the hero (see 2).

2. HERO CARD: Below the nav, add a rounded hero card (large radius, 1px subtle border, 
   dark gradient background with a faint diagonal-stripe or radial-gold-glow pattern 
   done in pure CSS, no images). Inside: a small gold uppercase eyebrow label with wide 
   letter-spacing and a short gold underline, then the plan name as the large heavy 
   uppercase gold headline (this is the existing controlled input, styled to look like 
   a headline with a soft text-shadow and a visible focus outline), then two short 
   paragraphs of real copy about building a personal workout plan from the exercise 
   library (no placeholder text). Hero text column max-width around 38rem.

3. SECTION HEADINGS: Give the library heading and the plan heading a short gold vertical 
   bar before the text and a thin gold rule underneath, in the style of Project 1.

4. THEME TOGGLE: Dark theme by default plus a light theme. Add a theme useState in 
   App.jsx that sets a data-theme attribute on document.documentElement, remembered in 
   localStorage (wrap all reads and writes in try/catch). Create 
   src/components/ThemeToggle.jsx: a pill button in the nav labeled "White background" 
   in dark mode and "Black background" in light mode, with aria-pressed. The light theme 
   uses a white page, and a darker gold (about #8a6a12) so gold text keeps at least 
   4.5:1 contrast.

5. TYPOGRAPHY: Use Poppins at weight 800 for the hero headline and 700 for headings, 
   uppercase with letter-spacing on the nav and eyebrow, Inter for body text. Add 
   weight 800 to the existing Google Fonts link in index.html if needed.

6. CARDS AND PANELS: Exercise cards, the add-exercise form, plan panel and plan items 
   share one card style (rounded, subtle border, soft shadow). The plan summary uses a 
   stat-card look: gold left border, large gold numbers for the total, and muted labels. 
   Filter pills and buttons stay gold-on-dark with the existing hover and active states.

7. ANIMATIONS: Add a scroll-reveal for the hero, library cards and plan panel using 
   IntersectionObserver in a small custom hook at src/hooks/useReveal.js (fade and slide 
   up, once only). Add a subtle 3D tilt toward the mouse on exercise cards on hover, 
   skipped on touch devices. prefers-reduced-motion must disable every animation, 
   transition and tilt, and show all content immediately.

8. RULES: Use CSS custom properties and shared classes, with no repeated CSS blocks, and 
   remove any rules that are no longer used. No console errors. No horizontal scrolling 
   at 375px (hero stacks, nav wraps or shrinks cleanly). Visible :focus-visible outlines 
   on every interactive element. Text contrast of at least 4.5:1 in both themes. 
   Keep MuscleIcon on exercise cards. Do not change the logic of plan, search, filter, 
   custom exercise or plan name features. Run npm run build at the end and confirm it 
   succeeds.

Reviewed: Tested both themes and the toggle after a refresh, plus search, filters, 
add/remove, the custom exercise form and plan name editing. Checked focus outlines, 375px 
width, and confirmed npm run build succeeds with no console errors.