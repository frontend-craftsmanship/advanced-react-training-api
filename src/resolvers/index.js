import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {forwardTo} from 'prisma-binding';

let queryResolvers = {
  transactions() {
    forwardTo('prisma');
  },
  transaction() {
    forwardTo('prisma');
  },
  users() {
    forwardTo('prisma');
  },
  user() {
    forwardTo('prisma');
  }
};

let mutationResolvers = {
  createTransaction() {
    forwardTo('prisma');
  },
  updateTransaction() {
    forwardTo('prisma');
  },
  deleteTransaction() {
    forwardTo('prisma');
  },
  login: async (_, params, context, info) => {
    let {email, password} = params.data;
    let response = await context.prisma.query.user(
      {where: {email}},
      '{ id password role name}'
    );
    if (!response) {
      throw new Error('Email not found!');
    }
    let isPasswordValid = await bcrypt.compare(password, response.password);
    if (isPasswordValid) {
      return {
        id: response.id,
        email,
        token: jwt.sign(
          {
            userID: response.id,
            role: response.role
          },
          'super-secret-key',
          {expiresIn: '7d'}
        ),
        name: response.name
      };
    } else {
      throw new Error('Email or password is incorrect!');
    }
  }
};

let resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers
};

export default resolvers;
