import Link from "next/link";

async function getProNews() {
  const res = await fetch("https://onnetion.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{ 
        posts(first: 35) { 
          nodes { 
            title slug excerpt date 
            featuredImage { node { sourceUrl } } 
            categories { nodes { name slug } }
          } 
        } 
      }`,
    }),
    next: { revalidate: 60 }
  });
  const json = await res.json();
  return json.data?.posts?.nodes || [];
}

export default async function Home() {
  const posts = await getProNews();
  if (!posts.length) return <div className="p-40 text-center font-bold">ডেটা কানেক্ট হচ্ছে... ওয়ার্ডপ্রেস চেক করুন।</div>;

  const lead = posts[0];
  const midGrid = posts.slice(1, 5);
  const latestList = posts.slice(5, 11);
  const videoGrid = posts.slice(11, 15);
  const mostRead = posts.slice(15, 21);
  const sports = posts.slice(21, 27);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* SECTION 1: THE HERO (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b pb-12 mb-12">
        {/* কলাম ১: সাব লিড */}
        <div className="lg:col-span-3 border-r pr-6 hidden lg:block space-y-6">
           {midGrid.slice(0, 3).map(p => (
             <Link key={p.slug} href={`/${p.slug}`} className="block border-b pb-4 group last:border-0">
               <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-32 object-cover rounded mb-3" alt="" />
               <h3 className="font-bold text-lg group-hover:text-blue-700 leading-tight">{p.title}</h3>
             </Link>
           ))}
        </div>

        {/* কলাম ২: বিশাল লিড */}
        <div className="lg:col-span-6 lg:px-6">
          <Link href={`/${lead.slug}`} className="group block text-center">
            <div className="overflow-hidden rounded-sm mb-6 aspect-video bg-gray-50">
              <img src={lead.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter group-hover:text-blue-700">{lead.title}</h1>
            <div className="text-gray-500 mt-6 text-xl line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: lead.excerpt }} />
          </Link>
        </div>

        {/* কলাম ৩: সর্বশেষ তালিকা */}
        <div className="lg:col-span-3 border-l pl-6">
           <h3 className="section-heading"><span>সর্বশেষ সংবাদ</span></h3>
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

      {/* SECTION 2: VIDEO GRID (প্লে আইকনসহ) */}
      <div className="py-16 bg-[#0a0a0a] -mx-4 px-4 text-white mb-16 shadow-2xl">
         <div className="container mx-auto">
            <h2 className="section-heading border-gray-800"><span>ভিডিও সংবাদ</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {videoGrid.map(p => (
                  <Link key={p.slug} href={`/${p.slug}`} className="group relative">
                     <div className="aspect-video bg-black rounded-lg overflow-hidden relative border border-gray-800">
                        <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" alt="" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition text-white">▶</div>
                        </div>
                     </div>
                     <h4 className="mt-4 font-bold text-lg leading-tight group-hover:text-red-500 transition">{p.title}</h4>
                  </Link>
               ))}
            </div>
         </div>
      </div>

      {/* SECTION 3: CATEGORY & MOST READ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8">
            <h2 className="section-heading"><span>খেলাধুলা</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <Link href={`/${sports[0].slug}`} className="group block">
                  <img src={sports[0].featuredImage?.node?.sourceUrl} className="w-full aspect-[16/10] object-cover mb-4" />
                  <h3 className="text-2xl font-bold group-hover:text-blue-700">{sports[0].title}</h3>
               </Link>
               <div className="space-y-6">
                  {sports.slice(1, 5).map(p => (
                     <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group border-b pb-4 last:border-0">
                        <img src={p.featuredImage?.node?.sourceUrl} className="w-24 h-16 object-cover" />
                        <h4 className="font-bold text-sm group-hover:text-blue-700 leading-tight">{p.title}</h4>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
         <div className="lg:col-span-4 bg-gray-50 p-6 rounded-sm border">
            <h3 className="section-heading"><span>সর্বাধিক পঠিত</span></h3>
            <div className="space-y-8">
               {mostRead.map((p, i) => (
                  <Link key={p.slug} href={`/${p.slug}`} className="flex gap-5 group items-start border-b pb-6 last:border-0">
                     <span className="text-4xl font-black text-gray-200 group-hover:text-blue-700 transition">{i + 1}</span>
                     <h4 className="font-bold text-lg leading-tight group-hover:text-blue-700">{p.title}</h4>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </main>
  );
}
