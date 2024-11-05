// src/PostCreate.tsx

import React from 'react';
import { 
    Create, 
    SimpleForm, 
    NumberInput, TextInput, BooleanInput, ReferenceInput
} from 'react-admin';

const PostCreate: React.FC = () => (
    <Create>
        <SimpleForm>
            
            <ReferenceInput source="id" reference="apps" />
            
            <TextInput source="title" />
            
            <TextInput source="body" />
            
            <BooleanInput source="published" />
            
        </SimpleForm>
    </Create>
);

export default PostCreate;