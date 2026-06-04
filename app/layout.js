import "./globals.css";

export const metadata = {
  title: 'অন্বেষণ | অনলাইনেই সব খবর',
  description: 'বাংলাদেশের বিশ্বস্ত ডিজিটাল সংবাদ মাধ্যম।',
}

export default function RootLayout({ children }) {
  const menus = ["বাংলাদেশ", "রাজনীতি", "আন্তর্জাতিক", "খেলা", "বিনোদন", "বিজ্ঞান ও প্রযুক্তি", "মতামত"];
  
  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,line-clamp,aspect-ratio"></script>
      </head>
      <body className="bg-[#f0f2f5] font-['Hind_Siliguri'] text-[#1a1a1a]">
        {/* Top Navbar */}
        <div className="bg-white border-b border-gray-200 py-2 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center text-[13px] font-medium text-gray-500">
            <span>{new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} | ঢাকা</span>
            <div className="flex gap-6 uppercase tracking-wider font-bold">
              <span className="hover:text-red-600 cursor-pointer transition">E-Paper</span>
              <span className="hover:text-red-600 cursor-pointer transition">Archives</span>
            </div>
          </div>
        </div>

        {/* Brand Header */}
        <header className="bg-white pt-8 pb-4">
          <div className="container mx-auto px-4 text-center">
            <a href="/" className="text-8xl font-black tracking-tighter text-black italic drop-shadow-sm">অন্বেষণ</a>
          </div>
        </header>

        {/* Navigation */}
        <nav className="sticky top-0 bg-white z-50 border-y border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center items-center py-4 gap-8 font-bold text-[17px] text-gray-800 overflow-x-auto whitespace-nowrap">
              {menus.map((m) => (
                <li key={m} className="hover:text-[#d92328] transition-colors cursor-pointer relative group">
                  {m}
                  <span className="absolute bottom-[-17px] left-0 w-0 h-[3px] bg-[#d92328] transition-all group-hover:w-full"></span>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {children}

        {/* Footer */}
        <footer className="bg-[#1a1a1a] text-white mt-20 pt-20 pb-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 border-b border-gray-800 pb-12">
               <h2 className="text-5xl font-black italic mb-4">অন্বেষণ</h2>
               <p className="text-gray-400 max-w-2xl mx-auto italic text-lg leading-relaxed">অন্বেষণ ডট কম বাংলাদেশের একটি আধুনিক ডিজিটাল সংবাদপত্র। সত্যের সন্ধানে আমরা আপসহীন।</p>
            </div>
            <div className="text-center text-gray-500 font-bold text-sm tracking-widest">
               © ২০২৪ অন্বেষণ - সর্বস্বত্ব সংরক্ষিত | POWERED BY NEXT.JS 14
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
