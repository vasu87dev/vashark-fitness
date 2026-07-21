export default function ExerciseList({
  selectedDay,
  exercises,
  completedExercises,
  editingExercise,
  editSets,
  editReps,
  onEditSetsChange,
  onEditRepsChange,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  onStartExercise,
}) {
  return (
    <div>
      <h2 className="text-4xl font-black text-center mb-12">
        {selectedDay} Training
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exercises.map((exercise) => {
          const isCompleted = completedExercises.includes(exercise.name);
          const isEditing = editingExercise === exercise.name;

          return (
            <div
              key={exercise.name}
              className={`
                rounded-3xl
                p-8
                transition
                duration-300
                backdrop-blur-2xl
                border

                ${
                  isCompleted
                    ? "bg-gray-900 border-green-500 opacity-70"
                    : "bg-white/10 border-white/10 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                }
              `}
            >
              <div className="flex justify-between items-start mb-5">
                <div className="text-5xl">🏋️</div>

                {!isCompleted && !isEditing && (
                  <button
                    onClick={() => onStartEditing(exercise)}
                    className="text-2xl opacity-60 hover:opacity-100 transition"
                    title="Edit sets/reps"
                  >
                    ✏️
                  </button>
                )}
              </div>

              <h3 className="text-3xl font-black mb-4">{exercise.name}</h3>

              {isEditing ? (
                <div className="mb-8">
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 block mb-1">Sets</label>
                      <input
                        type="number"
                        value={editSets}
                        onChange={(e) => onEditSetsChange(e.target.value)}
                        className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-gray-400 block mb-1">Reps</label>
                      <input
                        type="number"
                        value={editReps}
                        onChange={(e) => onEditRepsChange(e.target.value)}
                        className="w-full p-3 rounded-xl bg-black/50 border border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => onSaveEdit(exercise.name)}
                      className="flex-1 py-2 rounded-xl bg-green-600 hover:bg-green-700 font-bold"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancelEdit}
                      className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 text-lg mb-8">
                  {exercise.sets} Sets × {exercise.reps} Reps
                </p>
              )}

              <button
                disabled={isCompleted || isEditing}
                onClick={() => onStartExercise(exercise)}
                className={`w-full py-4 rounded-2xl font-black text-lg transition duration-300 ${
                  isCompleted || isEditing
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-red-500 hover:bg-gray-600 shadow-[0_0_30px_rgba(255,0,0,0.6)]"
                }`}
              >
                {isCompleted ? "✅ Completed" : "Start Exercise"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}