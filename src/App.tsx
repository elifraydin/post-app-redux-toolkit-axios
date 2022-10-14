import {PostList} from "./components/PostList"
import {AddPostForm} from "./components/AddPostForm";
import SinglePostPage from "./components/SinglePostPage"
//import EditPostForm from "./features/posts/EditPostForm";
import Layout from "./router/Layout"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* <Route index element={<PostsList />} /> */}

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          {/* <Route path="edit/:postId" element={<EditPostForm />} /> */}
        </Route>

      </Route>
    </Routes>
  );
}

export default App;