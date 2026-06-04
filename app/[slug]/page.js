import { fetchAPI } from "../../lib/wordpress";

export async function generateMetadata({ params }) {
  const data = await fetchAPI(`query($id: ID!) { post(id: $id, idType: SLUG) { title excerpt } }`, { id: params.slug });
  return { title: data?.post?.title, description: data?.post?.excerpt };
}

export default async function PostPage({ params }) {
  const data = await fetchAPI(`query($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      content
      date
      featuredImage { node { sourceUrl } }
      author { node { name } }
    }
  }`, { id: params.slug });

  const post = data?.post;
  if (!post) return <div className="p-20 text-center">৪0৪: খবর পাওয়া যায়নি।</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{post.title}</h1>
        <div className="flex justify-center items-center gap-4 text-gray-500 font-bold border-y py-4 italic">
          <span>লেখক: {post.author.node.name}</span>
          <span>•</span>
          <span>প্রকাশিত: {new Date(post.date).toLocaleDateString('bn-BD')}</span>
        </div>
      </div>
      <img src={post.featuredImage?.node?.sourceUrl} className="w-full h-auto rounded-3xl shadow-2xl mb-12" />
      <div className="prose prose-2xl max-w-none text-gray-800 leading-relaxed font-serif prose-img:rounded-3xl" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
