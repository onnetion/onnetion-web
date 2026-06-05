import "./globals.css";

export default function RootLayout({ children }) {
  const menus = ["বাংলাদেশ", "রাজনীতি", "বিশ্ব", "খেলা", "বিনোদন", "প্রযুক্তি", "মতামত", "চাকরি", "জীবনযাপন"];

  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,aspect-ratio,line-clamp"></script>
      </head>
      <body>
        {/* TIER 1: TOP BAR */}
        <div className="border-b py-2 text-[12px] font-bold text-gray-500">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <span>ঢাকা, {new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="text-red-600 animate-pulse">● ব্রেকিং নিউজ</span>
            </div>
            <div className="flex gap-6 items-center uppercase">
              <span className="hover:text-blue-700 cursor-pointer">E-Paper</span>
              <span className="bg-blue-700 text-white px-3 py-1 rounded-sm cursor-pointer">Login</span>
            </div>
          </div>
        </div>

        {/* TIER 2: LOGO & AD */}
        <header className="py-8 bg-white">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="md:w-1/4 hidden md:block">
              <button className="text-xl">🔍</button>
            </div>
            <div className="md:w-2/4 text-center">
              <a href="/" className="text-8xl font-black text-black italic tracking-tighter drop-shadow-sm">অন্বেষণ</a>
            </div>
            <div className="md:w-1/4 bg-gray-50 h-24 w-full rounded flex items-center justify-center text-xs text-gray-300 uppercase">
              Advertisement
            </div>
          </div>
        </header>

        {/* TIER 3: MEGA MENU */}
        <nav className="sticky top-0 bg-white z-[100] border-y shadow-sm">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center gap-8 py-4 font-bold text-[18px] text-gray-800 whitespace-nowrap overflow-x-auto scrollbar-hide">
              {menus.map(m => (
                <li key={m} className="hover:text-red-600 transition cursor-pointer relative group">
                  {m}
                  <span className="absolute -bottom-[17px] left-0 w-0 h-1 bg-red-600 transition-all group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {children}

        {/* FOOTER */}
        <footer className="bg-[#111] text-white pt-20 pb-10 mt-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-6xl font-black italic mb-8">অন্বেষণ</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm font-bold border-y border-gray-800 py-10 mb-10">
              <span>বাংলাদেশ</span><span>বিশ্ব</span><span>খেলা</span><span>বিনোদন</span><span>প্রযুক্তি</span>
            </div>
            <p className="text-gray-500 text-xs tracking-[0.2em]">© ২০২৪-২০২৬ অন্বেষণ - Digital Enterprise Group</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
