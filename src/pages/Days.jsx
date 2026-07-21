import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import david2 from "../assets/gymki.png";

import workouts from "../data/workout";
import { useLocalStorage } from "../hooks/LocalStorage1";
import { analyzeExercisePerformance } from "../analysis/exerciseAnalysis";

import DayButtons from "../components/Daybuttons";
import ExerciseList from "../components/ExerciseList";
import WorkoutMode from "../components/WorkoutMode";
import ExerciseFeedbackPanel from "../components/Feedbackpanel";
import WorkoutSummaryPanel from "../components/WorkoutSummaryPanel";
import FinalReportPanel from "../components/FinalReportPanel";
import ProgressView from "../components/ProgressView";

const REST_DURATION = 60;

export default function Days() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [currentSet, setCurrentSet] = useState(1);
  const [completedReps, setCompletedReps] = useState("");
  const [completedWeight, setCompletedWeight] = useState("");

  // Per-set results for the exercise currently in progress
  const [setsLog, setSetsLog] = useState([]);

  // AI feedback for the exercise just finished
  const [exerciseFeedback, setExerciseFeedback] = useState("");
  const [showExerciseFeedback, setShowExerciseFeedback] = useState(false);

  const [workoutRating, setWorkoutRating] = useState("");
  const [workoutNote, setWorkoutNote] = useState("");
  const [completedExercises, setCompletedExercises] = useLocalStorage("vashark_completedExercises", []);
  const [missedExercises, setMissedExercises] = useLocalStorage("vashark_missedExercises", []);
  const [showFinalReport, setShowFinalReport] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Days whose workout has been fully finished — used to color the day buttons
  const [finishedDays, setFinishedDays] = useLocalStorage("vashark_finishedDays", []);

  // A log of every completed workout session, kept across refreshes
  const [workoutHistory, setWorkoutHistory] = useLocalStorage("vashark_workoutHistory", []);

  // Toggles the progress-over-time view — opens straight into it if we
  // arrived here from the "Progress" link on the Home page
  const location = useLocation();
  const navigate = useNavigate();
  const [showProgress, setShowProgress] = useState(location.state?.showProgress || false);

  // User overrides for sets/reps, per day + exercise. Shape:
  // { [day]: { [exerciseName]: { sets, reps } } }
  // Persisted so edits to the plan survive a refresh.
  const [customWorkouts, setCustomWorkouts] = useLocalStorage("vashark_customWorkouts", {});

  // Which exercise (by name) is currently being edited, and the draft values
  const [editingExercise, setEditingExercise] = useState(null);
  const [editSets, setEditSets] = useState("");
  const [editReps, setEditReps] = useState("");

  // Last weight used per day+exercise, so the weight input can be
  // pre-filled next time instead of starting blank every session.
  // Shape: { [day]: { [exerciseName]: weight } }
  const [lastWeights, setLastWeights] = useLocalStorage("vashark_lastWeights", {});

  // Rest timer between sets
  const [resting, setResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(REST_DURATION);

  const [workoutData, setWorkoutData] = useState({
    totalTargetReps: 0,
    totalCompletedReps: 0,
    perfectSets: 0,
    failedSets: 0,
    totalVolume: 0,
  });

  const completeSet = () => {
    const targetReps = selectedExercise.reps;
    const doneReps = Number(completedReps);
    const weight = Number(completedWeight) || 0;

    setWorkoutData((prev) => ({
      ...prev,
      totalTargetReps: prev.totalTargetReps + targetReps,
      totalCompletedReps: prev.totalCompletedReps + doneReps,
      perfectSets: doneReps >= targetReps ? prev.perfectSets + 1 : prev.perfectSets,
      failedSets: doneReps < targetReps - 3 ? prev.failedSets + 1 : prev.failedSets,
      totalVolume: prev.totalVolume + doneReps * weight,
    }));

    setLastWeights((prev) => ({
      ...prev,
      [selectedDay]: { ...prev[selectedDay], [selectedExercise.name]: weight },
    }));

    const updatedLog = [
      ...setsLog,
      { set: currentSet, targetReps, completedReps: doneReps, weight },
    ];

    if (currentSet < selectedExercise.sets) {
      setSetsLog(updatedLog);
      setCurrentSet(currentSet + 1);
      setCompletedReps("");
      setRestTimeLeft(REST_DURATION);
      setResting(true);
    } else {
      // Last set of this exercise — whether they hit it or not, the
      // exercise is done. Every set has to meet target for it to count
      // as fully completed; otherwise it goes in "needs improvement".
      setSetsLog(updatedLog);

      const allSetsHitTarget = updatedLog.every((s) => s.completedReps >= s.targetReps);

      if (allSetsHitTarget) {
        setCompletedExercises((prev) => {
          const updated = [...prev, selectedExercise.name];
          if (updated.length + missedExercises.length === workouts[selectedDay].length) {
            setShowSummary(true);
            setFinishedDays((prevDays) =>
              prevDays.includes(selectedDay) ? prevDays : [...prevDays, selectedDay]
            );
          }
          return updated;
        });
      } else {
        setMissedExercises((prev) => {
          const updated = [...prev, selectedExercise.name];
          if (updated.length + completedExercises.length === workouts[selectedDay].length) {
            setShowSummary(true);
            setFinishedDays((prevDays) =>
              prevDays.includes(selectedDay) ? prevDays : [...prevDays, selectedDay]
            );
          }
          return updated;
        });
      }

      setShowExerciseFeedback(true);
      setExerciseFeedback(analyzeExercisePerformance(selectedExercise, updatedLog));
    }
  };

  const dismissExerciseFeedback = () => {
    setSelectedExercise(null);
    setCurrentSet(1);
    setCompletedReps("");
    setCompletedWeight("");
    setSetsLog([]);
    setExerciseFeedback("");
    setShowExerciseFeedback(false);
    setResting(false);
  };

  // Ticks the rest timer down every second while resting
  useEffect(() => {
    if (!resting) return;
    if (restTimeLeft <= 0) {
      setResting(false);
      return;
    }
    const timer = setTimeout(() => setRestTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resting, restTimeLeft]);

  const skipRest = () => setResting(false);

  // Lets the user fix a fat-fingered number on the set they just logged,
  // by popping it back off the log and reversing its contribution to
  // the running stats, then reloading it into the inputs.
  const editPreviousSet = () => {
    if (setsLog.length === 0) return;

    const lastEntry = setsLog[setsLog.length - 1];

    setWorkoutData((prev) => ({
      ...prev,
      totalTargetReps: prev.totalTargetReps - lastEntry.targetReps,
      totalCompletedReps: prev.totalCompletedReps - lastEntry.completedReps,
      perfectSets:
        lastEntry.completedReps >= lastEntry.targetReps
          ? prev.perfectSets - 1
          : prev.perfectSets,
      failedSets:
        lastEntry.completedReps < lastEntry.targetReps - 3
          ? prev.failedSets - 1
          : prev.failedSets,
      totalVolume: prev.totalVolume - lastEntry.completedReps * (lastEntry.weight || 0),
    }));

    setSetsLog(setsLog.slice(0, -1));
    setCurrentSet(lastEntry.set);
    setCompletedReps(String(lastEntry.completedReps));
    setCompletedWeight(lastEntry.weight ? String(lastEntry.weight) : "");
    setResting(false);
  };

  // Merges the base workout plan with any user-saved sets/reps overrides
  // for the given day, so edits show up without touching the hardcoded plan.
  const getWorkoutForDay = (day) => {
    if (!day) return [];
    return workouts[day].map((exercise) => {
      const override = customWorkouts[day]?.[exercise.name];
      return override ? { ...exercise, ...override } : exercise;
    });
  };

  const startEditingExercise = (exercise) => {
    setEditingExercise(exercise.name);
    setEditSets(exercise.sets);
    setEditReps(exercise.reps);
  };

  const saveExerciseEdit = (exerciseName) => {
    setCustomWorkouts((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [exerciseName]: { sets: Number(editSets), reps: Number(editReps) },
      },
    }));
    setEditingExercise(null);
  };

  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setCurrentSet(1);
    setCompletedWeight(lastWeights[selectedDay]?.[exercise.name] || "");
  };

  const saveWorkout = () => {
    setWorkoutHistory((prev) => [
      ...prev,
      {
        day: selectedDay,
        date: new Date().toISOString(),
        completedExercises,
        missedExercises,
        workoutData,
        rating: workoutRating,
        note: workoutNote,
      },
    ]);
    setShowSummary(false);
    setShowFinalReport(true);
  };

  const startNewWorkout = () => {
    setShowFinalReport(false);
    setCompletedExercises([]);
    setMissedExercises([]);
    setWorkoutData({
      totalTargetReps: 0,
      totalCompletedReps: 0,
      perfectSets: 0,
      failedSets: 0,
      totalVolume: 0,
    });
    setWorkoutRating("");
    setWorkoutNote("");
    setSelectedDay(null);
  };

  return (
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
          className="text-6xl md:text-7xl font-black text-center mb-6"
          style={{
            textShadow: "0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 40px #ff0000",
          }}
        >
          VASHARK
        </h1>

        <div className="flex justify-center gap-4 mb-14">
          <button
            onClick={() => navigate("/")}
            className="
              px-6 py-3 rounded-2xl font-bold text-md
              bg-white/10 backdrop-blur-xl
              border border-white/20
              hover:scale-105 hover:bg-white/20
              transition duration-300
            "
          >
            🏠 Home
          </button>

          <button
            onClick={() => setShowProgress(!showProgress)}
            className="
              px-6 py-3 rounded-2xl font-bold text-md
              bg-white/10 backdrop-blur-xl
              border border-white/20
              hover:scale-105 hover:bg-white/20
              transition duration-300
            "
          >
            {showProgress ? "Back to Workouts" : "📊 View Progress"}
          </button>
        </div>

        {showProgress && (
          <ProgressView
            workoutHistory={workoutHistory}
            onClearHistory={() => {
              if (window.confirm("Clear all saved workout history? This can't be undone.")) {
                setWorkoutHistory([]);
              }
            }}
          />
        )}

        {!showProgress && (
          <DayButtons
            workouts={workouts}
            finishedDays={finishedDays}
            onSelectDay={(day) => {
              setSelectedDay(day);
              setSelectedExercise(null);
            }}
            onResetWeek={() => setFinishedDays([])}
          />
        )}

        {!showProgress && selectedDay && !selectedExercise && (
          <ExerciseList
            selectedDay={selectedDay}
            exercises={getWorkoutForDay(selectedDay)}
            completedExercises={completedExercises}
            editingExercise={editingExercise}
            editSets={editSets}
            editReps={editReps}
            onEditSetsChange={setEditSets}
            onEditRepsChange={setEditReps}
            onStartEditing={startEditingExercise}
            onSaveEdit={saveExerciseEdit}
            onCancelEdit={() => setEditingExercise(null)}
            onStartExercise={startExercise}
          />
        )}

        {selectedExercise && !showExerciseFeedback && !showProgress && (
          <WorkoutMode
            selectedExercise={selectedExercise}
            currentSet={currentSet}
            completedReps={completedReps}
            completedWeight={completedWeight}
            onRepsChange={setCompletedReps}
            onWeightChange={setCompletedWeight}
            onCompleteSet={completeSet}
            resting={resting}
            restTimeLeft={restTimeLeft}
            onSkipRest={skipRest}
            canEditPreviousSet={setsLog.length > 0}
            onEditPreviousSet={editPreviousSet}
          />
        )}

        {selectedExercise && showExerciseFeedback && !showProgress && (
          <ExerciseFeedbackPanel
            exerciseName={selectedExercise.name}
            exerciseFeedback={exerciseFeedback}
            onContinue={dismissExerciseFeedback}
          />
        )}
      </div>

      {showSummary && !showProgress && (
        <WorkoutSummaryPanel
          workoutRating={workoutRating}
          workoutNote={workoutNote}
          onRatingChange={setWorkoutRating}
          onNoteChange={setWorkoutNote}
          onSave={saveWorkout}
        />
      )}

      {showFinalReport && !showProgress && (
        <FinalReportPanel
          completedExercises={completedExercises}
          missedExercises={missedExercises}
          workoutData={workoutData}
          onStartNewWorkout={startNewWorkout}
        />
      )}
    </div>
  );
}