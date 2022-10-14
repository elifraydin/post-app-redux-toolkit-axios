import { PostAuthor } from "./PostAuthor";
import { PostDate } from "./PostDate";
import { PostsProps } from "../types/interfaces";
import { ReactionButton } from "./ReactionButton";
import { HTMLAttributes} from "react";
import {Link} from "react-router-dom"

interface PostsExerptProps extends HTMLAttributes<HTMLElement> {
  post: PostsProps
}

export function PostCard({post, ...rest}: PostsExerptProps) {
  return (
    <article {...rest}>
      <h3>{post.title}</h3>
      <p className="excerpt">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
      <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <PostDate timestamp={new Date(post.date)} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
}
