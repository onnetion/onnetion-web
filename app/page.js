import { fetchAPI } from "../lib/wordpress";
import Link from "next/link";

export default async function Home() {
  const data = await fetchAPI(`{
    posts(first: 30) {
      nodes {
        title
        slug
        excerpt
        date
        featuredImage { node { sourceUrl } }
      }
    }
  }`);
  
  const posts = data?.posts?.nodes || [];
  
  // যদি কোনো খবরই না থাকে
  if (posts.length === 0) {
    return <div className="p-20 text-center font-bold text-gray-400">খবর লোড হচ্ছে অথবা ডাটাবেস ফাঁকা...</div>;
  }

  // ডাটা স্ল্যাসিং (খবর ভাগ করা)
  const lead = posts[0];
  const subLead = posts.slice(1, 5);
  const sideList = posts.slice(5, 11);
  const videoStyleGrid = posts.slice(11, 15);
  const sportsGrid = posts.slice(15, 23);

  return (
    <main className="container mx-auto px-4 py-8 bg-white">
      {/* ১. টপ হিরো সেকশন: প্রফেশনাল ৩ কলাম */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b pb-12 mb-12">
        
        {/* বাম কলাম: সাব-নিউজ (৪টি) */}
        <div className="lg:col-span-3 space-y-6 hidden lg:block border-r pr-6">
          {subLead.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="block border-b pb-4 last:border-0 group">
              <h3 className="font-bold text-[17px] leading-tight group-hover:text-blue-700 transition">{p.title}</h3>
              <p className="text-[11px] text-gray-400 mt-2 font-bold uppercase tracking-tighter">৫ মিনিট আগে</p>
            </Link>
          ))}
        </div>

        {/* মাঝখানের প্রধান লিড নিউজ */}
        <div className="lg:col-span-6 lg:px-6">
          <Link href={`/${lead?.slug}`} className="group block text-center">
            {lead?.featuredImage?.node?.sourceUrl ? (
              <div className="aspect-video overflow-hidden rounded-sm mb-6 bg-gray-100">
                <img src={lead.featuredImage.node.sourceUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" alt="" />
              </div>
            ) : <div className="aspect-video bg-gray-100 mb-6 rounded"></div>}
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter group-hover:text-blue-700 transition">
              {lead?.title}
            </h1>
            <div className="text-gray-500 mt-6 text-lg line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: lead?.excerpt || "" }} />
          </Link>
        </div>

        {/* ডান কলাম: সর্বাধিক পঠিত র‍্যাঙ্কিং */}
        <div className="lg:col-span-3 lg:border-l pl-6 space-y-8">
           <h3 className="font-black text-xl border-b-2 border-black inline-block pb-1 mb-4 uppercase">আলোচিত</h3>
           {sideList.map((p, i) => (
            <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group border-b pb-4 last:border-0 items-start">
              <span className="text-3xl font-black text-gray-200 group-hover:text-blue-600 transition">{i + 1}</span>
              <h4 className="font-bold text-[15px] leading-tight group-hover:text-blue-700">{p.title}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* ২. ভিডিও স্টাইল সেকশন (প্লে আইকন এফেক্ট) */}
      <div className="py-12 bg-[#1a1a1a] -mx-4 px-4 text-white mb-12 shadow-inner">
         <div className="container mx-auto">
            <h2 className="text-2xl font-black mb-8 border-l-4 border-red-600 pl-4 uppercase">ভিডিও সংবাদ</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {videoStyleGrid.map(p => (
                  <Link key={p.slug} href={`/${p.slug}`} className="group block">
                     <div className="aspect-video bg-gray-800 rounded-sm overflow-hidden relative border border-gray-700">
                        {p.featuredImage?.node?.sourceUrl && (
                          <img src={p.featuredImage.node.sourceUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" alt="" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition text-white">▶</div>
                        </div>
                     </div>
                     <h4 className="mt-4 font-bold text-lg leading-tight group-hover:text-red-400 transition">{p.title}</h4>
                  </Link>
               ))}
            </div>
         </div>
      </div>

      {/* ৩. গ্রিড সেকশন: বাংলাদেশ ও অন্যান্য */}
      <div className="mb-20">
        <h2 className="text-3xl font-black mb-10 border-b-4 border-blue-800 inline-block pb-1 uppercase">বাংলাদেশ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
           {sportsGrid.map(p => (
             <Link key={p.slug} href={`/${p.slug}`} className="group block border-b pb-6 md:border-b-0">
                <div className="aspect-[16/10] overflow-hidden rounded-sm mb-4 bg-gray-50 border">
                  {p.featuredImage?.node?.sourceUrl && (
                    <img src={p.featuredImage.node.sourceUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="" />
                  )}
                </div>
                <h4 className="font-bold text-lg group-hover:text-blue-700 leading-tight">{p.title}</h4>
             </Link>
           ))}
        </div>
      </div>
    </main>
  );
}
