# Prova de Conceito: Tipagem Automática de Retornos de Endpoints em React com JSON Schema to TypeScript

Este repositório tem como objetivo testar uma solução para a geração automática de tipagens TypeScript com base nos retornos de APIs. A solução é útil para melhorar a segurança de tipos em aplicações React, especialmente em projetos que consomem dados dinâmicos de múltiplos endpoints.

## Objetivo

Automatizar o processo de definição de tipos de dados retornados de endpoints de API, convertendo respostas JSON em interfaces TypeScript. A prova de conceito utiliza as bibliotecas `axios`, `ajv`, e `json-schema-to-typescript` para identificar e gerar tipos com base na estrutura da resposta JSON de cada endpoint.

## Funcionalidades

- **Disparo de requisições** para endpoints de APIs usando `axios`
- **Conversão de resposta JSON** em um schema JSON com `ajv`
- **Geração automática de tipos TypeScript** com `json-schema-to-typescript`
- **Exemplo de uso em um componente React**, demonstrando como os tipos gerados podem ser utilizados diretamente para acessar dados de forma segura e intuitiva

## Instalação

Clone este repositório e instale as dependências usando `npm`:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
npm install
```

## Como Funciona

Este repositório contém uma função que dispara uma requisição HTTP para um endpoint fornecido, obtém a resposta JSON e, em seguida, utiliza essa resposta para gerar automaticamente um tipo TypeScript correspondente.

## Passo a Passo

  1.	Disparo de Requisição: A função fetchAndGenerateTypes usa axios para fazer uma requisição GET para o endpoint especificado.
  2.	Conversão para JSON Schema: A resposta JSON é convertida em um schema JSON utilizando ajv.
  3.	Geração de Tipos TypeScript: Com o json-schema-to-typescript, o schema JSON é convertido em um tipo TypeScript, que pode ser salvo e usado na aplicação.

### Exemplo de Código

#### Configuração Básica

O código abaixo demonstra a estrutura básica de uma função que dispara a requisição e gera os tipos TypeScript:

```typescript
import axios from 'axios';
import { compile } from 'json-schema-to-typescript';
import Ajv from 'ajv';

async function fetchAndGenerateTypes(url: string) {
    const response = await axios.get(url);
    const ajv = new Ajv({ strict: false });
    const schema = ajv.compileSchema(response.data);
    const typescriptDefinition = await compile(schema, 'Response');
    console.log(typescriptDefinition);
}
```

#### Estrutura JSON e Resultado Esperado

Aqui está um exemplo de JSON retornado de um endpoint:

```typescript
{
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
    "street": "Victor Plains",
    "suite": "Suite 879",
    "city": "Wisokyburgh",
    "zipcode": "90566-7771",
    "geo": {
      "lat": "-43.9509",
      "lng": "-34.4618"
    }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
    "name": "Deckow-Crist",
    "catchPhrase": "Proactive didactic contingency",
    "bs": "synergize scalable supply-chains"
  }
}
```

O json-schema-to-typescript irá gerar o seguinte tipo TypeScript:


```typescript
export interface UserResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
```

#### Exemplo de Uso no React

Uma vez que os tipos foram gerados, podemos utilizá-los diretamente em um componente React. Veja o exemplo abaixo:

Primeiro, instale o React Admin no seu projeto:

```bash
npm install react-admin
```

Instale o jsonServerProvider:

```bash
npm install ra-data-json-server
```

Agora, configure o dataProvider no seu arquivo principal, por exemplo, App.tsx:

```typescript
// App.tsx
import React from 'react';
import { Admin, Resource, List, Datagrid, TextField } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UserList} />
        </Admin>
    );
}

export default App;
```

Criar um Componente de Listagem para o React Admin

Vamos criar um componente de listagem para exibir os dados do usuário usando os componentes do React Admin. Este componente UserList será passado como a propriedade list do Resource para o recurso users, que representa a lista de usuários.
```typescript
// UserList.tsx
import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" label="Company" />
            <TextField source="address.street" label="Street" />
            <TextField source="address.city" label="City" />
            <TextField source="address.zipcode" label="Zipcode" />
        </Datagrid>
    </List>
);
```

Exibir o Recurso no React Admin

No App.tsx, adicione o componente UserList ao recurso users:

```typescript
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './UserList'; // Importe o componente de listagem

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UserList} />
        </Admin>
    );
}

export default App;
```

```bash
npm start
```


# CRUD
Para implementar o CRUD completo para o recurso posts usando o React Admin com os endpoints do https://jsonplaceholder.typicode.com, você pode configurar a aplicação para realizar operações de listar, criar, editar e deletar publicações. Vou orientar como fazer isso utilizando o jsonServerProvider, que se ajusta bem ao JSONPlaceholder por ser compatível com APIs RESTful.

## Passo 1: Configurar o dataProvider para a API

No arquivo App.tsx, configure o dataProvider para apontar para o host https://jsonplaceholder.typicode.com. Com o jsonServerProvider, o React Admin conseguirá automaticamente entender e mapear os endpoints necessários.

```typescript
// App.tsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostEdit, PostCreate, PostShow } from './posts';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                show={PostShow}
            />
        </Admin>
    );
}

export default App;
```

## Passo 2: Criar Componentes para o CRUD

Para gerenciar o recurso posts, precisamos criar componentes para as operações de listagem, edição, criação e exibição. Vamos configurar esses componentes usando os componentes padrão do React Admin.

### 1. Listar (PostList)

O PostList exibe uma lista de postagens em um Datagrid. Cada linha pode ser clicada para editar a postagem.

```typescript
// posts.tsx
import React from 'react';
import { List, Datagrid, TextField, EditButton, ShowButton } from 'react-admin';

export const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);
```

### 2. Editar (PostEdit)

O PostEdit fornece um formulário para editar as propriedades de uma postagem específica.

```typescript
import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="title" />
            <TextInput source="body" multiline />
        </SimpleForm>
    </Edit>
);
```

### 3. Criar (PostCreate)

O PostCreate permite criar uma nova postagem.

```typescript
import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const PostCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="body" multiline />
        </SimpleForm>
    </Create>
);
```

### 4. Exibir (PostShow)

O PostShow permite visualizar os detalhes de uma postagem específica em um formato de somente leitura.

```typescript
import React from 'react';
import { Show, SimpleShowLayout, TextField } from 'react-admin';

export const PostShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <TextField source="body" />
        </SimpleShowLayout>
    </Show>
);
```

## Passo 3: Adicionar os Componentes ao Resource

Agora que criamos todos os componentes para o CRUD, é importante adicioná-los ao Resource para o recurso posts no App.tsx.

```typescript
// App.tsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostEdit, PostCreate, PostShow } from './posts';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                show={PostShow}
            />
        </Admin>
    );
}

export default App;
```

## Passo 4: Executar a Aplicação

Com tudo configurado, inicie a aplicação com:

```bash
npm start
```

Agora, você terá o CRUD completo para o recurso posts:

  1.	Listar: Veja todas as postagens e clique em uma linha para editar ou exibir detalhes.
  2.	Criar: Adicione uma nova postagem usando o formulário PostCreate.
  3.	Editar: Atualize os detalhes de uma postagem existente.
  4.	Exibir: Visualize os detalhes de uma postagem em uma visualização de somente leitura.
  5.	Excluir: O React Admin adiciona automaticamente a opção de deletar postagens na interface de edição.

Observações

 •	PATCH e PUT: O React Admin suporta tanto PATCH quanto PUT. O jsonServerProvider usado aqui envia PATCH para atualizações parciais, mas PUT será usado automaticamente se todos os campos forem enviados no formulário de edição.
 •	Limitações do JSONPlaceholder: Embora o React Admin suporte CRUD completo, o JSONPlaceholder é uma API de exemplo e pode simular algumas operações sem persistir dados entre sessões.

Conclusão

Essa configuração permite criar rapidamente um painel administrativo completo para gerenciar postagens utilizando React Admin e JSONPlaceholder. Para produção, você precisaria de uma API real, mas essa estrutura serve como uma ótima base para protótipos e desenvolvimento de provas de conceito.

#### Executando a Prova de Conceito

Para executar o exemplo, siga os passos abaixo:

  1.	Execute a função fetchAndGenerateTypes em um ambiente Node.js ou diretamente no projeto React para verificar a saída gerada no console.
  2.	Verifique a geração de tipos no console e use-os em componentes React conforme mostrado no exemplo acima.

## Conclusão

Essa prova de conceito demonstra uma forma eficaz de automatizar a criação de tipos TypeScript para dados retornados por endpoints, possibilitando o uso de dados de APIs com maior segurança de tipos em aplicações React. Essa abordagem contribui para uma experiência de desenvolvimento mais segura, organizada e eficiente.

## Licença

Este projeto é licenciado sob a Licença MIT.

---

# Dynamic

Para criar uma tela dinâmica no React Admin que se adapta aos dados recebidos, podemos usar json-schema-to-typescript para gerar tipagens baseadas em schemas dinâmicos. Essa abordagem permitirá que o React Admin renderize formulários, data grids, e visualizações automaticamente com base nos campos que ele identifica na resposta dos endpoints.

Aqui está uma solução passo a passo para implementar essa ideia:

## Passo 1: Configurar o json-schema-to-typescript

Primeiro, instale o json-schema-to-typescript para gerar tipagens com base na resposta dos endpoints.

```bash
npm install json-schema-to-typescript
```

## Passo 2: Função para Converter JSON para Tipos Dinâmicos

Crie uma função que faz a requisição ao endpoint, converte a resposta JSON em um schema e, em seguida, gera dinamicamente uma interface TypeScript.

```typescript
// dynamicTypes.ts
import axios from 'axios';
import { compile } from 'json-schema-to-typescript';
import Ajv from 'ajv';

const ajv = new Ajv({ strict: false });

export async function fetchSchemaAndGenerateTypes(url: string) {
    try {
        const response = await axios.get(url);
        const schema = ajv.compileSchema(response.data);
        const typescriptDefinition = await compile(schema, 'DynamicType');
        return { schema, typescriptDefinition };
    } catch (error) {
        console.error("Erro ao gerar tipos dinamicamente:", error);
        throw error;
    }
}
```

Essa função gera um schema e uma definição TypeScript (typescriptDefinition) com base na resposta de um endpoint.

## Passo 3: Funções para Renderizar Campos Dinâmicos

Com o React Admin, você pode renderizar dinamicamente campos em List, Create, e Edit a partir do schema gerado.

1. Função para Mapear Campos para Componentes do React Admin

Crie uma função mapFields que transforma campos do schema em componentes do React Admin, como TextField, TextInput, etc., para uso dinâmico nos formulários e data grids.

```typescript
// fieldMapper.ts
import React from 'react';
import { TextField, TextInput, NumberField, NumberInput, BooleanField, BooleanInput } from 'react-admin';

export function mapFields(schema: any, isEditMode: boolean = false) {
    return Object.keys(schema.properties).map((key) => {
        const fieldType = schema.properties[key].type;
        
        switch (fieldType) {
            case 'string':
                return isEditMode ? (
                    <TextInput key={key} source={key} />
                ) : (
                    <TextField key={key} source={key} />
                );
            case 'number':
            case 'integer':
                return isEditMode ? (
                    <NumberInput key={key} source={key} />
                ) : (
                    <NumberField key={key} source={key} />
                );
            case 'boolean':
                return isEditMode ? (
                    <BooleanInput key={key} source={key} />
                ) : (
                    <BooleanField key={key} source={key} />
                );
            default:
                return isEditMode ? (
                    <TextInput key={key} source={key} />
                ) : (
                    <TextField key={key} source={key} />
                );
        }
    });
}
```

Essa função mapFields usa schema.properties para mapear tipos do schema (string, number, boolean, etc.) para os componentes do React Admin.

## Passo 4: Componentes Dinâmicos para CRUD

Agora, crie componentes para List, Create, e Edit que usam fetchSchemaAndGenerateTypes para buscar a estrutura do endpoint e mapFields para renderizar os campos dinamicamente.

1. Listar (DynamicList)

```typescript
// DynamicList.tsx
import React, { useEffect, useState } from 'react';
import { List, Datagrid } from 'react-admin';
import { fetchSchemaAndGenerateTypes } from './dynamicTypes';
import { mapFields } from './fieldMapper';

export const DynamicList = ({ endpoint }: { endpoint: string }) => {
    const [fields, setFields] = useState<JSX.Element[]>([]);

    useEffect(() => {
        fetchSchemaAndGenerateTypes(endpoint).then(({ schema }) => {
            setFields(mapFields(schema));
        });
    }, [endpoint]);

    return (
        <List>
            <Datagrid rowClick="edit">
                {fields}
            </Datagrid>
        </List>
    );
};
```

2. Criar (DynamicCreate)

```typescript
// DynamicCreate.tsx
import React, { useEffect, useState } from 'react';
import { Create, SimpleForm } from 'react-admin';
import { fetchSchemaAndGenerateTypes } from './dynamicTypes';
import { mapFields } from './fieldMapper';

export const DynamicCreate = ({ endpoint }: { endpoint: string }) => {
    const [fields, setFields] = useState<JSX.Element[]>([]);

    useEffect(() => {
        fetchSchemaAndGenerateTypes(endpoint).then(({ schema }) => {
            setFields(mapFields(schema, true));
        });
    }, [endpoint]);

    return (
        <Create>
            <SimpleForm>
                {fields}
            </SimpleForm>
        </Create>
    );
};
```

3. Editar (DynamicEdit)

```typescript
// DynamicEdit.tsx
import React, { useEffect, useState } from 'react';
import { Edit, SimpleForm } from 'react-admin';
import { fetchSchemaAndGenerateTypes } from './dynamicTypes';
import { mapFields } from './fieldMapper';

export const DynamicEdit = ({ endpoint }: { endpoint: string }) => {
    const [fields, setFields] = useState<JSX.Element[]>([]);

    useEffect(() => {
        fetchSchemaAndGenerateTypes(endpoint).then(({ schema }) => {
            setFields(mapFields(schema, true));
        });
    }, [endpoint]);

    return (
        <Edit>
            <SimpleForm>
                {fields}
            </SimpleForm>
        </Edit>
    );
};
```

## Passo 5: Configurar o Resource para Usar Componentes Dinâmicos

No App.tsx, substitua o componente Resource padrão por um que utilize os componentes dinâmicos DynamicList, DynamicCreate, e DynamicEdit. Agora você pode passar um endpoint para esses componentes, permitindo a reutilização para qualquer outro endpoint no futuro.

```typescript
// App.tsx
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { DynamicList, DynamicCreate, DynamicEdit } from './DynamicComponents';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource
                name="posts"
                list={<DynamicList endpoint="https://jsonplaceholder.typicode.com/posts" />}
                create={<DynamicCreate endpoint="https://jsonplaceholder.typicode.com/posts" />}
                edit={<DynamicEdit endpoint="https://jsonplaceholder.typicode.com/posts/1" />}
            />
        </Admin>
    );
}

export default App;
```

Conclusão

Essa implementação permite que seu painel React Admin se adapte automaticamente à estrutura dos dados retornados dos endpoints. Usando json-schema-to-typescript e React Admin, conseguimos construir um painel de administração altamente reutilizável e dinâmico, que pode ser configurado para novos endpoints sem alterações de código, bastando apenas modificar o endpoint nos componentes DynamicList, DynamicCreate, e DynamicEdit.

# EJS Templates

Para gerar código React dinâmico usando templates EJS que se adaptam a um JSON Schema, podemos criar três arquivos EJS que representam cada uma das operações CRUD — listagem (List), criação (Create), e edição (Edit). Esses templates EJS receberão o JSON Schema como parâmetro e gerarão o código necessário para cada componente de forma dinâmica.

Estrutura dos Arquivos

Vamos criar uma estrutura onde cada operação do CRUD possui seu próprio template EJS. Suponha que esses templates estejam em uma pasta chamada templates.

Estrutura do projeto:

```bash
project-root/
├── templates/
│   ├── list.ejs
│   ├── create.ejs
│   └── edit.ejs
├── generate.js

	•	list.ejs: Template para gerar a tela de listagem (List).
	•	create.ejs: Template para gerar a tela de criação (Create).
	•	edit.ejs: Template para gerar a tela de edição (Edit).
	•	generate.js: Script para processar o JSON Schema e gerar os arquivos React usando os templates.
```

Conteúdo dos Templates EJS

1. Template list.ejs

Esse template cria um componente List dinâmico para o React Admin que renderiza uma tabela com colunas baseadas nos campos do JSON Schema.

```typescript
// list.ejs
import React from 'react';
import { List, Datagrid, <%= fields.map(field => `${field.component}`).join(', ') %> } from 'react-admin';

const <%= name %>List = () => (
    <List>
        <Datagrid rowClick="edit">
            <% fields.forEach(field => { %>
                <<%= field.component %> source="<%= field.name %>" />
            <% }) %>
        </Datagrid>
    </List>
);

export default <%= name %>List;
```

2. Template create.ejs

Este template cria um formulário Create dinâmico para React Admin com base nos campos do JSON Schema.

```typescript
// create.ejs
import React from 'react';
import { Create, SimpleForm, <%= fields.map(field => `${field.component}`).join(', ') %> } from 'react-admin';

const <%= name %>Create = () => (
    <Create>
        <SimpleForm>
            <% fields.forEach(field => { %>
                <<%= field.component %> source="<%= field.name %>" />
            <% }) %>
        </SimpleForm>
    </Create>
);

export default <%= name %>Create;
```

3. Template edit.ejs

Este template cria um formulário Edit dinâmico para React Admin que edita os campos com base no JSON Schema.

```typescript
// edit.ejs
import React from 'react';
import { Edit, SimpleForm, <%= fields.map(field => `${field.component}`).join(', ') %> } from 'react-admin';

const <%= name %>Edit = () => (
    <Edit>
        <SimpleForm>
            <% fields.forEach(field => { %>
                <<%= field.component %> source="<%= field.name %>" />
            <% }) %>
        </SimpleForm>
    </Edit>
);

export default <%= name %>Edit;
```

Script generate.js para Renderizar Templates EJS

Agora, vamos criar o script generate.js que carrega o JSON Schema, mapeia os campos para os componentes do React Admin, e renderiza os arquivos React usando os templates EJS.

```typescript
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
```

Explicação do Script

	•	componentMapping: Define qual componente React Admin será usado com base no tipo de cada campo (string, number, boolean, etc.).
	•	generateComponentsFromSchema: Função principal que mapeia os campos do schema e renderiza os arquivos com os templates EJS.
	•	generateFileFromTemplate: Lê o template EJS, renderiza com os dados fornecidos, e grava o arquivo de saída no sistema de arquivos.
	•	Exemplo de Uso: O script inclui um exemplo de schema para Post com os campos id, title, body, e published.

Executando o Script

Para executar o script e gerar os componentes, execute:

```bash
node generate.js
```

Isso gerará três arquivos:

	•	PostList.js
	•	PostCreate.js
	•	PostEdit.js

Esses arquivos conterão o código React necessário para os componentes List, Create, e Edit dinamicamente gerados com base no JSON Schema.

Exemplo de Saída para o Schema Post

Se o JSON Schema tiver esta estrutura:

```typescript
{
    "properties": {
        "id": { "type": "integer" },
        "title": { "type": "string" },
        "body": { "type": "string" },
        "published": { "type": "boolean" }
    }
}
```

Os arquivos gerados serão semelhantes a:

PostList.js

```typescript
import React from 'react';
import { List, Datagrid, TextField, NumberField, BooleanField } from 'react-admin';

const PostList = () => (
    <List>
        <Datagrid rowClick="edit">
            <NumberField source="id" />
            <TextField source="title" />
            <TextField source="body" />
            <BooleanField source="published" />
        </Datagrid>
    </List>
);

export default PostList;
```

PostCreate.js

```typescript
import React from 'react';
import { Create, SimpleForm, TextInput, BooleanInput } from 'react-admin';

const PostCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="body" />
            <BooleanInput source="published" />
        </SimpleForm>
    </Create>
);

export default PostCreate;
```

PostEdit.js

```typescript
import React from 'react';
import { Edit, SimpleForm, TextInput, BooleanInput } from 'react-admin';

const PostEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="body" />
            <BooleanInput source="published" />
        </SimpleForm>
    </Edit>
);

export default PostEdit;
```

Conclusão

Esse método permite gerar componentes React para React Admin de maneira dinâmica usando templates EJS e JSON Schema. Com isso, é possível criar uma estrutura reutilizável que se adapta a qualquer JSON Schema, tornando o desenvolvimento de CRUDs em React Admin rápido e flexível. Essa abordagem é ideal para aplicações com múltiplos endpoints, onde a estrutura de dados pode variar.