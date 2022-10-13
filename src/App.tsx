import "./App.css";
import { AddPostForm } from "./components/AddPostForm";
import { PostList } from "./components/PostList";

function App() {

  return (
    <main className="App">
      <h1>Blog posts:</h1>
      <AddPostForm />
      <PostList />
    </main>
  )
}

export default App
