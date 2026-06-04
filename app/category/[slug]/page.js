async function getCategoryPosts(slug) {
  const res = await fetch("https://onnetion.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query($id: ID!) {
        category(id: $id, idType: SLUG) {
          name
          posts {
            nodes {
              title
              slug
              featuredImage { node { sourceUrl } }
            }
          }
        }
      }`,
      variables: { id: slug },
    }),
    cache: "no-store",
  });
  const json = await res.json();
  return json.data?.category;
}

export default async function CategoryPage({ params }) {
  const category = await getCategoryPosts(params.slug);
  if (!category) return <div className="p-20 text-center">ক্যাটাগরি পাওয়া যায়নি।</div>;

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-red-600 mb-10 border-b pb-4 italic">বিভাগ: {category.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {category.posts.nodes.map((post) => (
          <a key={post.slug} href={`/${post.slug}`} className="group block bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <img src={post.featuredImage?.node.sourceUrl} className="w-full h-48 object-cover rounded-xl mb-4" alt="" />
            <h2 className="text-xl font-bold group-hover:text-red-600 leading-tight">{post.title}</h2>
          </a>
        ))}
      </div>
    </main>
  );
}
