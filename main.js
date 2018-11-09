// @flow

import {Prisma} from 'prisma-binding';
import {GraphQLServer} from 'graphql-yoga';
import {makeExecutableSchema} from 'graphql-tools';
import {importSchema} from 'graphql-import';
import {typeDefs as PrismaTypeDefs} from './generated/prisma/prisma-schema';

import resolvers from './src/resolvers';
import directiveResolvers from './src/resolvers/directives';

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

server.start(() => console.log('Server is running on localhost:4000'));
