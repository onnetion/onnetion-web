import { fetchAPI } from "../../lib/wordpress";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const data = await fetchAPI(`query($search: String!) {
    posts(where: {search: $search}) {
      nodes { title slug featuredImage { node { sourceUrl } } }
    }
  }`, { search: query });

  const results = data?.posts?.nodes || [];

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-10 border-b pb-4">ফলাফল: "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {results.length > 0 ? results.map(p => (
          <Link key={p.slug} href={`/${p.slug}`} className="group border p-4 rounded-2xl bg-white shadow-sm">
            <img src={p.featuredImage?.node?.sourceUrl} className="w-full h-40 object-cover rounded-xl mb-4" />
            <h3 className="font-bold group-hover:text-red-600">{p.title}</h3>
          </Link>
        )) : <p>কোনো খবর পাওয়া যায়নি।</p>}
      </div>
    </main>
  );
}
