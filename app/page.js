import { fetchAPI } from "../lib/wordpress";
import Link from "next/link";

export default async function Home() {
  const data = await fetchAPI(`{
    posts(first: 30) {
      nodes {
        title
        slug
        excerpt
        featuredImage { node { sourceUrl } }
        categories { nodes { name slug } }
      }
    }
  }`);
  
  const posts = data?.posts?.nodes || [];
  const lead = posts[0];
  const sidePosts = posts.slice(1, 6);
  const gridPosts = posts.slice(6, 14);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Lead Section: 8-4 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 border-b pb-12">
        <div className="lg:col-span-8">
          <Link href={`/${lead.slug}`} className="group block">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-6 shadow-2xl">
              <img src={lead.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-1000" />
            </div>
            <h1 className="text-5xl font-black leading-tight group-hover:text-red-600 mb-4">{lead.title}</h1>
            <div className="text-gray-600 text-xl leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: lead.excerpt }} />
          </Link>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-2xl font-black border-b-4 border-red-600 inline-block mb-4">সর্বশেষ</h3>
          {sidePosts.map(p => (
            <Link key={p.slug} href={`/${p.slug}`} className="flex gap-4 group border-b pb-4 last:border-0">
              <img src={p.featuredImage?.node?.sourceUrl} className="w-24 h-20 object-cover rounded-lg shadow-sm" />
              <h4 className="font-bold text-lg leading-tight group-hover:text-blue-600 transition">{p.title}</h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Grid Section: Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {gridPosts.map(p => (
          <Link key={p.slug} href={`/${p.slug}`} className="group bg-white p-4 rounded-3xl border border-gray-100 hover:shadow-2xl transition duration-500">
            <div className="aspect-square overflow-hidden rounded-2xl mb-4">
              <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
            </div>
            <h4 className="font-bold text-xl group-hover:text-red-600 line-clamp-2">{p.title}</h4>
          </Link>
        ))}
      </div>
    </main>
  );
}
