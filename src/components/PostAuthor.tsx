import { useAppSelector } from "../store/store"
import { getAllUsers } from "../features/users/usersSlice"

interface PostAuthorProps {
  userId: string;
}

export function PostAuthor({userId}: PostAuthorProps) {
  const users = useAppSelector(getAllUsers);

  const author = users.find(user => user.id === userId);

  return (
    <span>by {author? author.name : "Unknown author"}</span>
  )
}
