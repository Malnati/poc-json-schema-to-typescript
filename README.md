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


#### Executando a Prova de Conceito

Para executar o exemplo, siga os passos abaixo:

  1.	Execute a função fetchAndGenerateTypes em um ambiente Node.js ou diretamente no projeto React para verificar a saída gerada no console.
  2.	Verifique a geração de tipos no console e use-os em componentes React conforme mostrado no exemplo acima.

## Conclusão

Essa prova de conceito demonstra uma forma eficaz de automatizar a criação de tipos TypeScript para dados retornados por endpoints, possibilitando o uso de dados de APIs com maior segurança de tipos em aplicações React. Essa abordagem contribui para uma experiência de desenvolvimento mais segura, organizada e eficiente.

## Licença

Este projeto é licenciado sob a Licença MIT.

---