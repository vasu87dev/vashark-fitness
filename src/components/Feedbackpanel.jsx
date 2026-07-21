export default function ExerciseFeedbackPanel({
  exerciseName,
  exerciseFeedback,
  onContinue,
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
        className="text-4xl font-black text-center mb-8"
        style={{
          textShadow: "0 0 10px #ff0000, 0 0 25px #ff0000",
        }}
      >
        {exerciseName} — Review
      </h2>

      <div className="bg-black/40 rounded-2xl p-6 mb-8 min-h-[100px]">
        <h3 className="text-xl font-bold text-red-400 mb-4">Coach Feedback</h3>
        <p className="text-lg text-gray-300 whitespace-pre-line">{exerciseFeedback}</p>
      </div>

      <button
        onClick={onContinue}
        className="
          w-full py-5 rounded-2xl
          bg-red-500 hover:bg-red-600
          text-2xl font-black
          transition duration-300
          shadow-[0_0_40px_rgba(255,0,0,0.6)]
        "
      >
        Continue
      </button>
    </div>
  );
}