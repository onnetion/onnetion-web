import Link from "next/link";

async function fetchNews() {
  try {
    const res = await fetch("https://onnetion.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ 
          posts(first: 20) { 
            nodes { 
              title 
              slug 
              excerpt 
              date 
              featuredImage { node { sourceUrl } } 
            } 
          } 
        }`,
      }),
      next: { revalidate: 60 },
    });

    const json = await res.json();
    return json.data?.posts?.nodes || [];
  } catch (error) {
    console.error("Data fetch failed");
    return [];
  }
}

export default async function Home() {
  const posts = await fetchNews();

  // যদি কোনো ডাটা না থাকে
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-400 italic">খবর লোড হতে সমস্যা হচ্ছে... দয়া করে ওয়ার্ডপ্রেস চেক করুন।</h2>
      </div>
    );
  }

  const lead = posts[0];
  const midList = posts.slice(1, 6);
  const bottomGrid = posts.slice(6, 14);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* ১ম অংশ: হিরো সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 border-b pb-12">
        {/* বাম দিকের বড় খবর */}
        <div className="lg:col-span-8 border-r pr-0 lg:pr-8">
          <Link href={`/${lead?.slug}`} className="group block">
            {lead?.featuredImage?.node?.sourceUrl && (
              <img src={lead.featuredImage.node.sourceUrl} className="w-full h-auto max-h-[450px] object-cover rounded-lg mb-6" alt="" />
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold group-hover:text-blue-700 leading-tight mb-4">
              {lead?.title}
            </h1>
            <div className="text-gray-600 line-clamp-3 text-lg" dangerouslySetInnerHTML={{ __html: lead?.excerpt }} />
          </Link>
        </div>

        {/* ডান দিকের সংবাদের তালিকা */}
        <div className="lg:col-span-4 space-y-5">
          <h3 className="font-bold text-xl mb-4 border-b-2 border-red-600 inline-block">সর্বশেষ</h3>
          {midList.map(post => (
            <Link key={post.slug} href={`/${post.slug}`} className="flex gap-4 group border-b pb-4 last:border-0">
               {post.featuredImage?.node?.sourceUrl && (
                 <img src={post.featuredImage.node.sourceUrl} className="w-24 h-16 object-cover rounded flex-shrink-0" alt="" />
               )}
              <h3 className="font-bold text-md group-hover:text-blue-700 leading-tight">
                {post.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* ২য় অংশ: গ্রিড সেকশন */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold border-l-4 border-blue-700 pl-3 mb-8">আরও সংবাদ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bottomGrid.map(post => (
            <Link key={post.slug} href={`/${post.slug}`} className="group block">
              {post.featuredImage?.node?.sourceUrl && (
                <img src={post.featuredImage.node.sourceUrl} className="w-full h-40 object-cover rounded mb-3" alt="" />
              )}
              <h4 className="font-bold group-hover:text-blue-700 leading-tight line-clamp-2">{post.title}</h4>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
