export default function DayButtons({
  workouts,
  finishedDays,
  onSelectDay,
  onResetWeek,
}) {
  return (
    <>
      <div className="text-center mb-8">
        <p className="text-xl text-gray-300">
          {finishedDays.length} / {Object.keys(workouts).length} workout days completed this week
        </p>
        {finishedDays.length > 0 && (
          <button
            onClick={onResetWeek}
            className="text-sm text-gray-500 hover:text-gray-300 underline mt-2"
          >
            Reset week
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-5 mb-16">
        {Object.keys(workouts).map((day) => (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={`
              px-8 py-4 rounded-2xl font-bold text-lg
              backdrop-blur-xl
              border
              hover:scale-110
              transition duration-300
              ${
                finishedDays.includes(day)
                  ? "bg-green-600/30 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:bg-green-600/40"
                  : "bg-white/10 border-white/20 hover:bg-red-500 shadow-[0_0_25px_rgba(255,0,0,0.4)]"
              }
            `}
          >
            {finishedDays.includes(day) ? `✅ ${day}` : day}
          </button>
        ))}
      </div>
    </>
  );
}