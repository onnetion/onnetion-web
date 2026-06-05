import { fetchAPI } from "../../lib/wordpress";
import Link from "next/link";

// মেটাডাটা জেনারেটর (SEO-র জন্য)
export async function generateMetadata({ params }) {
  const data = await fetchAPI(`query($id: ID!) { post(id: $id, idType: SLUG) { title excerpt } }`, { id: params.slug });
  return { title: data?.post?.title, description: data?.post?.excerpt?.replace(/<[^>]*>?/gm, '') };
}

export default async function PostPage({ params }) {
  const data = await fetchAPI(`query($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      content
      date
      featuredImage { node { sourceUrl } }
      author { node { name } }
      categories { nodes { name slug } }
      tags { nodes { name slug } }
    }
    posts(first: 6) { nodes { title slug featuredImage { node { sourceUrl } } } }
  }`, { id: params.slug });

  const post = data?.post;
  const sidebarPosts = data?.posts?.nodes || [];

  if (!post) return <div className="p-20 text-center font-bold">৪০৪: এই সংবাদটি খুঁজে পাওয়া যায়নি।</div>;

  return (
    <main className="container mx-auto px-4 py-8 bg-white">
      {/* ১. ব্রেডক্রাম্ব (Breadcrumb) */}
      <nav className="text-sm mb-6 flex gap-2 text-blue-700 font-bold">
        <Link href="/">হোম</Link> <span>/</span> 
        <Link href={`/category/${post.categories.nodes[0]?.slug}`}>{post.categories.nodes[0]?.name}</Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* কলাম ১: মূল সংবাদ (Main Content) */}
        <div className="lg:col-span-8 border-r border-gray-100 pr-0 lg:pr-10">
          <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-gray-900 tracking-tighter">
            {post.title}
          </h1>

          {/* লেখক এবং তারিখ সেকশন */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-y border-gray-100 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">অ</div>
              <div>
                <p className="font-bold text-gray-800 leading-none">{post.author.node.name}</p>
                <p className="text-[11px] text-gray-400 mt-1 uppercase font-bold tracking-widest">শেরপুর প্রতিনিধি</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm font-bold">প্রকাশিত: {new Date(post.date).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p className="text-gray-400 text-xs mt-1">আপডেট: ৩ মিনিট আগে</p>
            </div>
          </div>

          {/* সোশ্যাল শেয়ার বাটন (প্রথম আলোর মতো) */}
          <div className="flex gap-3 mb-8">
            <button className="p-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs">f</button>
            <button className="p-2 bg-sky-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs">𝕏</button>
            <button className="p-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs">📞</button>
            <button className="p-2 bg-gray-200 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center text-xs">🔗</button>
          </div>

          {/* প্রধান ছবি (Featured Image) */}
          {post.featuredImage?.node?.sourceUrl && (
            <figure className="mb-10">
              <img src={post.featuredImage.node.sourceUrl} className="w-full h-auto rounded-sm shadow-sm border border-gray-100" alt={post.title} />
              <figcaption className="text-sm text-gray-500 mt-3 italic border-l-4 border-red-600 pl-3">
                {post.title} — অন্বেষণ
              </figcaption>
            </figure>
          )}

          {/* সংবাদের মূল অংশ (Content) */}
          <div 
            className="prose prose-xl max-w-none text-gray-800 leading-[1.85] font-serif prose-p:mb-8 prose-strong:text-black prose-a:text-blue-700"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          {/* ট্যাগ সেকশন */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              <span className="font-bold mr-2 text-gray-400 uppercase tracking-tighter self-center">ট্যাগ:</span>
              {post.tags.nodes.map(tag => (
                <Link key={tag.slug} href={`/tag/${tag.slug}`} className="bg-gray-100 px-4 py-1 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-200 transition">
                  {tag.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* কলাম ২: সাইডবার (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-10">
            
            {/* পঠিত বা সর্বশেষ সংবাদ */}
            <div>
              <h3 className="text-xl font-bold border-b-2 border-black inline-block pb-1 mb-6 uppercase">এই বিভাগের আরও খবর</h3>
              <div className="space-y-6">
                {sidebarPosts.map(p => (
                  <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group border-b border-gray-50 pb-4 last:border-0">
                    <img src={p.featuredImage?.node?.sourceUrl} className="w-24 h-20 object-cover rounded-sm flex-shrink-0" alt="" />
                    <h4 className="font-bold text-sm leading-tight group-hover:text-blue-700 transition">{p.title}</h4>
                  </Link>
                ))}
              </div>
            </div>

            {/* বিজ্ঞাপন (Placeholder) */}
            <div className="bg-gray-50 h-[400px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Advertisement</span>
              <div className="text-gray-200 font-bold text-lg leading-tight italic">
                বিজ্ঞাপন দেওয়ার জন্য যোগাযোগ করুন<br/>info@onnetion.com
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
