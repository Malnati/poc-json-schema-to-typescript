// src/App.tsx

import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { PostList } from './PostList';
import { PostCreate } from './PostCreate';
import { PostEdit } from './PostEdit';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

export const App = () => (
    <Admin dataProvider={dataProvider}>
        
        <Resource
            name="posts"
            list={PostList}
            create={PostCreate}
            edit={PostEdit}
        />
        
    </Admin>
);
