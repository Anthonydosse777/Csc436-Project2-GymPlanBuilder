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
