import Link from "next/link";

async function getPosts() {
  try {
    const res = await fetch('https://onnetion.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{ posts(first: 10) { nodes { title slug excerpt featuredImage { node { sourceUrl } } } } }`,
      }),
      cache: 'no-store' // একদম তাজা ডাটা আনবে
    });

    if (!res.ok) {
       return { posts: [], error: `সার্ভার এরর: ${res.status}. হোস্টিনজার ব্লক করছে।` };
    }

    const json = await res.json();
    return { posts: json.data?.posts?.nodes || [], error: null };
  } catch (error) {
    return { posts: [], error: "কানেকশন করা যাচ্ছে না। ModSecurity চেক করুন।" };
  }
}

export default async function Home() {
  const { posts, error } = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8 text-yellow-700">
          <p className="font-bold">সতর্কতা:</p>
          <p>{error}</p>
          <p className="text-sm mt-2">সমাধান: Hostinger hPanel > Security > ModSecurity থেকে এটি OFF করে দিন।</p>
        </div>
      )}

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-black">
          <div className="lg:col-span-8">
            <Link href={`/${posts[0].slug}`} className="group">
              <img src={posts[0].featuredImage?.node.sourceUrl} className="w-full h-[450px] object-cover rounded-xl shadow-lg" alt="" />
              <h1 className="text-4xl font-extrabold mt-6 group-hover:text-red-600 leading-tight">{posts[0].title}</h1>
            </Link>
          </div>
          <div className="lg:col-span-4 space-y-5">
             <h3 className="font-bold text-xl border-b-2 border-red-600 inline-block mb-2">সর্বশেষ সংবাদ</h3>
             {posts.slice(1, 7).map(post => (
               <Link key={post.slug} href={`/${post.slug}`} className="flex gap-4 group border-b pb-4">
                 <img src={post.featuredImage?.node.sourceUrl} className="w-24 h-16 object-cover rounded-lg" alt="" />
                 <h4 className="font-bold text-sm group-hover:text-red-600 transition leading-tight">{post.title}</h4>
               </Link>
             ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed">
          <h2 className="text-2xl font-bold text-gray-400 italic">আপনার ওয়ার্ডপ্রেস থেকে খবরের জন্য অপেক্ষা করা হচ্ছে...</h2>
        </div>
      )}
    </main>
  );
}
