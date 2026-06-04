import { client } from "../lib/apollo-client";
import { gql } from "@apollo/client";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getPosts() {
  const query = gql`
    query GetPosts {
      posts(first: 15) {
        nodes {
          title
          slug
          excerpt
          featuredImage {
            node { sourceUrl }
          }
        }
      }
    }
  `;
  try {
    const { data } = await client.query({ query });
    return data?.posts?.nodes || [];
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8 text-black">
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Link href={`/${posts[0].slug}`} className="group block">
              <img src={posts[0].featuredImage?.node.sourceUrl} className="w-full h-[450px] object-cover rounded-xl shadow-lg" alt="" />
              <h1 className="text-4xl font-extrabold mt-6 group-hover:text-red-600 transition leading-tight">{posts[0].title}</h1>
              <div className="text-gray-600 mt-4 text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: posts[0].excerpt }} />
            </Link>
          </div>
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-bold text-xl border-b-2 border-red-600 inline-block mb-2">সর্বশেষ সংবাদ</h3>
            {posts.slice(1, 7).map((post) => (
              <Link key={post.slug} href={`/${post.slug}`} className="flex gap-4 group border-b pb-4 last:border-0">
                <img src={post.featuredImage?.node.sourceUrl} className="w-28 h-20 object-cover rounded-lg shadow-sm" alt="" />
                <h4 className="font-bold text-md group-hover:text-red-600 transition leading-tight">{post.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-32 border-2 border-dashed rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-400">খবর লোড হচ্ছে...</h2>
          <p className="text-gray-400 mt-2 italic text-sm">যদি অনেকক্ষণ লোড হয়, তবে আপনার ওয়ার্ডপ্রেসের WPGraphQL প্লাগইন চেক করুন।</p>
        </div>
      )}
    </main>
  );
}
