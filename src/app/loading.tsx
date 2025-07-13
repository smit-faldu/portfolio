export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24">
          <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-accent border-opacity-20 rounded-full"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-transparent border-t-accent rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-primary text-lg">Loading...</p>
      </div>
    </div>
  );
}