export default function Loading() {
  return (
    <div className="flex justify-center items-center flex-1">
      <div className="w-12 h-12 bg-background border-t-4 border-primary rounded-full animate-spin" />

      <p className="text-foreground ml-4">Loading...</p>
    </div>
  );
}