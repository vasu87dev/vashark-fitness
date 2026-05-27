import { useState } from "react";
import david2 from "../assets/gym4.jpg";
export default function Days() {

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

  const [selectedDay, setSelectedDay] = useState(null);

  const [selectedExercise, setSelectedExercise] = useState(null);

  const [currentSet, setCurrentSet] = useState(1);

  const [completedReps, setCompletedReps] = useState("");

  const completeSet = () => {

    if (currentSet < selectedExercise.sets) {
      setCurrentSet(currentSet + 1);
      setCompletedReps("");
    } else {
      alert("Workout Completed 🔥");
      setSelectedExercise(null);
      setCurrentSet(1);
      setCompletedReps("");
    }
  };

  return (
    //<div className="min-h-screen bg-black text-white overflow-hidden relative">
<div

      className="min-h-screen w-full relative text-gray-300 overflow-hidden"


      
      style={{
        backgroundImage: `url(${david2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
         minHeight: "100vh",
      }}
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 p-8">

        {/* TITLE */}
        <h1
          className="text-6xl md:text-7xl font-black text-center mb-14"
          style={{
            textShadow:
              "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000",
          }}
        >
          VASHARK 
        </h1>

        {/* DAY BUTTONS */}
        <div className="flex flex-wrap justify-center gap-5 mb-16">

          {Object.keys(workouts).map((day) => (

            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setSelectedExercise(null);
              }}
              className="
                px-8 py-4 rounded-2xl font-bold text-lg
                bg-white/10 backdrop-blur-xl
                border border-white/20
                hover:scale-110
                hover:bg-red-500
                transition duration-300
                shadow-[0_0_25px_rgba(255,0,0,0.4)]
              "
            >
              {day}
            </button>

          ))}
        </div>

        {/* EXERCISE LIST */}
        {selectedDay && !selectedExercise && (

          <div>

            <h2 className="text-4xl font-black text-center mb-12">
              {selectedDay} Training
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {workouts[selectedDay].map((exercise) => (

                <div
                  key={exercise.name}
                  className="
                    bg-white/10
                    border border-white/10
                    backdrop-blur-2xl
                    rounded-3xl
                    p-8
                    hover:scale-105
                    transition
                    duration-300
                    shadow-[0_0_30px_rgba(255,255,255,0.08)]
                  "
                >

                  <div className="text-5xl mb-5">
                    🏋️
                  </div>

                  <h3 className="text-3xl font-black mb-4">
                    {exercise.name}
                  </h3>

                  <p className="text-gray-300 text-lg mb-8">
                    {exercise.sets} Sets × {exercise.reps} Reps
                  </p>

                  <button
                    onClick={() => {
                      setSelectedExercise(exercise);
                      setCurrentSet(1);
                    }}
                    className="
                      w-full py-4 rounded-2xl
                      bg-red-500
                      hover:bg-gray-600
                      font-black text-lg
                      transition duration-300
                      shadow-[0_0_30px_rgba(255,0,0,0.6)]
                    "
                  >
                    Start Exercise
                  </button>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* WORKOUT MODE */}
        {selectedExercise && (

          <div
            className="
              max-w-2xl mx-auto
              bg-white/10
              border border-white/10
              backdrop-blur-2xl
              rounded-[40px]
              p-10
              mt-10
              shadow-[0_0_50px_rgba(255,0,0,0.25)]
            "
          >

            <h2
              className="text-5xl font-black text-center mb-10"
              style={{
                textShadow:
                  "0 0 10px #ff0000, 0 0 25px #ff0000",
              }}
            >
              {selectedExercise.name}
            </h2>

            <div className="text-center mb-10">

              <p className="text-3xl font-bold mb-4">
                Set {currentSet} / {selectedExercise.sets}
              </p>

              <p className="text-2xl text-red-400 font-bold">
                Target Reps: {selectedExercise.reps}
              </p>

            </div>

            <input
              type="number"
              placeholder="Enter completed reps"
              value={completedReps}
              onChange={(e) => setCompletedReps(e.target.value)}
              className="
                w-full p-5 rounded-2xl
                bg-black/50
                border border-white/20
                text-white text-xl
                mb-8
                focus:outline-none
                focus:border-red-500
              "
            />

            <button
              onClick={completeSet}
              className="
                w-full py-5 rounded-2xl
                bg-red-500 hover:bg-red-600
                text-2xl font-black
                transition duration-300
                shadow-[0_0_40px_rgba(255,0,0,0.6)]
              "
            >
              Complete Set
            </button>

          </div>
        )}

      </div>
    </div>
  );
}