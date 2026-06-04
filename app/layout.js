import "./globals.css";

export default function RootLayout({ children }) {
  const menus = ["বাংলাদেশ", "রাজনীতি", "আন্তর্জাতিক", "খেলা", "বিনোদন", "টেক", "মতামত"];
  
  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,line-clamp"></script>
      </head>
      <body>
        <div className="bg-white border-b py-2 text-xs text-gray-500 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center font-semibold">
            <div className="flex gap-4">
              <span>বৃহস্পতিবার, ৬ জুন ২০২৪</span>
              <span className="text-gray-300">|</span>
              <span>ঢাকা সংস্করণ</span>
            </div>
            <div className="flex gap-6">
              <span className="cursor-pointer hover:text-red-600 uppercase tracking-widest">E-Paper</span>
              <span className="cursor-pointer hover:text-red-600 uppercase tracking-widest">Log In</span>
            </div>
          </div>
        </div>

        <header className="bg-white border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6 flex flex-col items-center">
            <a href="/" className="text-7xl font-black text-black tracking-tighter italic mb-4">অন্বেষণ</a>
            <nav className="w-full border-t pt-4">
              <ul className="flex justify-center gap-6 md:gap-10 font-bold text-gray-700 overflow-x-auto whitespace-nowrap scrollbar-hide">
                {menus.map(m => (
                  <li key={m} className="hover:text-red-600 transition cursor-pointer">{m}</li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-white border-t mt-20 pt-16 pb-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b pb-12">
               <div className="md:col-span-1">
                  <h2 className="text-4xl font-black italic mb-4">অন্বেষণ</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">অন্বেষণ ডট কম বাংলাদেশের একটি আধুনিক ডিজিটাল সংবাদপত্র।</p>
               </div>
               <div className="grid grid-cols-2 gap-8 md:col-span-3 font-bold text-gray-700">
                  <ul className="space-y-3"><li>বাংলাদেশ</li><li>রাজনীতি</li><li>বিশ্ব</li></ul>
                  <ul className="space-y-3"><li>খেলা</li><li>বিনোদন</li><li>টেকনোলজি</li></ul>
               </div>
            </div>
            <div className="text-center pt-8 text-gray-400 text-xs font-semibold uppercase tracking-widest">
              © ২০২৪ অন্বেষণ - সর্বস্বত্ব সংরক্ষিত
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
