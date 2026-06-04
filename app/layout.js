import "./globals.css";

export default function RootLayout({ children }) {
  const menus = ["সর্বশেষ", "রাজনীতি", "বাংলাদেশ", "বিশ্ব", "খেলা", "বিনোদন", "চাকরি", "জীবনযাপন", "ভিডিও"];
  
  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,aspect-ratio,line-clamp"></script>
      </head>
      <body className="bg-white">
        {/* Tier 1: Top Bar */}
        <div className="border-b py-2 text-[12px] text-gray-500 font-semibold bg-[#fcfcfc]">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-4 uppercase">
              <span>বৃহস্পতিবার, ৬ জুন ২০২৪</span>
              <span className="hidden md:inline">সংস্করণ: ঢাকা</span>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex gap-4 font-bold text-black border-r pr-4">
                <span className="text-blue-700 cursor-pointer">ই-পেপার</span>
                <span className="cursor-pointer">English</span>
              </div>
              <button className="bg-blue-700 text-white px-3 py-1 rounded text-[11px] font-bold">লগইন</button>
            </div>
          </div>
        </div>

        {/* Tier 2: Brand Header */}
        <header className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 flex justify-between items-center relative">
            <div className="md:w-1/3 hidden md:block">
               <button className="text-gray-400">🔍 খুঁজুন</button>
            </div>
            <div className="md:w-1/3 text-center">
               <a href="/" className="text-7xl font-black text-black tracking-tighter italic">অন্বেষণ</a>
            </div>
            <div className="md:w-1/3 text-right hidden md:block text-gray-400">
               🔔 নোটিফিকেশন
            </div>
          </div>
        </header>

        {/* Tier 3: Main Navigation */}
        <nav className="sticky top-0 bg-white z-50 border-b shadow-sm overflow-x-auto">
          <div className="container mx-auto px-4">
            <ul className="flex justify-start md:justify-center items-center py-4 gap-6 md:gap-10 font-bold text-[17px] text-gray-800 whitespace-nowrap scrollbar-hide">
              <li className="text-red-600"><svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/></svg></li>
              {menus.map((m) => (
                <li key={m} className="hover:text-blue-700 transition cursor-pointer">{m}</li>
              ))}
            </ul>
          </div>
        </nav>

        {children}

        <footer className="bg-[#1a1a1a] text-white mt-20 pt-20 pb-10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-6xl font-black italic mb-10">অন্বেষণ</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-gray-400 font-bold border-t border-gray-800 pt-10">
               <span>বিজ্ঞাপন</span><span>সার্কুলেশন</span><span>শর্তাবলী</span><span>গোপনীয়তা</span><span>যোগাযোগ</span>
            </div>
            <p className="mt-12 text-gray-600 text-xs uppercase tracking-widest font-bold">© ২০২৪-২০২৬ অন্বেষণ - Digital Media Group</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
