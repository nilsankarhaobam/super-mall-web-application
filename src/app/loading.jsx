// app/loading.jsx
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
      {/* DaisyUI Loading Spinner */}
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <h2 className="text-xl font-semibold animate-pulse">Loading Super Mall...</h2>
      <p className="text-base-content/60">Preparing your experience</p>
    </div>
  );
}