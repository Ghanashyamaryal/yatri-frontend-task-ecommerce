export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 p-4 bg-white">
      <div className="aspect-square w-full rounded-lg bg-gray-200 mb-3" />
      <div className="w-20 h-6 rounded-full bg-gray-200 mb-3" />
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 rounded bg-gray-200" />
        <div className="w-8 h-4 rounded bg-gray-200" />
      </div>

      <div className="space-y-2 mb-3">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-16 h-6 bg-gray-200 rounded" />
        <div className="w-12 h-4 bg-gray-200 rounded" />
      </div>
      <div className="w-full h-10 bg-gray-200 rounded-md" />
    </div>
  );
}
