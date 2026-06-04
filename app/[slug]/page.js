import { client } from "../../lib/apollo-client";
import { gql } from "@apollo/client";

export const dynamic = 'force-dynamic';

async function getPostDetail(slug) {
  const query = gql`
    query GetPost($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        date
        featuredImage {
          node { sourceUrl }
        }
      }
    }
  `;
  try {
    const { data } = await client.query({ query, variables: { id: slug } });
    return data?.post;
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }) {
  const post = await getPostDetail(params.slug);
  if (!post) return <div className="text-center py-20">খবর পাওয়া যায়নি।</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 bg-white mt-10 shadow-sm rounded-3xl border border-gray-100">
      <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-gray-900">{post.title}</h1>
      <p className="text-gray-400 font-bold mb-8 italic border-b pb-4 text-sm">অন্বেষণ ডেস্ক | প্রকাশিত: {new Date(post.date).toLocaleDateString('bn-BD')}</p>
      {post.featuredImage && (
        <img src={post.featuredImage.node.sourceUrl} className="w-full h-auto rounded-3xl shadow-xl mb-12" alt="" />
      )}
      <div className="prose prose-xl max-w-none text-gray-800 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
