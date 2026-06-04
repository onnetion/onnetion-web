import { fetchAPI } from "../lib/wordpress";
import Link from "next/link";

export default async function Home() {
  const data = await fetchAPI(`{
    posts(first: 25) {
      nodes {
        title
        slug
        excerpt
        date
        featuredImage { node { sourceUrl } }
      }
    }
  }`);
  
  const posts = data?.posts?.nodes || [];
  if (posts.length === 0) return <div className="p-20 text-center">সার্ভার এরর...</div>;

  const lead = posts[0];
  const midGrid = posts.slice(1, 5);
  const sideList = posts.slice(5, 12);
  const bottomGrid = posts.slice(12, 20);

  return (
    <main className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* কলাম ১: বড় খবর ও সাব-নিউজ */}
        <div className="lg:col-span-6 border-r border-gray-100 pr-8">
          <Link href={`/${lead.slug}`} className="group block mb-10">
             <div className="overflow-hidden rounded-sm mb-6">
               <img src={lead.featuredImage?.node?.sourceUrl} className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" alt="" />
             </div>
             <h1 className="text-[44px] font-extrabold leading-[1.1] group-hover:text-[#d92328] transition-colors mb-4">{lead.title}</h1>
             <div className="text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: lead.excerpt }} />
          </Link>
          
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
             {midGrid.slice(0, 2).map(post => (
               <Link key={post.slug} href={`/${post.slug}`} className="group block">
                  <img src={post.featuredImage?.node?.sourceUrl} className="w-full h-32 object-cover mb-3" />
                  <h3 className="font-bold text-xl group-hover:text-[#d92328] leading-tight">{post.title}</h3>
               </Link>
             ))}
          </div>
        </div>

        {/* কলাম ২: খবরের তালিকা ও ক্যাটাগরি ফোকাস */}
        <div className="lg:col-span-3 border-r border-gray-100 px-2">
           <h3 className="text-[#d92328] font-black border-b-2 border-[#d92328] inline-block mb-6 uppercase tracking-wider">বাংলাদেশ</h3>
           <div className="space-y-6">
              {sideList.map(post => (
                <Link key={post.slug} href={`/${post.slug}`} className="block border-b border-gray-50 pb-4 group last:border-0">
                  <h4 className="font-bold text-lg leading-snug group-hover:text-[#0056b3] transition-colors">{post.title}</h4>
                  <p className="text-xs text-gray-400 mt-2">৫ মিনিট আগে</p>
                </Link>
              ))}
           </div>
        </div>

        {/* কলাম ৩: ছবিসহ ছোট নিউজ ও সর্বাধিক পঠিত */}
        <div className="lg:col-span-3 space-y-8">
           <div className="bg-gray-50 p-5 rounded-sm">
              <h3 className="font-black text-xl mb-6 border-l-4 border-[#d92328] pl-3">সর্বাধিক পঠিত</h3>
              {posts.slice(15, 20).map((post, i) => (
                <Link key={post.slug} href={`/${post.slug}`} className="flex gap-4 items-start mb-6 last:mb-0 group">
                  <span className="text-3xl font-black text-gray-200 group-hover:text-[#d92328]">{i+1}</span>
                  <h4 className="font-bold text-sm leading-tight group-hover:text-blue-700">{post.title}</h4>
                </Link>
              ))}
           </div>
        </div>
      </div>

      {/* নিচের অংশ: ৪ কলাম প্রিমিয়াম কার্ডস */}
      <div className="mt-20 pt-12 border-t-4 border-black">
        <h2 className="text-3xl font-black mb-10 italic uppercase">খেলাধুলা</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
           {bottomGrid.map(post => (
             <Link key={post.slug} href={`/${post.slug}`} className="group block">
                <div className="relative aspect-video overflow-hidden mb-4 bg-gray-100">
                  <img src={post.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                </div>
                <h4 className="font-bold text-lg group-hover:text-[#d92328] leading-tight">{post.title}</h4>
             </Link>
           ))}
        </div>
      </div>
    </main>
  );
}
