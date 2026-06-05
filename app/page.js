import { fetchAPI } from "../lib/wordpress";
import Link from "next/link";

export const dynamic = 'force-dynamic';

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

  const subLeads = posts.slice(0, 3);
  const mainLead = posts[3];
  const latestList = posts.slice(4, 10);
  const videoPosts = posts.slice(10, 15);
  const worldNews = posts.slice(15, 19);
  const mostRead = posts.slice(19, 25);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* ১. হিরো সেকশন: ৩ কলাম গ্রিড (পারফেক্ট অ্যালাইনমেন্ট) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b pb-12 mb-12">
        {/* কলাম ১: ৩টি ফটো নিউজ */}
        <div className="lg:col-span-3 space-y-6 border-r pr-6 hidden lg:block">
          {subLeads.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="block border-b pb-4 last:border-0 group">
              <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-32 object-cover rounded-sm mb-3 grayscale group-hover:grayscale-0 transition" alt="" />
              <h3 className="font-bold text-[17px] leading-tight group-hover:text-blue-700">{p.title}</h3>
            </Link>
          ))}
        </div>

        {/* কলাম ২: মেইন লিড */}
        <div className="lg:col-span-6 lg:px-4 text-center">
          <Link href={`/${mainLead?.slug}`} className="group block">
            <img src={mainLead?.featuredImage?.node?.sourceUrl} className="w-full h-auto rounded-sm mb-6" alt="" />
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter group-hover:text-blue-700">
              {mainLead?.title}
            </h1>
            <div className="text-gray-500 mt-6 text-xl line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: mainLead?.excerpt }} />
            <p className="text-xs text-gray-400 mt-4 font-bold uppercase tracking-widest italic font-serif">৪ ঘণ্টা আগে</p>
          </Link>
        </div>

        {/* কলাম ৩: সর্বশেষ তালিকা */}
        <div className="lg:col-span-3 border-l pl-6">
           <h3 className="text-sm font-bold text-red-600 border-b pb-1 mb-6 flex justify-between">
              <span>সর্বশেষ</span><span className="text-[10px]">লাইভ ●</span>
           </h3>
           <div className="space-y-5">
              {latestList.map((p, i) => (
                <Link key={p.slug} href={`/${p.slug}`} className="flex gap-3 group border-b pb-3 last:border-0">
                  <span className="text-2xl font-black text-gray-200 group-hover:text-red-600 transition">{i + 1}</span>
                  <h4 className="font-bold text-sm leading-tight group-hover:text-blue-700">{p.title}</h4>
                </Link>
              ))}
           </div>
        </div>
      </div>

      {/* ২. ভিডিও সেকশন: আপনার স্ক্রিনশট অনুযায়ী হুবহু ডিজাইন */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6 group cursor-pointer w-fit">
          <h2 className="text-2xl font-black">ভিডিও</h2>
          <span className="text-red-600 text-2xl group-hover:translate-x-1 transition">›</span>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {videoPosts.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 group flex flex-col h-full rounded-lg overflow-hidden border">
              <div className="relative aspect-video bg-black flex-shrink-0">
                <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition" alt="" />
                <div className="absolute top-3 left-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border border-white">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>
                </div>
              </div>
              {/* নিচের নীল বক্স */}
              <div className="video-card-box">
                <div>
                  <h3 className="font-bold text-[17px] leading-tight group-hover:text-blue-800 transition text-center">{p.title}</h3>
                  <div className="text-gray-500 text-xs mt-3 line-clamp-3 leading-relaxed text-center" dangerouslySetInnerHTML={{ __html: p.excerpt }} />
                </div>
                <p className="text-gray-400 text-[10px] font-bold text-center uppercase tracking-widest">৫ ঘণ্টা আগে</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ৩. বাংলাদেশ ও সর্বাধিক পঠিত গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t pt-12">
        <div className="lg:col-span-8">
           <h2 className="section-label"><span>বাংলাদেশ</span></h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              {worldNews.map(p => (
                <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group">
                  <img src={p.featuredImage?.node?.sourceUrl} className="w-32 h-24 object-cover flex-shrink-0 rounded-sm" alt="" />
                  <h4 className="font-bold text-lg leading-tight group-hover:text-blue-700">{p.title}</h4>
                </Link>
              ))}
           </div>
        </div>
        <div className="lg:col-span-4 bg-[#f9f9f9] p-6 rounded-sm border">
           <h3 className="text-xl font-bold border-b pb-2 mb-8 uppercase tracking-tighter">সর্বাধিক পঠিত</h3>
           <div className="space-y-8">
              {mostRead.map((p, i) => (
                <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group items-start border-b pb-6 last:border-0">
                  <span className="text-3xl font-black text-gray-200 group-hover:text-blue-700 transition">{i + 1}</span>
                  <h4 className="font-bold text-[17px] leading-tight group-hover:text-blue-700">{p.title}</h4>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </main>
  );
}
