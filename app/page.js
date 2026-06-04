import Link from "next/link";

async function fetchNews() {
  try {
    const res = await fetch("https://onnetion.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ 
          posts(first: 12) { 
            nodes { 
              title 
              slug 
              excerpt 
              featuredImage { node { sourceUrl } } 
            } 
          } 
        }`,
      }),
      cache: "no-store",
    });

    const json = await res.json();
    return json.data?.posts?.nodes || [];
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const posts = await fetchNews();

  // যদি খবর না পাওয়া যায় তবে খালি পেজ না দেখিয়ে একটি মেসেজ দেখাবে
  const hasPosts = posts.length > 0;
  const mainLead = hasPosts ? posts[0] : null;
  const sideList = hasPosts ? posts.slice(1, 6) : [];
  const bottomGrid = hasPosts ? posts.slice(6, 12) : [];

  return (
    <main className="container mx-auto px-4 py-8 bg-white shadow-lg mt-4 rounded-xl min-h-[600px]">
      {!hasPosts ? (
        <div className="text-center py-40">
           <h2 className="text-xl font-bold text-red-600 animate-pulse font-['Hind_Siliguri']">
             সার্ভার থেকে খবর লোড হতে দেরি হচ্ছে... দয়া করে ব্রাউজার রিফ্রেশ দিন অথবা Hostinger ModSecurity চেক করুন।
           </h2>
        </div>
      ) : (
        <>
          {/* টপ সেকশন: ৩ কলাম লেআউট (প্রিমিয়াম) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b pb-12 mb-12">
            
            {/* বাম পাশ: খবরের তালিকা */}
            <div className="lg:col-span-3 space-y-5 hidden lg:block border-r pr-6">
              <h3 className="font-black text-blue-700 border-b pb-2 mb-4">আলোচিত</h3>
              {sideList.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/${post.slug}`} className="block border-b pb-4 group last:border-0">
                  <h4 className="font-bold text-md leading-tight group-hover:text-red-600 transition duration-300">
                    {post.title}
                  </h4>
                </Link>
              ))}
            </div>

            {/* মাঝখান: বিশাল লিড নিউজ (প্রথম আলোর মতো) */}
            <div className="lg:col-span-6 lg:px-6">
              <Link href={`/${mainLead.slug}`} className="group block text-center">
                <img src={mainLead.featuredImage?.node?.sourceUrl} className="w-full h-auto rounded-2xl shadow-xl mb-6 hover:scale-[1.02] transition duration-500" alt="" />
                <h1 className="text-4xl md:text-5xl font-black group-hover:text-red-600 leading-tight mb-4 tracking-tighter">
                  {mainLead.title}
                </h1>
                <div className="text-gray-500 text-lg line-clamp-2" dangerouslySetInnerHTML={{ __html: mainLead.excerpt }} />
              </Link>
            </div>

            {/* ডান পাশ: ছবিসহ ছোট নিউজ */}
            <div className="lg:col-span-3 lg:border-l pl-6 space-y-6">
              <h3 className="font-black text-red-600 border-b pb-2 mb-4">সর্বশেষ</h3>
              {sideList.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`} className="flex gap-3 group border-b pb-4 last:border-0">
                  <img src={post.featuredImage?.node?.sourceUrl} className="w-20 h-16 object-cover rounded-lg flex-shrink-0" alt="" />
                  <h4 className="font-bold text-sm group-hover:text-blue-700 leading-tight">
                    {post.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          {/* নিচের অংশ: ৪ কলাম গ্রিড */}
          <div className="py-8">
            <h2 className="text-2xl font-black mb-10 border-l-8 border-red-600 pl-4 uppercase">আরও সংবাদ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {bottomGrid.map((post) => (
                <Link key={post.slug} href={`/${post.slug}`} className="group bg-gray-50 p-3 rounded-2xl hover:bg-white hover:shadow-2xl transition duration-500 border">
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img src={post.featuredImage?.node?.sourceUrl} className="w-full h-40 object-cover group-hover:scale-110 transition duration-700" alt="" />
                  </div>
                  <h4 className="font-bold text-lg group-hover:text-red-600 leading-tight line-clamp-2">
                    {post.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
