import "./globals.css";

export const metadata = {
  title: "অন্বেষণ | বাংলাদেশের সর্বশেষ সংবাদ",
  description: "রাজনীতি, খেলাধুলা, বিনোদন ও বিশ্ব সংবাদ সবার আগে পেতে অন্বেষণ-এর সাথেই থাকুন।",
};

export default function RootLayout({ children }) {
  const menuItems = [
    { name: "হোম", link: "/" },
    { name: "বাংলাদেশ", link: "/category/bangladesh" },
    { name: "আন্তর্জাতিক", link: "/category/international" },
    { name: "খেলা", link: "/category/sports" },
    { name: "বিনোদন", link: "/category/entertainment" },
    { name: "তথ্যপ্রযুক্তি", link: "/category/technology" },
  ];

  return (
    <html lang="bn">
      <head>
        <script src="https://cdn.tailwindcss.com?plugins=typography,aspect-ratio"></script>
      </head>
      <body className="bg-gray-100 antialiased font-sans">
        {/* Top Navbar */}
        <header className="bg-white border-b-2 border-red-600 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <a href="/" className="text-4xl font-black text-red-600 italic tracking-tighter">
                অন্বেষণ
              </a>
              <nav className="hidden lg:flex space-x-6 text-gray-800 font-bold text-lg">
                {menuItems.map((item) => (
                  <a key={item.name} href={item.link} className="hover:text-red-600 transition">
                    {item.name}
                  </a>
                ))}
              </nav>
              <button className="lg:hidden text-red-600 font-bold">মেনু</button>
            </div>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="bg-gray-900 text-white mt-12 py-16">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h2 className="text-3xl font-black text-red-500 mb-4 italic italic">অন্বেষণ</h2>
              <p className="text-gray-400">সত্যের সন্ধানে প্রতিনিয়ত। আপনার চারপাশের সব খবর সবার আগে পৌঁছে দিতে আমরা প্রতিশ্রুতিবদ্ধ।</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-red-500 inline-block pb-1">বিভাগসমূহ</h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-400 font-medium">
                <li><a href="/category/bangladesh">বাংলাদেশ</a></li>
                <li><a href="/category/international">আন্তর্জাতিক</a></li>
                <li><a href="/category/sports">খেলাধুলা</a></li>
                <li><a href="/category/entertainment">বিনোদন</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 border-b border-red-500 inline-block pb-1">যোগাযোগ</h3>
              <p className="text-gray-400">ইমেইল: info@onnetion.com</p>
              <p className="text-gray-400">ঢাকা, বাংলাদেশ।</p>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            © {new Date().getFullYear()} অন্বেষণ - সর্বস্বত্ব সংরক্ষিত।
          </div>
        </footer>
      </body>
    </html>
  );
}
