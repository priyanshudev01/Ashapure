export function SubscriptionPanel() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 card-hover flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-green-50 text-primary rounded-2xl">
            <span className="material-symbols-outlined" data-icon="calendar_month">
              calendar_month
            </span>
          </div>
          <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
            Active
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900">Daily A2 Subscription</h3>
        <p className="text-slate-500 text-sm mt-1">2 Litres &bull; Fresh Buffalo Milk</p>

        <div className="mt-8 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-xl" data-icon="sync">
            sync
          </span>
          <div>
            <p className="text-xs font-bold text-slate-900">Set once, auto delivery</p>
            <p className="text-[10px] text-slate-500">Next delivery: Tomorrow, 6:00 AM</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cycle Progress</span>
            <span className="text-sm font-black text-slate-900">
              Day 12 <span className="text-slate-400 font-medium text-xs">/ 30</span>
            </span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '40%' }} />
          </div>
        </div>

        <div className="mt-auto pt-8 grid grid-cols-2 gap-4">
          <button className="py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors btn-interact">
            Pause
          </button>
          <button className="py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 btn-interact">
            Manage
          </button>
        </div>
      </div>

      <div className="purity-gradient p-6 rounded-3xl shadow-lg flex items-center justify-between text-white card-hover">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl">
            &#x1F95B;
          </div>
          <div>
            <h4 className="font-bold text-sm">Bottle Return Points</h4>
            <p className="text-xs text-white/80">450 Points &bull; 5 more for free milk!</p>
          </div>
        </div>
        <button className="p-2 bg-white text-primary rounded-xl btn-interact">
          <span className="material-symbols-outlined" data-icon="arrow_forward">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
