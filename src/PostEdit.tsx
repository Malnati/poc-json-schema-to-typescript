// src/PostEdit.tsx

import { Edit, SimpleForm, NumberInput, TextInput, BooleanInput } from 'react-admin';

export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            
                <NumberInput source="id" />
            
                <TextInput source="title" />
            
                <TextInput source="body" />
            
                <BooleanInput source="published" />
            
        </SimpleForm>
    </Edit>
);
