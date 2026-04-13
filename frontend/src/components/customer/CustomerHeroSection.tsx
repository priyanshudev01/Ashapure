export function CustomerHeroSection() {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Morning, Alex!</h2>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <p className="text-slate-500 font-medium">Your daily freshness is on its way.</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-6">
        <div className="flex flex-col items-center">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="stroke-current text-slate-100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
              />
              <path
                className="stroke-current text-primary"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeDasharray="98, 100"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-900">98%</span>
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">Purity Score</span>
        </div>

        <div className="h-12 w-px bg-slate-100" />

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary text-sm"
              data-icon="verified"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="text-sm font-bold text-slate-900">Purity Verified</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-green-50 px-2 py-1 rounded">
              <span className="text-[10px] font-bold text-primary">pH 6.7</span>
            </div>
            <div className="bg-blue-50 px-2 py-1 rounded">
              <span className="text-[10px] font-bold text-blue-600">Temp 4&deg;C</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
