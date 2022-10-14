import { useSelector } from 'react-redux'
import { selectPostById } from '../features/posts/postsSlice'

import {PostAuthor} from "./PostAuthor";
//import {PostDate} from "./PostDate";
import {ReactionButton} from "./ReactionButton";
import { RootState } from "../store/store";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    const { postId } = useParams()


    const post = useSelector((state:RootState) => selectPostById(state, postId))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                {/* <PostDate timestamp={post.date} /> */}
            </p>
            <ReactionButton post={post} />
        </article>
    )
}

export default SinglePostPage