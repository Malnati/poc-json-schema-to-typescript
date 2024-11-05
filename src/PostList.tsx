// src/PostList.tsx

import React from 'react';
import { List, Datagrid, NumberField, TextField, BooleanField } from 'react-admin';

const PostList: React.FC = () => (
    <List>
        <Datagrid rowClick="edit">
            
                <NumberField source="id" />
            
                <TextField source="title" />
            
                <TextField source="body" />
            
                <BooleanField source="published" />
            
        </Datagrid>
    </List>
);

export default PostList;