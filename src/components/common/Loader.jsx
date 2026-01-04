// components/common/Loader.jsx
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      {/* DaisyUI Loading Spinner */}
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm font-medium animate-pulse">Checking Permissions...</p>
    </div>
  );
}