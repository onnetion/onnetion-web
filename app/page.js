import Link from "next/link";

async function fetchNews() {
  try {
    const res = await fetch("https://onnetion.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ posts(first: 25) { nodes { title slug excerpt date featuredImage { node { sourceUrl } } categories { nodes { name } } } } }`,
      }),
      cache: "no-store",
    });
    const json = await res.json();
    return json.data?.posts?.nodes || [];
  } catch (err) { return []; }
}

export default async function Home() {
  const posts = await fetchNews();
  if (posts.length === 0) return <div className="p-20 text-center font-bold">সার্ভার এরর... দয়া করে ওয়ার্ডপ্রেস চেক করুন।</div>;

  const mainLead = posts[0];
  const subLeads = posts.slice(1, 3);
  const midList = posts.slice(3, 8);
  const sportsSection = posts.slice(8, 12);
  const bottomGrid = posts.slice(12, 20);

  return (
    <main className="container mx-auto px-4 py-8 bg-white shadow-xl mt-4 rounded-xl min-h-screen">
      
      {/* ১ম অংশ: হিরো গ্রিড (প্রথম আলোর মতো) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b-2 border-gray-100">
        
        {/* বাম দিকের ২টো মাঝারি খবর */}
        <div className="lg:col-span-3 space-y-8 hidden lg:block">
          {subLeads.map(post => (
            <Link key={post.slug} href={`/${post.slug}`} className="block news-card-border group">
               <img src={post.featuredImage?.node?.sourceUrl} className="w-full h-40 object-cover rounded-lg mb-3 grayscale hover:grayscale-0 transition duration-500" />
               <h3 className="font-bold text-xl group-hover:text-red-600 leading-snug">{post.title}</h3>
            </Link>
          ))}
        </div>

        {/* মাঝখানের প্রধান খবর (বিশাল লিড) */}
        <div className="lg:col-span-6 lg:px-6 lg:border-x">
          <Link href={`/${mainLead.slug}`} className="group block text-center">
             <img src={mainLead.featuredImage?.node?.sourceUrl} className="w-full h-auto rounded-xl mb-6 shadow-2xl" />
             <h1 className="text-4xl md:text-5xl font-black group-hover:text-red-600 leading-tight mb-4 tracking-tighter">
                {mainLead.title}
             </h1>
             <p className="text-gray-600 text-lg leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: mainLead.excerpt }} />
          </Link>
        </div>

        {/* ডান দিকের সংবাদের তালিকা */}
        <div className="lg:col-span-3 space-y-4">
          <h3 className="text-red-600 font-black border-b-2 border-red-600 inline-block mb-4">সর্বশেষ</h3>
          {midList.map(post => (
            <Link key={post.slug} href={`/${post.slug}`} className="block news-card-border group">
               <h4 className="font-bold text-lg leading-tight group-hover:text-blue-700 italic">{post.title}</h4>
               <p className="text-xs text-gray-400 mt-1">১ ঘণ্টা আগে</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ২য় অংশ: ক্যাটাগরি গ্রিড (খেলাধুলা) */}
      <div className="py-16 border-b-2 border-gray-100">
         <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-black border-l-8 border-red-600 pl-4">খেলাধুলা</h2>
            <span className="text-red-600 font-bold cursor-pointer">সব খবর →</span>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {sportsSection.map(post => (
              <Link key={post.slug} href={`/${post.slug}`} className="group">
                 <div className="overflow-hidden rounded-2xl mb-4 relative">
                    <img src={post.featuredImage?.node?.sourceUrl} className="w-full h-48 object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                 </div>
                 <h4 className="font-bold text-xl group-hover:text-red-600 leading-tight line-clamp-2">{post.title}</h4>
              </Link>
            ))}
         </div>
      </div>

      {/* ৩য় অংশ: আরও খবর (মাল্টি-কলাম গ্রিড) */}
      <div className="py-16">
        <h2 className="text-3xl font-black mb-10 border-l-8 border-blue-600 pl-4">বাংলাদেশ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {bottomGrid.map(post => (
            <Link key={post.slug} href={`/${post.slug}`} className="flex flex-col group">
               <img src={post.featuredImage?.node?.sourceUrl} className="w-full h-40 object-cover rounded-xl mb-3 shadow-sm" />
               <h4 className="font-bold group-hover:text-blue-700 leading-tight">{post.title}</h4>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}
