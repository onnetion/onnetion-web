export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-black text-gray-200">৪০৪</h1>
      <h2 className="text-3xl font-bold mb-6">দুঃখিত, এই খবরটি আমাদের আর্কাইভে নেই।</h2>
      <a href="/" className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-2xl transition">হোমপেজে ফিরে যান</a>
    </div>
  );
}
