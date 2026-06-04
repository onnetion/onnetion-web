import Link from "next/link";

async function getPosts() {
  try {
    const res = await fetch('https://onnetion.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
      body: JSON.stringify({
        query: `{ posts(first: 10) { nodes { title slug excerpt featuredImage { node { sourceUrl } } } } }`,
      }),
    });

    // চেক করা হচ্ছে রেসপন্স কি JSON নাকি অন্য কিছু
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const json = await res.json();
      return json.data?.posts?.nodes || [];
    } else {
      console.error("ওয়ার্ডপ্রেস থেকে সঠিক ডাটা আসছে না।");
      return [];
    }
  } catch (error) {
    console.error("কানেকশন এরর:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8 text-black">
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Link href={`/${posts[0].slug}`} className="group">
              <img src={posts[0].featuredImage?.node.sourceUrl} className="w-full h-[400px] object-cover rounded-xl" alt="" />
              <h1 className="text-4xl font-extrabold mt-4 group-hover:text-red-600 leading-tight">{posts[0].title}</h1>
            </Link>
          </div>
          <div className="lg:col-span-4 space-y-4">
             <h3 className="font-bold text-xl border-b-2 border-red-600 inline-block mb-2">সর্বশেষ</h3>
             {posts.slice(1, 6).map(post => (
               <Link key={post.slug} href={`/${post.slug}`} className="flex gap-3 group border-b pb-3">
                 <img src={post.featuredImage?.node.sourceUrl} className="w-24 h-16 object-cover rounded" alt="" />
                 <h4 className="font-bold text-sm group-hover:text-red-600 leading-tight">{post.title}</h4>
               </Link>
             ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">খবর লোড হচ্ছে...</h2>
          <p className="text-gray-500">যদি খবর না আসে, তবে ওয়ার্ডপ্রেসে WPGraphQL প্লাগইনটি চেক করুন।</p>
        </div>
      )}
    </main>
  );
}
