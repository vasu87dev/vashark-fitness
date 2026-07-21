import { getCurrentStreak } from "../analysis/exerciseAnalysis";

export default function ProgressView({ workoutHistory, onClearHistory }) {
  return (
    <div className="max-w-4xl mx-auto mb-16 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-black">Your Progress</h2>

        {workoutHistory.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-sm text-gray-400 hover:text-red-400 underline transition"
          >
            Clear History
          </button>
        )}
      </div>

      {workoutHistory.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          No saved workouts yet — finish and save a workout to start tracking progress.
        </p>
      ) : (
        <>
          {/* STATS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-black/40 rounded-2xl p-6 text-center">
              <p className="text-4xl font-black text-red-400 mb-2">
                {workoutHistory.length}
              </p>
              <p className="text-gray-300">Workouts Saved</p>
            </div>

            <div className="bg-black/40 rounded-2xl p-6 text-center">
              <p className="text-4xl font-black text-red-400 mb-2">
                {getCurrentStreak(workoutHistory)}
              </p>
              <p className="text-gray-300">Day Streak</p>
            </div>

            <div className="bg-black/40 rounded-2xl p-6 text-center col-span-2 md:col-span-1">
              <p className="text-4xl font-black text-red-400 mb-2">
                {Math.round(
                  (workoutHistory.reduce(
                    (sum, h) => sum + h.completedExercises.length,
                    0
                  ) /
                    workoutHistory.reduce(
                      (sum, h) =>
                        sum + h.completedExercises.length + h.missedExercises.length,
                      0
                    )) *
                    100
                ) || 0}
                %
              </p>
              <p className="text-gray-300">Overall Hit Rate</p>
            </div>
          </div>

          {/* REPS PER SESSION BAR CHART */}
          <h3 className="text-2xl font-bold mb-6">Completed Reps Per Session</h3>

          <div className="space-y-3 mb-10">
            {workoutHistory.map((session, index) => {
              const maxReps = Math.max(
                ...workoutHistory.map((h) => h.workoutData.totalCompletedReps),
                1
              );
              const widthPct = (session.workoutData.totalCompletedReps / maxReps) * 100;

              return (
                <div key={index}>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>
                      {session.day} — {new Date(session.date).toLocaleDateString()}
                    </span>
                    <span>{session.workoutData.totalCompletedReps} reps</span>
                  </div>
                  <div className="w-full bg-black/40 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-red-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SESSION LIST */}
          <h3 className="text-2xl font-bold mb-6">Session History</h3>

          <div className="space-y-4">
            {[...workoutHistory].reverse().map((session, index) => (
              <div
                key={index}
                className="bg-black/40 rounded-2xl p-5 flex flex-wrap justify-between items-center gap-3"
              >
                <div>
                  <p className="font-bold text-lg">{session.day}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(session.date).toLocaleString()}
                  </p>
                </div>

                <div className="text-sm text-gray-300">
                  ✅ {session.completedExercises.length} done · ❌{" "}
                  {session.missedExercises.length} missed
                </div>

                {session.rating ? (
                  <div className="text-yellow-400">
                    {"★".repeat(session.rating)}
                    {"☆".repeat(5 - session.rating)}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">Not rated</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}