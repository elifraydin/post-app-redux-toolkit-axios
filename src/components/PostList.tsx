import { useEffect } from "react";
import { useAppDispatch, useAppSelector} from "../store/store";
import { PostsExerpt } from "./PostsExerpt";

import { getAllPosts, getPostStatus, getPostError, fetchPosts } from "../features/posts/postsSlice";

export function PostList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(getAllPosts);
  const postsStatus = useAppSelector(getPostStatus);
  const error = useAppSelector(getPostError);

  useEffect(() => {
    if(postsStatus == "idle") {
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch])

  let content;
  if(postsStatus == "loading") {
    content = <p>Loading...</p>
  } else if (postsStatus == "succeeded") {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
      <PostsExerpt key={post.id} post={post} />
    ));
    content = renderedPosts;
  } else if (postsStatus == "failed") {
    content = <p>{error}</p>
  }
 
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}
