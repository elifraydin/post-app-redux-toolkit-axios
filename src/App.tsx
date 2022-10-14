import {PostList} from "./components/PostList"
import {AddPostForm} from "./components/AddPostForm";
import SinglePostPage from "./components/SinglePostPage"
import EditPostForm from "./components/EditPostForm";
import Layout from "./router/Layout"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

         <Route index element={<PostList />} /> 

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
           <Route path="edit/:postId" element={<EditPostForm />} /> 
        </Route>

      </Route>
    </Routes>
  );
}

export default App;