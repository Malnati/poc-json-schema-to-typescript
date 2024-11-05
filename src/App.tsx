// src/App.tsx

import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import PostList from './PostList';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App: React.FC = () => (
    <Admin dataProvider={dataProvider}>
        
        <Resource
            name="posts"
            list={PostList}
            create={PostCreate}
            edit={PostEdit}
        />
        
    </Admin>
);

export default App;