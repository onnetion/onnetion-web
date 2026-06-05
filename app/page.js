import { fetchAPI } from "../lib/wordpress";
import Link from "next/link";

async function getProNews() {
  const data = await fetchAPI(`{ 
    posts(first: 35) { 
      nodes { 
        title slug excerpt date 
        featuredImage { node { sourceUrl } } 
        categories { nodes { name slug } }
      } 
    } 
  }`);
  return data?.posts?.nodes || [];
}

export default async function Home() {
  const posts = await getProNews();
  if (!posts.length) return <div className="p-40 text-center animate-pulse font-bold">অন্বেষণ ডাটা লোড হচ্ছে...</div>;

  // ডাটা ভাগ করা
  const lead = posts[0];
  const midGrid = posts.slice(1, 5);
  const latestList = posts.slice(5, 11);
  const videoGrid = posts.slice(11, 16); // ভিডিওর জন্য ৫টি খবর
  const mostRead = posts.slice(16, 22);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* ১. টপ হিরো সেকশন: ৩ কলাম গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b pb-12 mb-12">
        <div className="lg:col-span-3 border-r pr-6 hidden lg:block space-y-6">
           {midGrid.slice(0, 3).map(p => (
             <Link key={p.slug} href={`/${p.slug}`} className="block border-b pb-4 group last:border-0">
               <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-32 object-cover rounded mb-3" alt="" />
               <h3 className="font-bold text-lg group-hover:text-blue-700 leading-tight">{p.title}</h3>
             </Link>
           ))}
        </div>

        <div className="lg:col-span-6 lg:px-6">
          <Link href={`/${lead.slug}`} className="group block text-center">
            <div className="overflow-hidden rounded-sm mb-6 aspect-video bg-gray-50">
              <img src={lead.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter group-hover:text-blue-700">{lead.title}</h1>
            <div className="text-gray-500 mt-6 text-xl line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: lead.excerpt }} />
          </Link>
        </div>

        <div className="lg:col-span-3 border-l pl-6">
           <h3 className="text-xl font-bold border-b-2 border-black pb-1 mb-6 flex justify-between">
              <span>সর্বশেষ</span>
              <span className="text-red-600 text-xs">লাইভ ●</span>
           </h3>
           <div className="space-y-6">
              {latestList.map((p, i) => (
                <Link key={p.slug} href={`/${p.slug}`} className="flex gap-3 group border-b pb-4 last:border-0">
                  <span className="text-3xl font-black text-gray-100 group-hover:text-red-600 transition">{i + 1}</span>
                  <h4 className="font-bold text-sm leading-tight group-hover:text-blue-700">{p.title}</h4>
                </Link>
              ))}
           </div>
        </div>
      </div>

      {/* ২. ভিডিও গ্যালারি সেকশন (আপনার স্ক্রিনশট অনুযায়ী হুবহু ডিজাইন) */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6 group cursor-pointer">
          <h2 className="text-2xl font-black border-l-0 pl-0">ভিডিও</h2>
          <span className="text-red-600 text-2xl group-hover:translate-x-2 transition inline-block">›</span>
        </div>
        
        {/* ভিডিও স্লাইডার গ্রিড */}
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {videoGrid.map((p) => (
            <Link key={p.slug} href={`/${p.slug}`} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 group">
              <div className="relative aspect-video rounded-t-lg overflow-hidden bg-black">
                <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" alt="" />
                {/* লাল প্লে বাটন */}
                <div className="absolute top-3 left-3 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                  </svg>
                </div>
              </div>
              {/* টেক্সট এরিয়া (হালকা নীল ব্যাকগ্রাউন্ড) */}
              <div className="bg-[#f0f7fa] p-5 h-56 flex flex-col justify-between rounded-b-lg group-hover:bg-[#e6f2f8] transition">
                <div>
                  <h3 className="font-bold text-lg leading-tight text-center mb-3 group-hover:text-blue-800">
                    {p.title}
                  </h3>
                  <div className="text-gray-500 text-sm line-clamp-3 text-center" dangerouslySetInnerHTML={{ __html: p.excerpt }} />
                </div>
                <p className="text-gray-400 text-xs text-center font-bold mt-4">৪ ঘণ্টা আগে</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ৩. ক্যাটাগরি ও সর্বাধিক পঠিত সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 border-t pt-12">
         <div className="lg:col-span-8">
            <h2 className="text-3xl font-black mb-8 border-l-8 border-blue-700 pl-4">বাংলাদেশ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
               {mostRead.slice(0, 4).map(p => (
                <Link key={p.slug} href={`/${p.slug}`} className="flex gap-5 group">
                  <div className="w-32 h-24 flex-shrink-0">
                    <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover rounded shadow-sm" alt="" />
                  </div>
                  <h4 className="font-bold text-xl group-hover:text-blue-700 leading-tight">{p.title}</h4>
                </Link>
              ))}
            </div>
         </div>
         <div className="lg:col-span-4 bg-gray-50 p-8 rounded-sm">
            <h3 className="text-xl font-bold border-b-2 border-black inline-block pb-1 mb-8">সর্বাধিক পঠিত</h3>
            <div className="space-y-8">
               {mostRead.map((p, i) => (
                  <Link key={p.slug} href={`/${p.slug}`} className="flex gap-5 group items-start border-b pb-6 last:border-0">
                     <span className="text-4xl font-black text-gray-200 group-hover:text-red-600 transition">{i + 1}</span>
                     <h4 className="font-bold text-lg group-hover:text-blue-700 leading-tight">{p.title}</h4>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </main>
  );
}
