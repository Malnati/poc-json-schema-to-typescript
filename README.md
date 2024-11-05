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