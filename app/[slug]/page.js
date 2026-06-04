async function getPost(slug) {
  try {
    const res = await fetch('https://onnetion.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
      body: JSON.stringify({
        query: `query($id: ID!) { post(id: $id, idType: SLUG) { title content featuredImage { node { sourceUrl } } } }`,
        variables: { id: slug },
      }),
    });
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const json = await res.json();
      return json.data?.post;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }) {
  const post = await getPost(params.slug);
  if (!post) return <div className="p-20 text-center">খবরটি পাওয়া যায়নি।</div>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      {post.featuredImage && <img src={post.featuredImage.node.sourceUrl} className="w-full rounded-xl mb-8" alt="" />}
      <div className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
