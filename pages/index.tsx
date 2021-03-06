import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import assets from '../assets/assets'

interface Props {
  posts: Post[]
}


function Home({ posts }: Props) {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
          <h1 className='text-6xl max-w-xl font-serif'><span className='underline decoration-black decoration-4'>Medium</span> is a place to write, read, and connect</h1>
          <h2>
            It's easy and free to post your thinking on any topic and connext with millions of readers
          </h2>
        </div>

        <img className='hidden md:inline-flex h-32 lg:h-full' src={assets.banner.src} alt="Medium-logo" />
      </div>

      {/* Posts */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map((post, index) => (
          <Link key={index} href={`/posts/${post.slug.current}`}>
            <div className='border rounded-lg group cursor-pointer overflow-hidden'>
              <img className='w-full object-cover h-60 group-hover:scale-105 transition transform duration-200 ease-in-out' src={urlFor(post.mainImage).url()} alt="post-image" />

              <div className='flex justify-between p-5 bg-white'>
                <div>
                  <p className='text-lg font-bold'>{post.title}</p>
                  <p className='text-xs'>{post.description} </p> 
                  <p className='text-xs mt-4'>by <span className='font-semibold'>{post.author.name}</span></p>
                </div>

                <img className='h-12 w-12 rounded-full object-cover mt-auto' src={urlFor(post.author.image).url()} alt="author-image" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == 'post'] {
    _id,
    title,
  author -> {
    name,
    image
  },
  description,
  mainImage,
  slug
  } `

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    }
  }
}