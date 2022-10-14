type dateISO = ReturnType<typeof Date.toString>;

export interface UsersObject {
  name: string;
  id: string;
}

export interface PostsProps {
    id: string;
    title: string;
    body: string;
    userId: string;
    date: dateISO;
    reactions: {
      thumbsUp: number;
      wow: number;
      heart: number;
      rocket: number;
      coffee: number;
    };
  }
  
  export interface Posts {
    posts: PostsProps[];
    status: string;
    error: string | null | undefined;
  }