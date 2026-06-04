import "./globals.css";

export const metadata = {
  title: 'অন্বেষণ | অনলাইনেই সব খবর',
  description: 'বাংলাদেশের দ্রুততম এবং সর্বশেষ সংবাদ মাধ্যম',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
      </head>
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-4xl font-black text-red-600 tracking-tighter italic">অন্বেষণ</a>
            <nav className="hidden md:flex space-x-6 font-bold text-lg">
              <a href="/" className="hover:text-red-600 border-b-2 border-transparent hover:border-red-600 pb-1">হোম</a>
              <span className="cursor-pointer hover:text-red-600">বাংলাদেশ</span>
              <span className="cursor-pointer hover:text-red-600">আন্তর্জাতিক</span>
              <span className="cursor-pointer hover:text-red-600">খেলা</span>
              <span className="cursor-pointer hover:text-red-600">বিনোদন</span>
            </nav>
            <div className="md:hidden text-red-600 font-bold">MENU</div>
          </div>
        </header>

        {children}

        <footer className="bg-white border-t py-16 mt-20">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-black text-red-600 italic mb-4">অন্বেষণ</h2>
              <p className="text-gray-500">সত্যের সন্ধানে প্রতিনিয়ত। অন্বেষণ ডট কম বাংলাদেশের একটি আধুনিক ডিজিটাল সংবাদ মাধ্যম।</p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-gray-800 border-b-2 border-red-600 inline-block">বিভাগ</h3>
              <ul className="space-y-2 text-gray-600 font-medium">
                <li>বাংলাদেশ</li>
                <li>আন্তর্জাতিক</li>
                <li>খেলাধুলা</li>
                <li>টেকনোলজি</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4 text-gray-800 border-b-2 border-red-600 inline-block">যোগাযোগ</h3>
              <p className="text-gray-600 font-medium">ইমেইল: info@onnetion.com</p>
              <p className="text-gray-600 font-medium">ঢাকা, বাংলাদেশ।</p>
            </div>
          </div>
          <div className="text-center mt-12 pt-8 border-t text-gray-400 text-sm">
            © {new Date().getFullYear()} অন্বেষণ - সর্বস্বত্ব সংরক্ষিত
          </div>
        </footer>
      </body>
    </html>
  )
}
