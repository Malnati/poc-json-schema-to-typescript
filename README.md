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
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "created_at": "2023-11-05T12:00:00Z",
  "is_active": true,
  "profile": {
    "age": 30,
    "interests": ["coding", "reading", "gaming"]
  }
}
```

O json-schema-to-typescript irá gerar o seguinte tipo TypeScript:


```typescript
export interface UserResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
  is_active: boolean;
  profile: {
    age: number;
    interests: string[];
  };
}
```

#### Exemplo de Uso no React

Uma vez que os tipos foram gerados, podemos utilizá-los diretamente em um componente React. Veja o exemplo abaixo:


```typescript
import { UserResponse } from './types';

async function getUserData() {
    const response = await axios.get<UserResponse>('https://api.exemplo.com/user');
    return response.data;
}

function UserComponent() {
    const [user, setUser] = useState<UserResponse | null>(null);

    useEffect(() => {
        getUserData().then(data => setUser(data));
    }, []);

    return (
        <div>
            {user && (
                <>
                    <p>Nome: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Idade: {user.profile.age}</p>
                    <ul>
                        {user.profile.interests.map((interest, index) => (
                            <li key={index}>{interest}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
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