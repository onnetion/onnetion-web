async function getPostDetail(slug) {
  try {
    const res = await fetch("https://onnetion.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query GetPost($id: ID!) {
          post(id: $id, idType: SLUG) {
            title
            content
            date
            featuredImage { node { sourceUrl } }
          }
        }`,
        variables: { id: slug },
      }),
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.data?.post;
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }) {
  const post = await getPostDetail(params.slug);

  if (!post) {
    return <div className="p-20 text-center font-bold">খবরটি পাওয়া যায়নি।</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">{post.title}</h1>
      <div className="text-gray-400 mb-8 border-b pb-4 italic">
        প্রকাশিত: {new Date(post.date).toLocaleDateString('bn-BD')}
      </div>
      {post.featuredImage?.node?.sourceUrl && (
        <img src={post.featuredImage.node.sourceUrl} className="w-full h-auto rounded-xl mb-10 shadow-lg" alt="" />
      )}
      <div 
        className="prose prose-xl max-w-none text-gray-800 leading-relaxed font-serif"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}
