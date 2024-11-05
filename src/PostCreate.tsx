// src/PostCreate.tsx

import React from 'react';
import { Create, SimpleForm, NumberField, TextField, BooleanField } from 'react-admin';

const PostCreate: React.FC = () => (
    <Create>
        <SimpleForm>
            
                <NumberField source="id" />
            
                <TextField source="title" />
            
                <TextField source="body" />
            
                <BooleanField source="published" />
            
        </SimpleForm>
    </Create>
);

export default PostCreate;