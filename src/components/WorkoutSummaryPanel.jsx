export default function WorkoutSummaryPanel({
  workoutRating,
  workoutNote,
  onRatingChange,
  onNoteChange,
  onSave,
}) {
  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10">
      <h2 className="text-5xl font-black text-center mb-8">Workout Summary 🔥</h2>

      {/* RATING */}
      <div className="flex justify-center gap-4 mb-8">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className={`text-5xl ${
              workoutRating >= star ? "text-yellow-400" : "text-gray-500"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* NOTE */}
      <textarea
        placeholder="How was your workout?"
        value={workoutNote}
        onChange={(e) => onNoteChange(e.target.value)}
        className="w-full h-40 p-5 rounded-2xl bg-black border border-white/20 text-white mb-8"
      />

      <button
        onClick={onSave}
        className="w-full py-5 rounded-2xl bg-red-500 hover:bg-red-600 text-2xl font-black"
      >
        Save Workout
      </button>
    </div>
  );
}