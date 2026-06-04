import { client } from "../lib/apollo-client";
import { gql } from "@apollo/client";

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
    const { data } = await client.query({ 
      query, 
      variables: { id: slug } 
    });
    return data.post;
  } catch (error) {
    return null;
  }
}

export default async function PostPage({ params }) {
  const post = await getPostDetail(params.slug);

  if (!post) return <div className="text-center py-20">খবরটি পাওয়া যায়নি।</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-10 bg-white shadow-sm mt-6 rounded-lg">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">{post.title}</h1>
      <p className="text-gray-500 mb-6">প্রকাশিত: {new Date(post.date).toLocaleDateString('bn-BD')}</p>
      
      {post.featuredImage && (
        <img src={post.featuredImage.node.sourceUrl} className="w-full h-auto rounded-xl mb-8 shadow-md" alt={post.title} />
      )}
      
      <div 
        className="prose prose-lg max-w-none leading-relaxed text-gray-800 space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}
