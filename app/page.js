import Link from "next/link";

async function fetchNews() {
  const res = await fetch("https://onnetion.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{ posts(first: 30) { nodes { title slug excerpt date featuredImage { node { sourceUrl } } categories { nodes { name slug } } } } }`,
    }),
    cache: "no-store",
  });
  const json = await res.json();
  return json.data?.posts?.nodes || [];
}

export default async function Home() {
  const posts = await fetchNews();
  if (posts.length === 0) return <div className="p-20 text-center">লোড হচ্ছে...</div>;

  const lead = posts[0];
  const leadSide = posts.slice(1, 6);
  const sportsPosts = posts.slice(6, 11);
  const worldPosts = posts.slice(11, 15);
  const poyoshitiPosts = posts.slice(15, 20);

  return (
    <main className="container mx-auto px-4 py-8">
      
      {/* ১. টপ লিড সেকশন: ৩ কলাম লেআউট */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b pb-12 mb-12">
        {/* বাম দিকের খবরের তালিকা */}
        <div className="lg:col-span-3 space-y-4 border-r pr-6 hidden lg:block">
          {leadSide.slice(0, 4).map(post => (
            <Link key={post.slug} href={`/${post.slug}`} className="block border-b pb-3 group">
              <h3 className="font-bold text-md leading-tight group-hover:text-blue-700">{post.title}</h3>
            </Link>
          ))}
        </div>

        {/* মাঝখানের বড় লিড নিউজ */}
        <div className="lg:col-span-6 lg:px-6">
          <Link href={`/${lead.slug}`} className="group block text-center">
            <img src={lead.featuredImage?.node.sourceUrl} className="w-full h-auto object-cover rounded mb-4" />
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight group-hover:text-blue-700 transition">
              {lead.title}
            </h1>
            <div className="text-gray-600 mt-4 text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: lead.excerpt }} />
          </Link>
        </div>

        {/* ডান দিকের খবর (ছবির তালিকা) */}
        <div className="lg:col-span-3 lg:border-l pl-6 space-y-6">
          {leadSide.map(post => (
            <Link key={post.slug} href={`/${post.slug}`} className="flex gap-3 group border-b pb-4 last:border-0">
              <img src={post.featuredImage?.node.sourceUrl} className="w-20 h-16 object-cover flex-shrink-0" />
              <h4 className="font-bold text-sm leading-tight group-hover:text-blue-700">{post.title}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* ২. সেকশন: খেলাধুলা (বড় ইমেজ গ্রিড) */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold border-b-2 border-blue-700 inline-block mb-8 text-blue-800">খেলা</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href={`/${sportsPosts[0].slug}`} className="group block">
              <img src={sportsPosts[0].featuredImage?.node.sourceUrl} className="w-full h-80 object-cover mb-4" />
              <h2 className="text-2xl font-bold group-hover:text-blue-700 leading-tight">{sportsPosts[0].title}</h2>
            </Link>
          </div>
          {sportsPosts.slice(1, 4).map(post => (
            <Link key={post.slug} href={`/${post.slug}`} className="group border-b pb-4 lg:border-0">
              <img src={post.featuredImage?.node.sourceUrl} className="w-full h-32 object-cover mb-3" />
              <h4 className="font-bold leading-tight group-hover:text-blue-700">{post.title}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* ৩. সেকশন: পঠিত খবরের তালিকা (১, ২, ৩...) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t pt-12">
        <div className="lg:col-span-8">
           <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b-2 border-black inline-block pb-1">বাংলাদেশ</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
             {worldPosts.map(post => (
               <Link key={post.slug} href={`/${post.slug}`} className="flex gap-4 group">
                 <img src={post.featuredImage?.node.sourceUrl} className="w-32 h-24 object-cover flex-shrink-0 shadow-sm" />
                 <h4 className="font-bold text-lg leading-tight group-hover:text-blue-700">{post.title}</h4>
               </Link>
             ))}
           </div>
        </div>

        {/* ডানদিকের র‍্যাঙ্কিং */}
        <div className="lg:col-span-4 bg-gray-50 p-6 rounded shadow-sm border border-gray-100">
           <h3 className="font-bold text-xl mb-6 border-b pb-2">সর্বাধিক পঠিত</h3>
           <div className="space-y-6">
              {poyoshitiPosts.map((post, index) => (
                <Link key={post.slug} href={`/${post.slug}`} className="flex gap-4 items-start group border-b pb-4 last:border-0">
                  <span className="text-4xl font-black text-gray-200 group-hover:text-blue-600 transition">
                    {index + 1}
                  </span>
                  <h4 className="font-bold text-md leading-tight group-hover:text-blue-700">{post.title}</h4>
                </Link>
              ))}
           </div>
        </div>
      </div>
    </main>
  );
}
