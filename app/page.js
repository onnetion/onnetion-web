import { client } from "../lib/apollo-client";
import { gql } from "@apollo/client";

async function getPosts() {
  const query = gql`
    query GetPosts {
      posts(first: 10) {
        nodes {
          title
          slug
          featuredImage {
            node { sourceUrl }
          }
        }
      }
    }
  `;
  try {
    const { data } = await client.query({ query });
    return data.posts.nodes;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          {posts.length > 0 ? (
            <div className="group cursor-pointer">
              {posts[0].featuredImage && (
                <img src={posts[0].featuredImage.node.sourceUrl} className="w-full h-[450px] object-cover rounded-lg shadow-md" alt="" />
              )}
              <h2 className="text-4xl font-bold mt-4 group-hover:text-red-600 transition">{posts[0].title}</h2>
            </div>
          ) : <p className="text-center py-20 text-xl">খবর লোড হচ্ছে অথবা কোনো খবর পাওয়া যায়নি।</p>}
        </div>

        <div className="md:col-span-4">
          <h3 className="text-xl font-bold border-l-4 border-red-600 pl-2 mb-4">সর্বশেষ সংবাদ</h3>
          <div className="space-y-6">
            {posts.slice(1, 7).map((post) => (
              <div key={post.slug} className="flex gap-4 group cursor-pointer border-b pb-4">
                {post.featuredImage && (
                  <img src={post.featuredImage.node.sourceUrl} className="w-24 h-16 object-cover rounded" alt="" />
                )}
                <h4 className="font-bold group-hover:text-red-600 transition leading-tight">{post.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
