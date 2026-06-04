import "./globals.css";

export default function RootLayout({ children }) {
  const categories = ["সর্বশেষ", "রাজনীতি", "বাংলাদেশ", "বিশ্ব", "খেলা", "বিনোদন", "জীবনযাপন", "মতামত", "বিজ্ঞান ও প্রযুক্তি"];
  
  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,line-clamp,aspect-ratio"></script>
      </head>
      <body className="bg-white font-['Hind_Siliguri']">
        {/* Top Navbar: Date & Login */}
        <div className="border-b py-2 text-xs text-gray-600">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-4">
              <span>বৃহস্পতিবার, ৬ জুন ২০২৪</span>
              <span className="hidden md:inline">সংস্করণ: ঢাকা</span>
            </div>
            <div className="flex gap-4 font-bold">
              <span className="text-blue-700 cursor-pointer">ই-পেপার</span>
              <span className="cursor-pointer">লগইন</span>
            </div>
          </div>
        </div>

        {/* Brand Header */}
        <header className="py-6 border-b">
          <div className="container mx-auto px-4 text-center">
            <a href="/" className="text-7xl font-black text-black tracking-tighter italic">অন্বেষণ</a>
          </div>
        </header>

        {/* Menu Bar */}
        <nav className="sticky top-0 bg-white z-50 border-b shadow-sm overflow-x-auto">
          <div className="container mx-auto px-4">
            <ul className="flex justify-start md:justify-center items-center py-4 gap-6 md:gap-8 font-bold text-gray-700 whitespace-nowrap">
              {categories.map((cat) => (
                <li key={cat} className="hover:text-blue-700 transition cursor-pointer">{cat}</li>
              ))}
              <li className="text-gray-400 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </li>
            </ul>
          </div>
        </nav>

        {children}

        {/* Main Footer */}
        <footer className="bg-gray-100 mt-20 pt-16 pb-8 border-t">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-5xl font-black italic mb-4">অন্বেষণ</h2>
              <p className="text-gray-500 italic">সতর্ক থাকুন, অন্বেষণ করুন।</p>
            </div>
            <div className="border-t pt-8 text-center text-gray-500 text-sm">
              © ২০২৪ অন্বেষণ - সর্বস্বত্ব সংরক্ষিত
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
