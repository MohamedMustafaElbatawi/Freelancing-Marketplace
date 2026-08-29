const steps = [
  {
    number: 1,
    title: "Personal Info",
    description: "Profile & Identity",
  },
  {
    number: 2,
    title: "Company Info",
    description: "Organization details",
  },
  {
    number: 3,
    title: "About",
    description: "Bio & Web presence",
  },
];

export default function OnboardingSidebar({ currentStep }) {
  return (
    <aside className="w-full lg:w-[280px] lg:shrink-0 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-xl">🚀</span>
          </div>

          <div>
            <h1 className="text-lg font-bold text-indigo-600">FreelancePro</h1>

            <p className="text-[10px] tracking-wider text-slate-500 font-semibold">
              CLIENT ONBOARDING
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-7">
          {steps.map((step) => {
            const isActive = currentStep === step.number; // واقف عليه حالا
            const isCompleted = currentStep > step.number; // تم الانتهاء منه

            return (
              <div
                key={step.number}
                className={`flex items-center gap-4 transition-all ${
                  !isActive && !isCompleted ? "opacity-50" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isActive
                        ? "bg-indigo-600 text-white"
                        : "border-2 border-slate-300 text-slate-500"
                  }`}
                >
                  {isCompleted ? "✓" : step.number}
                </div>

                <div>
                  <p
                    className={`text-sm ${
                      isActive ? "font-bold text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {step.title}
                  </p>

                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quote */}
      <div className="mt-10 p-4 rounded-2xl bg-slate-100">
        <p className="text-sm text-slate-500 italic leading-relaxed">
          "Setting up your workspace correctly helps us match you with the top
          1% of talent in your industry."
        </p>
      </div>
    </aside>
  );
}
