import { fetchAPI } from "../lib/wordpress";
import Link from "next/link";

async function getNews() {
  const data = await fetchAPI(`{ 
    posts(first: 40) { 
      nodes { 
        title slug excerpt date 
        featuredImage { node { sourceUrl } } 
      } 
    } 
  }`);
  return data?.posts?.nodes || [];
}

export default async function Home() {
  const posts = await getNews();
  if (!posts.length) return <div className="p-40 text-center animate-pulse">লোড হচ্ছে...</div>;

  // নিখুঁত ডাটা স্ল্যাসিং
  const leftSide = posts.slice(0, 3);
  const mainLead = posts[3];
  const rightLatest = posts.slice(4, 10);
  const videoNews = posts.slice(10, 15);
  const bangladeshSection = posts.slice(15, 19);
  const mostRead = posts.slice(19, 25);

  return (
    <main className="container mx-auto px-4 py-8">
      
      {/* ১. টপ সেকশন: ৩ কলাম পারফেক্ট গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b pb-12 mb-12">
        
        {/* বাম কলাম: ৩টি খবরের স্ট্যাক */}
        <div className="lg:col-span-3 space-y-6 border-r pr-6 hidden lg:block">
          {leftSide.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="block border-b pb-4 last:border-0 group">
              <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-32 object-cover rounded mb-3" alt="" />
              <h3 className="font-bold text-lg leading-tight group-hover:text-blue-700">{p.title}</h3>
            </Link>
          ))}
        </div>

        {/* মাঝখানের কলাম: মেইন লিড নিউজ */}
        <div className="lg:col-span-6 lg:px-4">
          <Link href={`/${mainLead?.slug}`} className="group block">
            <img src={mainLead?.featuredImage?.node?.sourceUrl} className="w-full h-auto object-cover rounded-sm mb-6" alt="" />
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter group-hover:text-blue-700 text-center">
              {mainLead?.title}
            </h1>
            <div className="text-gray-500 mt-6 text-lg text-center line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: mainLead?.excerpt }} />
            <p className="text-xs text-gray-400 text-center mt-4 font-bold uppercase tracking-widest italic">৪ ঘণ্টা আগে</p>
          </Link>
        </div>

        {/* ডান কলাম: সর্বশেষ সংবাদের তালিকা */}
        <div className="lg:col-span-3 border-l pl-6">
           <h3 className="text-sm font-bold text-red-600 border-b pb-1 mb-6 flex justify-between">
              <span className="uppercase tracking-tighter">সর্বশেষ</span>
              <span className="text-[10px]">লাইভ ●</span>
           </h3>
           <div className="space-y-5">
              {rightLatest.map((p, i) => (
                <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group border-b border-gray-50 pb-3 last:border-0">
                  <span className="text-2xl font-black text-gray-200 group-hover:text-red-600 transition">{i + 1}</span>
                  <h4 className="font-bold text-sm leading-tight group-hover:text-blue-700">{p.title}</h4>
                </Link>
              ))}
           </div>
        </div>
      </div>

      {/* ২. ভিডিও সেকশন: আপনার স্ক্রিনশট অনুযায়ী প্রফেশনাল ডিজাইন */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6 group cursor-pointer">
          <h2 className="text-2xl font-black">ভিডিও</h2>
          <span className="text-red-600 text-2xl group-hover:translate-x-1 transition">›</span>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {videoNews.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="min-w-[280px] md:min-w-[340px] flex-shrink-0 group flex flex-col h-full border rounded-lg overflow-hidden">
              <div className="relative aspect-video bg-black flex-shrink-0">
                <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition" alt="" />
                <div className="absolute top-3 left-3 bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
                </div>
              </div>
              <div className="video-card">
                <div>
                  <h3 className="font-bold text-[17px] leading-snug group-hover:text-blue-800 transition">{p.title}</h3>
                  <div className="text-gray-500 text-xs mt-3 line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.excerpt }} />
                </div>
                <p className="text-gray-400 text-[10px] font-bold mt-4 uppercase">৪ ঘণ্টা আগে</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ৩. বাংলাদেশ সেকশন ও সর্বাধিক পঠিত */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t">
        {/* বাংলাদেশ গ্রিড */}
        <div className="lg:col-span-8">
           <h2 className="section-title"><span>বাংলাদেশ</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              {bangladeshSection.map(p => (
                <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group border-b md:border-0 pb-4 md:pb-0">
                  <img src={p.featuredImage?.node?.sourceUrl} className="w-32 h-24 object-cover flex-shrink-0 rounded-sm" alt="" />
                  <h4 className="font-bold text-lg leading-tight group-hover:text-blue-700">{p.title}</h4>
                </Link>
              ))}
           </div>
        </div>

        {/* সর্বাধিক পঠিত র‍্যাঙ্কিং */}
        <div className="lg:col-span-4 bg-[#f9f9f9] p-6 rounded-sm border border-gray-100">
           <h3 className="font-bold text-xl mb-8 border-b pb-2">সর্বাধিক পঠিত</h3>
           <div className="space-y-6">
              {mostRead.map((p, i) => (
                <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 items-start group border-b border-gray-200 pb-5 last:border-0">
                  <span className="text-3xl font-black text-gray-200 group-hover:text-blue-600 transition">{i + 1}</span>
                  <h4 className="font-bold text-[15px] leading-tight group-hover:text-blue-700">{p.title}</h4>
                </Link>
              ))}
           </div>
        </div>
      </div>

    </main>
  );
}
