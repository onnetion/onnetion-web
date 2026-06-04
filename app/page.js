import Link from "next/link";

async function getPosts() {
  const res = await fetch("https://onnetion.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{ posts(first: 35) { nodes { title slug excerpt date featuredImage { node { sourceUrl } } categories { nodes { name slug } } } } }`,
    }),
    cache: "no-store",
  });
  const json = await res.json();
  return json.data?.posts?.nodes || [];
}

export default async function Home() {
  const posts = await getPosts();
  if (posts.length === 0) return <div className="p-20 text-center font-bold">সার্ভার এরর...</div>;

  const lead = posts[0];
  const subLead = posts.slice(1, 6);
  const worldNews = posts.slice(6, 12);
  const sports = posts.slice(12, 16);
  const mostRead = posts.slice(16, 22);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* ১. টপ হিরো সেকশন: ৩ কলাম গ্রিড */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b pb-12 mb-12">
        {/* বাম কলাম: সাব-নিউজ তালিকা */}
        <div className="lg:col-span-3 space-y-6 hidden lg:block border-r pr-6">
          {subLead.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="block border-b pb-4 last:border-0 group">
              <h3 className="font-bold text-[17px] leading-snug group-hover:text-blue-700">{p.title}</h3>
              <p className="text-[11px] text-gray-400 mt-2 font-bold italic">৩ ঘণ্টা আগে</p>
            </Link>
          ))}
        </div>

        {/* মাঝের কলাম: বিশাল লিড নিউজ */}
        <div className="lg:col-span-6 lg:px-6">
          <Link href={`/${lead.slug}`} className="group block text-center">
            <div className="aspect-video news-img-hover mb-6">
              <img src={lead.featuredImage?.node?.sourceUrl} className="w-full h-full" alt="" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter group-hover:text-blue-700 transition">
              {lead.title}
            </h1>
            <div className="text-gray-500 mt-6 text-lg line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: lead.excerpt }} />
          </Link>
        </div>

        {/* ডান কলাম: ছবিসহ শর্ট নিউজ */}
        <div className="lg:col-span-3 lg:border-l pl-6 space-y-8">
           <h3 className="font-black text-xl border-b pb-2 mb-4">বাংলাদেশ</h3>
           {worldNews.slice(0, 4).map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group border-b pb-4 last:border-0">
              <div className="w-24 h-20 bg-gray-100 flex-shrink-0 rounded-sm overflow-hidden">
                <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-sm leading-tight group-hover:text-blue-700">{p.title}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* ২. সেকশন: ভিডিও (প্রথম আলোর মতো প্লে আইকন গ্রিড) */}
      <div className="py-12 bg-gray-50 -mx-4 px-4 border-y mb-12">
         <div className="container mx-auto">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-2"><span className="text-red-600">●</span> ভিডিও</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {posts.slice(22, 26).map(p => (
                  <Link key={p.slug} href={`/${p.slug}`} className="group relative">
                     <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                        <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-full text-white ring-4 ring-white/20">▶</div>
                        </div>
                     </div>
                     <h4 className="mt-4 font-bold text-lg group-hover:text-blue-700 leading-tight">{p.title}</h4>
                  </Link>
               ))}
            </div>
         </div>
      </div>

      {/* ৩. মিক্সড সেকশন: খেলা ও র‍্যাঙ্কিং */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8">
            <h2 className="text-3xl font-black mb-8 border-l-8 border-blue-700 pl-4">খেলা</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <Link href={`/${sports[0]?.slug}`} className="group block md:col-span-1">
                  <img src={sports[0]?.featuredImage?.node?.sourceUrl} className="w-full aspect-[16/10] object-cover rounded-sm mb-4" />
                  <h3 className="text-2xl font-bold group-hover:text-blue-700">{sports[0]?.title}</h3>
               </Link>
               <div className="space-y-6">
                  {sports.slice(1, 4).map(p => (
                     <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group border-b pb-4">
                        <img src={p.featuredImage?.node?.sourceUrl} className="w-28 h-20 object-cover" />
                        <h4 className="font-bold text-[15px] group-hover:text-blue-700">{p.title}</h4>
                     </Link>
                  ))}
               </div>
            </div>
         </div>

         {/* ডানদিকের র‍্যাঙ্কিং (পঠিত) */}
         <div className="lg:col-span-4 bg-white border p-6 rounded shadow-sm">
            <h3 className="font-black text-2xl mb-8 border-b-2 border-black inline-block pb-1">সর্বাধিক পঠিত</h3>
            <div className="space-y-8">
               {mostRead.map((p, i) => (
                  <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group items-start border-b pb-6 last:border-0">
                     <span className="rank-number">{i + 1}</span>
                     <h4 className="font-bold text-lg group-hover:text-blue-700 leading-tight">{p.title}</h4>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </main>
  );
}
