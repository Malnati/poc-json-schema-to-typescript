// generate.ts
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

interface Field {
    name: string;
    component: string;
}

async function generateComponentsFromSchema(schema: any, name: string) {
    const fields: Field[] = Object.keys(schema.properties).map((key) => {
        const fieldType = schema.properties[key].type;
        return {
            name: key,
            component: componentMapping[fieldType] || 'TextField',
        };
    });

    await generateFileFromTemplate('templates/list.ejs', `src/${name}List.tsx`, { fields, name });
    await generateFileFromTemplate('templates/create.ejs', `src/${name}Create.tsx`, { fields, name });
    await generateFileFromTemplate('templates/edit.ejs', `src/${name}Edit.tsx`, { fields, name });
}

async function generateAppFile(resources: string[]) {
    await generateFileFromTemplate('templates/app.ejs', 'src/App.tsx', { resources });
}

async function generateFileFromTemplate(templatePath: string, outputPath: string, data: any) {
    const template = fs.readFileSync(templatePath, 'utf-8');
    const content = ejs.render(template, data);
    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`Generated ${outputPath}`);
}

// Example usage
(async () => {
    const schema = {
        properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            body: { type: 'string' },
            published: { type: 'boolean' },
        },
    };
    
    const resourceName = 'Post';
    await generateComponentsFromSchema(schema, resourceName);
    await generateAppFile([resourceName]);
})();