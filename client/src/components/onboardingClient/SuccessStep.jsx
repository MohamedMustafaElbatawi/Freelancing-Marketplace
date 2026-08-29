export default function SuccessStep({ onDashboard }) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 py-12">
      <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-6xl">
        ✓
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
          Profile Complete!
        </h2>

        <p className="text-base text-slate-500 max-w-md mx-auto">
          Your workspace is now ready. You can start posting jobs and connecting
          with experts immediately.
        </p>
      </div>

      <button
        onClick={onDashboard}
        className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition active:scale-95"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
