// src/PostCreate.tsx

import React from 'react';
import { Create, SimpleForm, NumberField, TextField, BooleanField } from 'react-admin';

interface Props {}

const PostCreate: React.FC<Props> = () => (
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