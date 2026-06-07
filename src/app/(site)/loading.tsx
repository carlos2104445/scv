export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-10 h-10 rounded-full border-3 border-neutral-200 border-t-brand-orange animate-spin" />
        <p className="text-sm text-neutral-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}
