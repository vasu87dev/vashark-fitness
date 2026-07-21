export default function FinalReportPanel({
  completedExercises,
  missedExercises,
  workoutData,
  onStartNewWorkout,
}) {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white/10 backdrop-blur-2xl rounded-[40px] p-10 border border-white/20">
      <h1 className="text-5xl font-black text-center mb-10 text-red-500">
        Workout Report
      </h1>

      <h2 className="text-3xl mb-5">Completed Exercises</h2>
      <ul className="mb-8">
        {completedExercises.length === 0 ? (
          <p>None</p>
        ) : (
          completedExercises.map((item, index) => (
            <li key={index} className="text-green-400 text-xl">
              ✅ {item}
            </li>
          ))
        )}
      </ul>

      <h2 className="text-3xl mb-5">Needs Improvement</h2>
      <ul className="mb-8">
        {missedExercises.length === 0 ? (
          <p>Perfect Workout 🔥</p>
        ) : (
          missedExercises.map((item, index) => (
            <li key={index} className="text-red-400 text-xl">
              ❌ {item}
            </li>
          ))
        )}
      </ul>

      <h2 className="text-3xl mb-4">Statistics</h2>

      <p className="text-xl">Total Target Reps : {workoutData.totalTargetReps}</p>
      <p className="text-xl">Completed Reps : {workoutData.totalCompletedReps}</p>
      <p className="text-xl">Perfect Sets : {workoutData.perfectSets}</p>
      <p className="text-xl">Failed Sets : {workoutData.failedSets}</p>
      <p className="text-xl">Total Volume Lifted : {workoutData.totalVolume.toFixed(0)}</p>

      <h2 className="text-3xl mt-10 mb-4 text-red-400">AI Coach</h2>
      <p className="text-lg">
        {workoutData.failedSets === 0
          ? "🔥 Excellent workout! Every set met the target. Increase the weight by 2.5–5% next session."
          : workoutData.failedSets <= 2
          ? "💪 Good session. Focus on progressive overload and aim to complete all target reps next time."
          : "⚠️ You missed several sets. Prioritize recovery, sleep, and nutrition, and reduce the weight slightly until your form and consistency improve."}
      </p>

      <div className="mt-10 text-center">
        <button
          onClick={onStartNewWorkout}
          className="bg-red-500 hover:bg-red-600 px-10 py-4 rounded-2xl text-xl font-bold"
        >
          Start New Workout
        </button>
      </div>
    </div>
  );
}