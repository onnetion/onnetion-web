import "./globals.css";

export default function RootLayout({ children }) {
  const menus = ["বাংলাদেশ", "রাজনীতি", "আন্তর্জাতিক", "খেলা", "বিনোদন", "ব্যবসায়", "প্রযুক্তি", "জীবনযাপন", "মতামত", "ভিডিও"];
  
  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,line-clamp,aspect-ratio"></script>
      </head>
      <body className="antialiased">
        {/* TIER 1: TOP BAR */}
        <div className="border-b py-2 text-[11px] font-bold text-gray-500 bg-[#f9f9f9]">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <span>{new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="text-gray-300">|</span>
              <span>☀️ ৩১° সে. ঢাকা</span>
              <span className="text-gray-300">|</span>
              <span className="text-blue-700">🕌 ফজর ৩:৪৫</span>
            </div>
            <div className="flex gap-6 items-center">
              <span className="hover:text-red-600 cursor-pointer">ই-পেপার</span>
              <span className="hover:text-red-600 cursor-pointer uppercase">English</span>
              <button className="bg-blue-700 text-white px-3 py-1 rounded-sm text-[10px] font-bold">লগইন</button>
            </div>
          </div>
        </div>

        {/* TIER 2: MAIN BRANDING */}
        <header className="bg-white py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="md:w-1/4 hidden md:block">
              <div className="flex gap-4 text-xl text-gray-400">
                <button>🔍</button>
                <button>☰</button>
              </div>
            </div>
            <div className="md:w-2/4 text-center">
              <a href="/" className="text-8xl font-black text-black italic tracking-tighter select-none">অন্বেষণ</a>
            </div>
            <div className="md:w-1/4 flex justify-end">
              <div className="w-full h-24 bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center text-[10px] text-gray-300 uppercase font-bold">Advertisement 300x100</div>
            </div>
          </div>
        </header>

        {/* TIER 3: MEGA NAVIGATION */}
        <nav className="sticky top-0 bg-white z-[100] border-y shadow-sm">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center gap-8 py-4 font-bold text-[18px] text-gray-800 whitespace-nowrap overflow-x-auto scrollbar-hide">
              <li className="text-red-600"><svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/></svg></li>
              {menus.map(m => (
                <li key={m} className="hover:text-blue-700 transition cursor-pointer relative group">
                  {m}
                  <span className="absolute -bottom-[17px] left-0 w-0 h-1 bg-red-600 transition-all group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* BREAKING TICKER */}
        <div className="ticker-wrap border-b border-gray-200">
           <div className="container mx-auto px-4 flex gap-4">
              <span className="bg-red-600 px-2 font-bold shrink-0">ব্রেকিং</span>
              <div className="ticker-content">
                 • পাঁচ বছর পর ঢাকা সফরে এলেন তুরস্কের পররাষ্ট্রমন্ত্রী হাকান ফিদান • টি-টোয়েন্টি বিশ্বকাপ ২০২৬: চ্যাম্পিয়ন হওয়ার লক্ষ্য বাংলাদেশের • বিশ্ববাজারে তেলের দাম হু হু করে বাড়ছে...
              </div>
           </div>
        </div>

        {children}

        {/* FOOTER */}
        <footer className="bg-[#111] text-white pt-20 pb-10 mt-20">
          <div className="container mx-auto px-4">
             <div className="flex flex-col md:flex-row justify-between border-b border-gray-800 pb-16 mb-10">
                <div className="md:w-1/3 mb-10 md:mb-0">
                   <h2 className="text-6xl font-black italic mb-6">অন্বেষণ</h2>
                   <p className="text-gray-400 font-bold italic">সতর্ক থাকুন, অন্বেষণ করুন।</p>
                </div>
                <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8 font-bold text-gray-300">
                   <ul className="space-y-3"><li>বাংলাদেশ</li><li>রাজনীতি</li><li>বিশ্ব</li></ul>
                   <ul className="space-y-3"><li>খেলা</li><li>বিনোদন</li><li>টেকনোলজি</li></ul>
                   <ul className="space-y-3"><li>সার্কুলেশন</li><li>বিজ্ঞাপন</li><li>যোগাযোগ</li></ul>
                   <ul className="space-y-3"><li>শর্তাবলী</li><li>গোপনীয়তা</li><li>আর্কাইভ</li></ul>
                </div>
             </div>
             <p className="text-center text-gray-600 text-xs font-bold tracking-widest uppercase">© ২০২৪-২০২৬ অন্বেষণ - Digital Enterprise News Network</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
