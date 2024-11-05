// src/PostList.tsx

import React from 'react';
import { List, SimpleForm, NumberField, TextField, BooleanField } from 'react-admin';
interface Props {}

const PostList: React.FC<Props> = () => (
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