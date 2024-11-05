// src/PostEdit.tsx

import React from 'react';
import { Edit, SimpleForm, NumberInput, TextInput, BooleanInput } from 'react-admin';

const PostEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            
                <NumberInput source="id" />
            
                <TextInput source="title" />
            
                <TextInput source="body" />
            
                <BooleanInput source="published" />
            
        </SimpleForm>
    </Edit>
);

export default PostEdit;