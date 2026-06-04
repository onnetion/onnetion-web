export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse">
      <div className="h-96 bg-gray-200 rounded-3xl mb-12"></div>
      <div className="grid grid-cols-3 gap-8">
        <div className="h-40 bg-gray-200 rounded-2xl"></div>
        <div className="h-40 bg-gray-200 rounded-2xl"></div>
        <div className="h-40 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  );
}
