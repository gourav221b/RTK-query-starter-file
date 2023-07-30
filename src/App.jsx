import { useEffect, useState } from "react";
import "./App.css";
import {
  useLazyGetAllPostsQuery,
  useLazyGetPostsByIdQuery,
} from "./features/services/article";

const BlogCard = ({ post }) => {
  return (
    <div className="p-4 md:w-2/5 relative group">
      <div className="readMore w-full h-full bg-red-500/30 absolute opacity-0 group-hover:opacity-100">
        Read More
      </div>
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src="https://dummyimage.com/721x401"
          alt="blog"
        />

        <div className="p-6">
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {post?.title}
          </h1>
          <p className="leading-relaxed mb-3">{post?.body}</p>
          <div className="flex items-center flex-wrap">
            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              Learn More
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              1.2K
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              <svg
                className="w-4 h-4 mr-1"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
              6
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currIndex, setCurrIndex] = useState(1);
  const [fetchAllPosts, allposts] = useLazyGetAllPostsQuery();
  const [fetchPostsById, singlepost] = useLazyGetPostsByIdQuery();

  useEffect(() => {
    fetchAllPosts()
      .then((data) => console.log("All post", data))
      .catch((err) => console.error(err));
    setTimeout(() => {
      setCurrIndex(currIndex + 1);
    }, 2000);
  }, []);
  useEffect(() => {
    fetchPostsById(currIndex)
      .then((data) => console.log("single post", data))
      .catch((err) => console.error(err));
  }, [currIndex]);
  return (
    <>
      <div>FetchingAll: {JSON.stringify(allposts?.isFetching)}</div>
      <div>LoadingAll: {JSON.stringify(allposts?.isLoading)}</div>
      <div>FetchingOne: {JSON.stringify(singlepost?.isFetching)}</div>
      <div>LoadingOne: {JSON.stringify(singlepost?.isLoading)}</div>
      <h2>Single Post</h2>
      <section className="flex flex-wrap items-center justify-evenly">
        {allposts?.data?.map((post) => (
          <BlogCard post={post} key={post?.data?.id} />
        ))}
      </section>

      {import.meta.env?.VITE_APP_BASE_URL}
    </>
  );
}

export default App;
