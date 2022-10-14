import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import {store} from "../src/store/store";
import {fetchUsers} from "./features/users/usersSlice";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//uygulama ilk yüklendiğinde kullanıcıları almak istiyorum, store sayesinde erişim var
store.dispatch(fetchUsers());


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
     <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
)
