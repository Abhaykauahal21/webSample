export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#ff8c00]/10 blur-xl animate-pulse" />
        <div className="relative w-12 h-12 rounded-full border-[3px] border-black/10 border-t-[#ff8c00] animate-spin" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-neutral-900 text-sm font-semibold tracking-[0.2em] uppercase">
          ClariSolve <span className="font-normal text-neutral-500">TECH</span>
        </p>
        <p className="text-neutral-400 text-xs tracking-wider">Loading...</p>
      </div>
    </div>
  );
}
