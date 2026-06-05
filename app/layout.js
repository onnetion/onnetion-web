import "./globals.css";

export default function RootLayout({ children }) {
  const menus = ["বাংলাদেশ", "রাজনীতি", "আন্তর্জাতিক", "খেলা", "বিনোদন", "ব্যবসায়", "প্রযুক্তি", "জীবনযাপন", "মতামত", "ভিডিও"];
  
  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,line-clamp,aspect-ratio"></script>
      </head>
      <body>
        {/* Tier 1: Top Info Bar */}
        <div className="border-b py-2 text-[11px] font-bold text-gray-500 bg-white">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-4">
              <span>{new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="text-gray-300">|</span>
              <span>☀️ ৩১° সে. ঢাকা</span>
              <span className="text-gray-300">|</span>
              <span className="text-blue-700">🕌 ফজর ৩:৪৫</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="hover:text-red-600 cursor-pointer">ই-পেপার</span>
              <span className="hover:text-red-600 cursor-pointer uppercase">English</span>
              <button className="bg-blue-700 text-white px-3 py-1 rounded-sm text-[10px] font-bold">লগইন</button>
            </div>
          </div>
        </div>

        {/* Tier 2: Branding */}
        <header className="py-8 border-b">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="w-1/4 hidden lg:flex gap-4 text-xl"><button>🔍</button><button>☰</button></div>
            <div className="w-full lg:w-2/4 text-center">
              <a href="/" className="text-7xl md:text-8xl font-black text-black italic tracking-tighter">অন্বেষণ</a>
            </div>
            <div className="w-1/4 hidden lg:block text-right">
              <div className="w-full h-24 bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center text-[10px] text-gray-300 font-bold">ADVERTISEMENT</div>
            </div>
          </div>
        </header>

        {/* Tier 3: Sticky Navigation */}
        <nav className="sticky top-0 bg-white z-[100] border-b shadow-sm overflow-x-auto scrollbar-hide">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center gap-8 py-4 font-bold text-[18px] text-gray-800 whitespace-nowrap">
              <li className="text-red-600">🏠</li>
              {menus.map(m => (
                <li key={m} className="hover:text-blue-700 cursor-pointer">{m}</li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Breaking News Ticker */}
        <div className="bg-white border-b py-2 overflow-hidden whitespace-nowrap relative text-sm">
           <div className="container mx-auto px-4 flex gap-4">
              <span className="text-red-600 font-black shrink-0">ব্রেকিং:</span>
              <div className="animate-marquee italic font-medium">
                 • তুরস্কের পররাষ্ট্রমন্ত্রী হাকান ফিদান পাঁচ বছর পর ঢাকা সফরে এলেন • টি-টোয়েন্টি বিশ্বকাপ ২০২৬: বাংলাদেশের লক্ষ্য সেমিফাইনাল • বিশ্ববাজারে তেলের দাম বৃদ্ধি...
              </div>
           </div>
        </div>

        {children}

        <footer className="bg-black text-white mt-20 pt-20 pb-10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-6xl font-black italic mb-8">অন্বেষণ</h2>
            <p className="text-gray-500 font-bold mb-10 tracking-widest uppercase">© ২০২৪-২০২৬ অন্বেষণ - Digital Enterprise Network</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
