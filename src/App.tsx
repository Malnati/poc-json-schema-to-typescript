// App.tsx

import {
  Admin,
  Resource,
} from "react-admin";
import { PostList, PostEdit, PostCreate, PostShow } from './posts';

import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                show={PostShow}
            />
        </Admin>
    );
}

export default App;