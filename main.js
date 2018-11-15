// @flow

import {Prisma} from 'prisma-binding';
import {GraphQLServer} from 'graphql-yoga';
import {makeExecutableSchema} from 'graphql-tools';
import {importSchema} from 'graphql-import';
import bodyParser from 'body-parser';

import {typeDefs as PrismaTypeDefs} from './generated/prisma/prisma-schema';

import resolvers from './src/resolvers';
import directiveResolvers from './src/resolvers/directives';
import {login} from './src/resolvers';

let typeDefs = importSchema('src/schema/schema.graphql');

let prisma = new Prisma({
  typeDefs: PrismaTypeDefs,
  endpoint:
    'https://us1.prisma.sh/advanced-react-training-api/money-trackr/dev',
  secret: 'super-secret-key'
});

let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers
});

const server = new GraphQLServer({
  schema,
  cors: {
    origin: false
  },
  context: (req) => {
    return {
      ...req,
      user: req.request.user,
      prisma
    };
  }
});

server.express.use(bodyParser.json());

server.express.get('/transactions', async (req, res) => {
  let transactions = await prisma.query.transactions(
    null,
    '{ id type transactionDetail amount category createdAt updatedAt }'
  );
  return res.json({
    data: transactions
  });
});

server.express.post('/transactions', async (req, res) => {
  let id = req.params.id;
  let transactions = await prisma.mutation.createTransaction(
    {
      data: {
        ...req.body,
        user: {
          connect: {
            id: 'cjog1c42b1mty0a01lnjx6nvn'
          }
        }
      }
    },
    '{ id type transactionDetail amount category createdAt updatedAt }'
  );
  return res.json({
    data: transactions
  });
});

server.express.get('/transactions/:id', async (req, res) => {
  let id = req.params.id;
  let transaction = await prisma.query.transaction(
    {
      where: {
        id
      }
    },
    '{ id type transactionDetail amount category createdAt updatedAt }'
  );
  return res.json({
    data: transaction
  });
});

server.express.get('/users', async (req, res) => {
  let users = await prisma.query.users(
    null,
    '{ id email name password createdAt updatedAt }'
  );
  return res.json({
    data: users
  });
});

server.express.get('/users/:id', async (req, res) => {
  let id = req.params.id;
  let transactions = await prisma.query.user(
    {
      where: {
        id
      }
    },
    '{ id email name password createdAt updatedAt }'
  );
  return res.json({
    data: transactions
  });
});

server.express.post('/login', async (req, res) => {
  let loginResponse = await login(req.body, prisma);
  return res.json({
    data: loginResponse
  });
});

server.start(() => console.log('Server is running on localhost:4000'));
