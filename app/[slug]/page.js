async function getPostDetail(slug) {
  const res = await fetch('https://onnetion.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
    body: JSON.stringify({
      query: `
        query GetPost($id: ID!) {
          post(id: $id, idType: SLUG) {
            title
            content
            featuredImage {
              node { sourceUrl }
            }
          }
        }
      `,
      variables: { id: slug },
    }),
  });

  const { data } = await res.json();
  return data?.post;
}

export default async function PostPage({ params }) {
  const post = await getPostDetail(params.slug);

  if (!post) return <div className="text-center py-20 text-2xl">খবরটি পাওয়া যায়নি।</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
      {post.featuredImage && (
        <img src={post.featuredImage.node.sourceUrl} className="w-full h-auto rounded-xl mb-8 shadow-md" alt="" />
      )}
      <div 
        className="prose prose-lg max-w-none leading-relaxed text-gray-800 space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}
