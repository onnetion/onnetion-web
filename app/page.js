import Link from "next/link";

async function getNewsData() {
  const res = await fetch("https://onnetion.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query {
        posts(first: 20) {
          nodes {
            title
            slug
            excerpt
            featuredImage { node { sourceUrl } }
            categories { nodes { name slug } }
          }
        }
      }`,
    }),
    cache: "no-store",
  });
  const json = await res.json();
  return json.data?.posts?.nodes || [];
}

export default async function Home() {
  const posts = await getNewsData();
  const leadPost = posts[0];
  const sidePosts = posts.slice(1, 5);
  const bottomPosts = posts.slice(5, 13);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* ১. লিড নিউজ সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        <div className="lg:col-span-8 border-r-0 lg:border-r pr-0 lg:pr-8">
          {leadPost && (
            <Link href={`/${leadPost.slug}`} className="group block">
              <div className="aspect-video overflow-hidden rounded-xl bg-gray-200">
                <img src={leadPost.featuredImage?.node.sourceUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black mt-6 group-hover:text-red-600 leading-tight">
                {leadPost.title}
              </h1>
              <div className="text-gray-600 mt-4 text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: leadPost.excerpt }} />
            </Link>
          )}
        </div>

        {/* ২. সাইডবার নিউজ */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-bold bg-black text-white px-3 py-1 inline-block mb-2">সর্বশেষ সংবাদ</h3>
          {sidePosts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="flex gap-4 group border-b pb-4 last:border-0">
              <img src={post.featuredImage?.node.sourceUrl} className="w-28 h-20 object-cover rounded-lg flex-shrink-0" alt="" />
              <h4 className="font-bold text-gray-800 group-hover:text-red-600 transition leading-snug">
                {post.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* ৩. গ্রিড সেকশন (আরও সংবাদ) */}
      <div className="border-t pt-10">
        <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-3 mb-8">অন্যান্য খবর</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {bottomPosts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="group bg-white p-3 rounded-xl hover:shadow-xl transition border border-gray-100">
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <img src={post.featuredImage?.node.sourceUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="" />
              </div>
              <h4 className="font-bold text-lg text-gray-900 group-hover:text-red-600 line-clamp-2 leading-tight">
                {post.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
