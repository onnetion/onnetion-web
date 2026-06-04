async function getPost(slug) {
  const res = await fetch('https://onnetion.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 },
    body: JSON.stringify({
      query: `query($id: ID!) { post(id: $id, idType: SLUG) { title content date featuredImage { node { sourceUrl } } } }`,
      variables: { id: slug },
    }),
  });
  const json = await res.json();
  return json.data.post;
}

export default async function Page({ params }) {
  const post = await getPost(params.slug);
  if (!post) return <div className="p-20 text-center text-2xl font-bold">খবরটি পাওয়া যায়নি।</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white mt-10 shadow-sm rounded-2xl border">
      <div className="mb-10 text-center">
         <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-gray-900 tracking-tight">{post.title}</h1>
         <p className="text-gray-400 font-bold">অন্বেষণ ডেস্ক | প্রকাশিত: {new Date(post.date).toLocaleDateString('bn-BD')}</p>
      </div>
      
      {post.featuredImage && (
        <div className="mb-12">
          <img src={post.featuredImage.node.sourceUrl} className="w-full h-auto rounded-2xl shadow-lg" alt={post.title} />
        </div>
      )}

      <div 
        className="news-content prose prose-xl max-w-none text-gray-800 leading-relaxed font-serif"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}
