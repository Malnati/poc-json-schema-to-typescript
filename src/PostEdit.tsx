// src/PostEdit.tsx

import React from 'react';
import { Edit, SimpleForm, NumberField, TextField, BooleanField } from 'react-admin';

const PostEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            
                <NumberField source="id" />
            
                <TextField source="title" />
            
                <TextField source="body" />
            
                <BooleanField source="published" />
            
        </SimpleForm>
    </Edit>
);

export default PostEdit;