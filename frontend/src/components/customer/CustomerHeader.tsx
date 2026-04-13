const profileImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAHpBFZo28noZUc3yIb5CLTLWVeWVaJo6ocMClEcbLPLdGwSFQsqkCqTxfdvBysAuJAxHzoOGFBA_R8234bLqX_Pi0wvNGwgPTKQW2y23H8kgNr87iU5Y7gIbRUsPTy5MYLFLIR9wEU7evlpUggR2NJVewrcVPH-TmEofvr56_8RXizsy0h2ygfswhS2h8FHwSgD9k2TPemN7H_TVZrJizznHWu-aEOw5kK3kw_7JcOdyd5_PTVNctkU_tbmuy4d7HkFDVA9pDYgCQ';

export function CustomerHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="md:hidden">
          <span className="text-xl font-black text-primary">Aasapure</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-full border border-slate-200/50 w-96">
          <span className="material-symbols-outlined text-slate-400 text-sm" data-icon="search">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-full p-0"
            placeholder="Search dairy products..."
            type="text"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-500 hover:text-primary transition-colors btn-interact">
            <span className="material-symbols-outlined" data-icon="notifications">
              notifications
            </span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          <div className="h-8 w-8 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
            <img alt="User" className="w-full h-full object-cover" src={profileImage} />
          </div>
        </div>
      </div>
    </header>
  );
}
