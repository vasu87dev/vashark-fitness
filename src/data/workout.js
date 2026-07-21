// The base weekly workout plan. This is the default/starting plan —
// per-user edits (sets/reps overrides) live in localStorage instead
// of here, so editing a workout in the app never touches this file.
const workouts = {
  Monday: [
    { name: "Bench Press", sets: 4, reps: 8 },
    { name: "Incline Dumbbell Press", sets: 4, reps: 10 },
    { name: "Chest Fly", sets: 3, reps: 12 },
    { name: "Shoulder Press", sets: 4, reps: 10 },
    { name: "Lateral Raises", sets: 4, reps: 15 },
    { name: "Tricep Pushdown", sets: 4, reps: 12 },
  ],

  Tuesday: [
    { name: "Pull Ups", sets: 4, reps: 10 },
    { name: "Barbell Row", sets: 4, reps: 10 },
    { name: "Lat Pulldown", sets: 4, reps: 12 },
    { name: "Seated Cable Row", sets: 3, reps: 12 },
    { name: "Barbell Curl", sets: 4, reps: 12 },
    { name: "Hammer Curl", sets: 3, reps: 12 },
  ],

  Wednesday: [
    { name: "Squats", sets: 4, reps: 8 },
    { name: "Leg Press", sets: 4, reps: 12 },
    { name: "Romanian Deadlift", sets: 4, reps: 10 },
    { name: "Leg Curl", sets: 3, reps: 15 },
    { name: "Leg Extension", sets: 3, reps: 15 },
    { name: "Calf Raises", sets: 5, reps: 20 },
  ],

  Thursday: [
    { name: "Incline Bench Press", sets: 4, reps: 8 },
    { name: "Machine Chest Press", sets: 4, reps: 10 },
    { name: "Cable Fly", sets: 3, reps: 15 },
    { name: "Arnold Press", sets: 4, reps: 10 },
    { name: "Upright Row", sets: 3, reps: 12 },
    { name: "Overhead Tricep Extension", sets: 4, reps: 12 },
  ],

  Friday: [
    { name: "Deadlift", sets: 4, reps: 6 },
    { name: "T-Bar Row", sets: 4, reps: 10 },
    { name: "Wide Grip Pulldown", sets: 4, reps: 12 },
    { name: "Face Pull", sets: 3, reps: 15 },
    { name: "EZ Bar Curl", sets: 4, reps: 12 },
    { name: "Preacher Curl", sets: 3, reps: 12 },
  ],

  Saturday: [
    { name: "Front Squat", sets: 4, reps: 8 },
    { name: "Bulgarian Split Squat", sets: 4, reps: 10 },
    { name: "Hack Squat", sets: 4, reps: 12 },
    { name: "Leg Curl", sets: 3, reps: 15 },
    { name: "Walking Lunges", sets: 3, reps: 20 },
    { name: "Standing Calf Raise", sets: 5, reps: 20 },
  ],
};

export default workouts;