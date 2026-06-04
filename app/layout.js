import "./globals.css";

export default function RootLayout({ children }) {
  const menus = ["বাংলাদেশ", "রাজনীতি", "আন্তর্জাতিক", "খেলা", "বিনোদন", "টেক"];
  
  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,line-clamp"></script>
      </head>
      <body className="bg-gray-100 font-['Hind_Siliguri']">
        <div className="bg-white border-b py-3">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm font-semibold text-gray-500 uppercase tracking-widest">
            <span>{new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="flex gap-6">
              <span className="cursor-pointer hover:text-red-600">ই-পেপার</span>
              <span className="cursor-pointer hover:text-red-600">লগইন</span>
            </div>
          </div>
        </div>

        <header className="bg-white border-b sticky top-0 z-50 py-6">
          <div className="container mx-auto px-4 text-center">
            <a href="/" className="text-7xl font-black text-black tracking-tighter italic block mb-6">অন্বেষণ</a>
            <nav className="border-t pt-4">
              <ul className="flex justify-center gap-8 font-bold text-gray-700">
                {menus.map(m => (
                  <li key={m} className="hover:text-red-600 transition cursor-pointer">{m}</li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {children}

        <footer className="bg-white border-t mt-20 py-20 text-center">
          <h2 className="text-4xl font-black italic mb-4">অন্বেষণ</h2>
          <p className="text-gray-400">© ২০২৪ অন্বেষণ - সর্বস্বত্ব সংরক্ষিত</p>
        </footer>
      </body>
    </html>
  );
}
