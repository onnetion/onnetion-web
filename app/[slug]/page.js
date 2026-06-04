import { fetchAPI } from "../../lib/wordpress";

export default async function PostPage({ params }) {
  const data = await fetchAPI(`query($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      content
      date
      featuredImage { node { sourceUrl } }
    }
  }`, { id: params.slug });

  const post = data?.post;

  if (!post) {
    return <div className="p-20 text-center font-bold text-red-600">৪০৪: এই সংবাদটি খুঁজে পাওয়া যায়নি।</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-16 bg-white min-h-screen">
      <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-gray-900 tracking-tighter">{post.title}</h1>
      <div className="flex gap-4 text-gray-400 font-bold mb-10 border-y py-4 italic text-sm">
        <span>অন্বেষণ ডেস্ক</span>
        <span>•</span>
        <span>{new Date(post.date).toLocaleDateString('bn-BD')}</span>
      </div>
      {post.featuredImage?.node?.sourceUrl && (
        <img src={post.featuredImage.node.sourceUrl} className="w-full h-auto rounded-sm shadow-2xl mb-12 border" alt="" />
      )}
      <div 
        className="prose prose-2xl max-w-none text-gray-800 leading-[1.8] font-serif prose-img:rounded-lg prose-p:mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}
