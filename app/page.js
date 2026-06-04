import Link from "next/link";

async function getPosts() {
  const res = await fetch('https://onnetion.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
    body: JSON.stringify({
      query: `{ posts(first: 20) { nodes { title slug excerpt date featuredImage { node { sourceUrl } } } } }`,
    }),
  });
  const json = await res.json();
  return json.data.posts.nodes;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* টপ সেকশন: প্রধান খবর ও সাইডবার */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-b pb-12 mb-12">
        {/* প্রধান বড় নিউজ */}
        <div className="lg:col-span-8">
          <Link href={`/${posts[0].slug}`} className="group">
            <div className="overflow-hidden rounded-xl mb-6">
              <img src={posts[0].featuredImage?.node.sourceUrl} className="w-full h-[450px] object-cover group-hover:scale-105 transition duration-700" alt="" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold group-hover:text-red-600 transition leading-tight">{posts[0].title}</h1>
            <div className="text-gray-600 mt-4 text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: posts[0].excerpt }} />
          </Link>
        </div>

        {/* পাশের তালিকা সংবাদ */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-bold bg-gray-900 text-white px-4 py-2 rounded">সর্বশেষ</h3>
          {posts.slice(1, 6).map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="flex gap-4 group border-b pb-4 last:border-0">
              <img src={post.featuredImage?.node.sourceUrl} className="w-28 h-20 object-cover rounded-lg shadow-sm" alt="" />
              <h4 className="font-bold group-hover:text-red-600 transition leading-snug">{post.title}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* নিচের গ্রিড সেকশন: আরও খবর */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.slice(6, 14).map((post) => (
          <Link key={post.slug} href={`/${post.slug}`} className="group border rounded-xl p-3 hover:shadow-xl transition bg-white">
            <div className="overflow-hidden rounded-lg mb-3">
              <img src={post.featuredImage?.node.sourceUrl} className="w-full h-40 object-cover group-hover:scale-110 transition duration-500" alt="" />
            </div>
            <h4 className="font-bold text-lg group-hover:text-red-600 line-clamp-2 leading-tight">{post.title}</h4>
          </Link>
        ))}
      </div>
    </main>
  );
}
