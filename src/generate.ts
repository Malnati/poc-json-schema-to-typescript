// generate.js
const fs = require('fs');
const ejs = require('ejs');
const { compile } = require('json-schema-to-typescript');
const Ajv = require('ajv');

const ajv = new Ajv();

const componentMapping = {
    string: 'TextField',
    number: 'NumberField',
    integer: 'NumberField',
    boolean: 'BooleanField',
};

async function generateComponentsFromSchema(schema, name) {
    // Map fields from schema
    const fields = Object.keys(schema.properties).map((key) => {
        const fieldType = schema.properties[key].type;
        return {
            name: key,
            component: componentMapping[fieldType] || 'TextField',
        };
    });

    // Generate components based on templates
    await generateFileFromTemplate('templates/list.ejs', `${name}List.js`, { fields, name });
    await generateFileFromTemplate('templates/create.ejs', `${name}Create.js`, { fields, name });
    await generateFileFromTemplate('templates/edit.ejs', `${name}Edit.js`, { fields, name });
}

async function generateFileFromTemplate(templatePath, outputPath, data) {
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
    
    const name = 'Post';
    await generateComponentsFromSchema(schema, name);
})();