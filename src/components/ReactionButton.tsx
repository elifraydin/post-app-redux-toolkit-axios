import { useAppDispatch } from "../store/store"
import { addReaction } from "../features/posts/postsSlice"
import {PostsProps} from "../types/interfaces"

export const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

interface ReactionButtonProps {
  post: PostsProps
}

export function ReactionButton({post}: ReactionButtonProps) {
  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="reactionButton"
      onClick={() =>
        dispatch(addReaction({postId: post.id, reaction: name}))
      }
    >
      {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
    </button>
  ))
  return (
    <div>{reactionButtons}</div>
  )
}
