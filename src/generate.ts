import fs from 'fs';
import ejs from 'ejs';
import Ajv from 'ajv';

const ajv = new Ajv();

const componentMapping: Record<string, string> = {
    string: 'TextField',
    number: 'NumberField',
    integer: 'NumberField',
    boolean: 'BooleanField',
};

const inputMapping: Record<string, string> = {
    string: 'TextInput',
    number: 'NumberInput',
    integer: 'NumberInput',
    boolean: 'BooleanInput',
};

interface Field {
    name: string;
    component: string;
}

async function generateComponentsFromSchema(schema: any, name: string) {
    console.log("Generating components from schema with name:", name);
    console.log("Received schema:", JSON.stringify(schema, null, 2));
    
    let fields: Field[] = [];
    const showfields: Field[] = Object.keys(schema.properties).map((key) => {
        const fieldType = schema.properties[key].type;
        return {
            name: key,
            component: componentMapping[fieldType] || 'TextField',
        };
    });
    
    const inputFields: Field[] = Object.keys(schema.properties).map((key) => {
        const fieldType = schema.properties[key].type;
        return {
            name: key,
            component: inputMapping[fieldType] || 'TextInput',
        };
    });

    fields = showfields;
    console.log("Show fields generated for schema:", JSON.stringify(fields, null, 2)); 
    
    await generateFileFromTemplate('src/templates/list.ejs', `src/${name}List.tsx`, { fields, name });
    
    
    fields = inputFields;
    console.log("Input fields generated for schema:", JSON.stringify(fields, null, 2)); 

    await generateFileFromTemplate('src/templates/create.ejs', `src/${name}Create.tsx`, { fields, name });
    await generateFileFromTemplate('src/templates/edit.ejs', `src/${name}Edit.tsx`, { fields, name });
}

async function generateAppFile(resources: string[]) {
    console.log("Generating App.tsx with resources:", resources); 
    await generateFileFromTemplate('src/templates/app.ejs', 'src/App.tsx', { resources });
}

async function generateFileFromTemplate(templatePath: string, outputPath: string, data: any) {
    console.log("Generating file from template:", templatePath, "with data:", JSON.stringify(data, null, 2));
    const template = fs.readFileSync(templatePath, 'utf-8');
    console.log("Template content:", template);
    const content = ejs.render(template, data);
    console.log("Rendered content:", content);
    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`Generated ${outputPath}`);
}

// Exemplo de uso
(async () => {
    console.log("Generating components from schema..."); 
    const schema = {
        properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            body: { type: 'string' },
            published: { type: 'boolean' },
        },
    };

    console.log("Schema being used:", JSON.stringify(schema, null, 2)); 
    
    const resourceName = 'Post';

    console.log("Resource name:", resourceName);

    await generateComponentsFromSchema(schema, resourceName);
    await generateAppFile([resourceName]);
})();