export const metadata = {
  title: 'অন্বেষণ | সর্বশেষ বাংলা সংবাদ',
  description: 'বাংলাদেশের সর্বশেষ রাজনীতি, খেলাধুলা ও বিশ্ব সংবাদ।',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <header className="bg-white border-b-4 border-red-600 shadow-sm sticky top-0 z-50 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-4xl font-black text-red-600">অন্বেষণ</h1>
            <nav className="hidden md:flex space-x-6 font-bold text-gray-700">
              <a href="/" className="hover:text-red-600 px-2">হোম</a>
              <span className="hover:text-red-600 cursor-pointer px-2">বাংলাদেশ</span>
              <span className="hover:text-red-600 cursor-pointer px-2">খেলা</span>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bg-gray-900 text-white py-10 mt-12 text-center">
          <p>© {new Date().getFullYear()} অন্বেষণ - সর্বস্বত্ব সংরক্ষিত</p>
        </footer>
      </body>
    </html>
  )
}
