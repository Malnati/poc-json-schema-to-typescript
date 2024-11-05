// src/PostList.tsx

import { List, ListActions, Datagrid, TextInput, ReferenceInput, NumberField, TextField, BooleanField } from 'react-admin';

const filters = [
    <TextInput key="search" source="q" label="Search" alwaysOn />,
    <ReferenceInput key="id" source="id" label="Search" reference="posts" />,
];

export const PostList = () => (
    <List emptyWhileLoading filters={filters} actions={<ListActions hasCreate />}>
        <Datagrid rowClick="edit">
            
                <NumberField source="id" />
            
                <TextField source="title" />
            
                <TextField source="body" />
            
                <BooleanField source="published" />
            
        </Datagrid>
    </List>
);
