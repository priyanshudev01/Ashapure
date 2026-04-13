const riderImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAHpBFZo28noZUc3yIb5CLTLWVeWVaJo6ocMClEcbLPLdGwSFQsqkCqTxfdvBysAuJAxHzoOGFBA_R8234bLqX_Pi0wvNGwgPTKQW2y23H8kgNr87iU5Y7gIbRUsPTy5MYLFLIR9wEU7evlpUggR2NJVewrcVPH-TmEofvr56_8RXizsy0h2ygfswhS2h8FHwSgD9k2TPemN7H_TVZrJizznHWu-aEOw5kK3kw_7JcOdyd5_PTVNctkU_tbmuy4d7HkFDVA9pDYgCQ';

export function DeliveryTimelineCard() {
  return (
    <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-xl shadow-green-900/5 border-2 border-primary/10 flex flex-col relative overflow-hidden card-hover">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8" />
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1 block">Live Updates</span>
          <h3 className="text-2xl font-black text-slate-900">Today&apos;s Delivery</h3>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-primary px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">In Transit</span>
        </div>
      </div>

      <div className="relative flex-1 py-4">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
        <div className="space-y-10 relative">
          <div className="flex items-start gap-6">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center relative z-10 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-sm" data-icon="check">
                check
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">Packed at Farm</p>
              <p className="text-xs text-slate-500">04:30 AM &bull; Quality check passed by Farm Manager</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center relative z-10 shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-sm" data-icon="local_shipping">
                local_shipping
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">Out for Delivery</p>
              <p className="text-xs text-slate-500">05:45 AM &bull; Delivery Executive: Rajesh M.</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center relative z-10 border-2 border-white">
              <span className="material-symbols-outlined text-sm" data-icon="home">
                home
              </span>
            </div>
            <div className="flex-1 opacity-50">
              <p className="text-sm font-bold text-slate-900">Delivered</p>
              <p className="text-xs text-slate-500">Estimated Arrival: 06:15 AM (12 mins away)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
        <img alt="Rider" className="w-12 h-12 rounded-xl object-cover" src={riderImage} />
        <div className="flex-1">
          <p className="text-xs font-bold text-slate-900 tracking-tight">Rajesh M. is nearby</p>
          <p className="text-[10px] text-slate-500 font-medium">Contact delivery partner for instructions</p>
        </div>
        <button className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-primary shadow-sm btn-interact">
          <span className="material-symbols-outlined" data-icon="call">
            call
          </span>
        </button>
      </div>
    </div>
  );
}
