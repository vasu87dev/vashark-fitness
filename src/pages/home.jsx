import { useNavigate } from "react-router-dom";
import david from "../assets/gympho.jpg";

export default function Home() { 
  const navigate = useNavigate();

  
  return (
    <div
      className="min-h-screen w-full relative text-gray-300 overflow-hidden"
      style={{
        backgroundImage: `url(${david})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar */}
        <nav className="w-full flex items-center justify-between px-10 py-6 border-b border-white/10 backdrop-blur-md bg-black/20">

          {/* Logo */}-
          <h1
            className="text-4xl font-black tracking-widest text-white"
            style={{
              textShadow:
                "0 0 5px #0037ff, 0 0 10px #00b7ff, 0 0 20px #00ff88",
            }}
          >
            VASHARK
          </h1>

          {/* Nav Links */}
          <div className="hidden md:flex gap-10 text-lg">
            <a href="#" className="hover:text-red-400 transition">
              Home
            </a>

            <button
              onClick={() => navigate("/days")}
              className="hover:text-green-400 transition"
            >
              Workouts
            </button>

            <button
              onClick={() => navigate("/days", { state: { showProgress: true } })}
              className="hover:text-blue-400 transition"
            >
              Progress
            </button>

            <a href="#" className="hover:text-yellow-400 transition">
              Pricing
            </a>
          </div>

          {/* Button */}
          <button className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-2xl font-bold shadow-lg shadow-red-500/30">
            Get Started
          </button>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-1 flex-col items-center justify-center text-center px-6">

          <p className="uppercase tracking-[0.4em] text-green-400 text-sm mb-6">
            Premium Fitness Tracking
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight max-w-6xl text-white">
            Transform Your
            <span className="text-red-500"> Workout Journey</span>
            <br />
            with VASHARK
          </h1>

          <p className="text-gray-300 text-lg mt-8 max-w-2xl leading-relaxed">
            Track workouts, monitor sets, build consistency, and unlock your
            peak physique with a premium AI-powered gym tracking experience.
          </p>

          {/* Buttons */}
          <div className="flex gap-5 mt-12 flex-wrap justify-center">

            <button
              onClick={() => navigate("/days")}
              className="bg-red-500 hover:bg-red-600 transition px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl shadow-red-500/30"
            >
              Start Training
            </button>

            <button
              onClick={() =>
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
              }
              className="border border-white/20 hover:border-white transition px-8 py-4 rounded-2xl text-lg font-semibold bg-white/5 backdrop-blur-md"
            >
              Explore Features
            </button>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="px-10 pb-20">

          <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-400 text-center mb-14 max-w-2xl mx-auto">
            Built for real training — not just a checklist.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">🏋️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Workout Tracking</h3>
              <p className="text-gray-300 leading-relaxed">
                Log every set with reps and weight, day by day, with your progress
                saved automatically as you go.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">🧠</div>
              <h3 className="text-2xl font-bold text-white mb-4">AI-Style Coach Feedback</h3>
              <p className="text-gray-300 leading-relaxed">
                After every exercise, get a written review of what went right,
                what fell short, and a concrete tip for next time.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">🏋️‍♂️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Weight & Volume Tracking</h3>
              <p className="text-gray-300 leading-relaxed">
                Log weight alongside reps, with your last-used weight remembered
                automatically for next session.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">📈</div>
              <h3 className="text-2xl font-bold text-white mb-4">Progress Analytics</h3>
              <p className="text-gray-300 leading-relaxed">
                See your workout history, streaks, and completed-reps trends over
                time in one dashboard.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">✏️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Editable Plans</h3>
              <p className="text-gray-300 leading-relaxed">
                Adjust sets and reps for any exercise to match how you actually
                train — your edits are saved for next time.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">⏱️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Rest Timer</h3>
              <p className="text-gray-300 leading-relaxed">
                A built-in countdown between sets, with the option to skip when
                you're ready to go again.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">✅</div>
              <h3 className="text-2xl font-bold text-white mb-4">Weekly Completion</h3>
              <p className="text-gray-300 leading-relaxed">
                Days you've finished are marked done at a glance, with a running
                count of your week so far.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">↩️</div>
              <h3 className="text-2xl font-bold text-white mb-4">Undo a Set</h3>
              <p className="text-gray-300 leading-relaxed">
                Fat-fingered a number? Edit your previous set before moving on,
                no need to restart the exercise.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:scale-105 transition duration-300">
              <div className="text-5xl mb-5">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium Experience</h3>
              <p className="text-gray-300 leading-relaxed">
                Modern UI, blazing fast performance, and a luxurious design built
                for athletes.
              </p>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 text-center text-gray-400">
          © 2026 VASHARK • Built for champions.
        </footer>
      </div>
    </div>
  );
}