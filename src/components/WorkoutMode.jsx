export default function WorkoutMode({
  selectedExercise,
  currentSet,
  completedReps,
  completedWeight,
  onRepsChange,
  onWeightChange,
  onCompleteSet,
  resting,
  restTimeLeft,
  onSkipRest,
  canEditPreviousSet,
  onEditPreviousSet,
}) {
  return (
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
          textShadow: "0 0 10px #ff0000, 0 0 25px #ff0000",
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

      {resting ? (
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Rest before your next set</p>
          <p className="text-7xl font-black text-red-500 mb-8">{restTimeLeft}s</p>
          <button
            onClick={onSkipRest}
            className="
              w-full py-5 rounded-2xl
              bg-white/10 hover:bg-white/20
              border border-white/20
              text-xl font-bold
              transition duration-300
            "
          >
            Skip Rest
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <label className="text-sm text-gray-400 block mb-2">Reps</label>
              <input
                type="number"
                placeholder="Completed reps"
                value={completedReps}
                onChange={(e) => onRepsChange(e.target.value)}
                className="
                  w-full p-5 rounded-2xl
                  bg-black/50
                  border border-white/20
                  text-white text-xl
                  focus:outline-none
                  focus:border-red-500
                "
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-400 block mb-2">Weight</label>
              <input
                type="number"
                placeholder="Weight used"
                value={completedWeight}
                onChange={(e) => onWeightChange(e.target.value)}
                className="
                  w-full p-5 rounded-2xl
                  bg-black/50
                  border border-white/20
                  text-white text-xl
                  focus:outline-none
                  focus:border-red-500
                "
              />
            </div>
          </div>

          <button
            onClick={onCompleteSet}
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

          {canEditPreviousSet && (
            <button
              onClick={onEditPreviousSet}
              className="
                w-full py-3 mt-4 rounded-2xl
                bg-transparent hover:bg-white/10
                border border-white/20
                text-md font-bold text-gray-300
                transition duration-300
              "
            >
              ✏️ Edit Previous Set
            </button>
          )}
        </>
      )}
    </div>
  );
}