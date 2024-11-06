// src/PostCreate.tsx

import { 
    Create, 
    SimpleForm, 
    NumberInput, TextInput, BooleanInput, ReferenceInput
} from 'react-admin';

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            
            <ReferenceInput source="id" reference="apps" />
            
            <TextInput source="title" />
            
            <TextInput source="body" />
            
            <BooleanInput source="published" />
            
        </SimpleForm>
    </Create>
);
