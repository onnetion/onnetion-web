import "./globals.css";

export const metadata = {
  title: {
    default: 'অন্বেষণ | সত্যের সন্ধানে প্রতিনিয়ত',
    template: '%s | অন্বেষণ'
  },
  description: 'বাংলাদেশের বিশ্বস্ত এবং আধুনিক ডিজিটাল সংবাদ মাধ্যম।',
}

export default function RootLayout({ children }) {
  const nav = ["বাংলাদেশ", "রাজনীতি", "বিশ্ব", "খেলা", "বিনোদন", "প্রযুক্তি", "মতামত"];
  
  return (
    <html lang="bn">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=typography,aspect-ratio,line-clamp"></script>
      </head>
      <body className="bg-[#f9fafb] font-['Hind_Siliguri'] text-gray-900 overflow-x-hidden">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" className="text-5xl font-black italic tracking-tighter text-black">অন্বেষণ</a>
            <form action="/search" className="hidden lg:flex items-center bg-gray-100 px-4 py-2 rounded-full">
              <input name="q" placeholder="খুঁজুন..." className="bg-transparent outline-none text-sm w-48" />
              <button type="submit">🔍</button>
            </form>
          </div>
          <nav className="bg-black text-white hidden md:block">
            <div className="container mx-auto px-4">
              <ul className="flex justify-center gap-8 py-3 font-bold text-sm">
                {nav.map(n => <li key={n} className="hover:text-red-500 cursor-pointer transition uppercase">{n}</li>)}
              </ul>
            </div>
          </nav>
        </header>

        {children}

        <footer className="bg-black text-white py-20 mt-20">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
            <div className="col-span-1">
              <h2 className="text-4xl font-black italic mb-6">অন্বেষণ</h2>
              <p className="text-gray-400">২০২৬ সালের সর্বাধুনিক প্রযুক্তিতে নির্মিত সংবাদ মাধ্যম। আমরা সত্যের সন্ধানে অবিচল।</p>
            </div>
            <div className="col-span-1">
              <h3 className="font-bold mb-4 border-l-4 border-red-600 pl-2">বিভাগ</h3>
              <ul className="space-y-2 text-gray-400"><li>বাংলাদেশ</li><li>বিশ্ব</li><li>খেলা</li></ul>
            </div>
            <div className="col-span-2">
              <h3 className="font-bold mb-4">সাবস্ক্রাইব</h3>
              <input className="bg-gray-800 border-none p-3 w-full rounded" placeholder="ইমেইল দিন" />
            </div>
          </div>
          <div className="text-center pt-8 text-gray-600 text-xs font-bold uppercase tracking-widest">
            © ২০২৪-২০২৬ অন্বেষণ - Digital News Network
          </div>
        </footer>
      </body>
    </html>
  );
}
