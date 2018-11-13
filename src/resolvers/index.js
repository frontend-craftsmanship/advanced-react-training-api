import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {forwardTo} from 'prisma-binding';

let queryResolvers = {
  transactions: forwardTo('prisma'),
  transaction: forwardTo('prisma'),
  users: forwardTo('prisma'),
  user: forwardTo('prisma')
};

let mutationResolvers = {
  createTransaction: forwardTo('prisma'),
  updateTransaction: forwardTo('prisma'),
  deleteTransaction: forwardTo('prisma'),
  login: async (_, params, context) => {
    return await login(params.data, context.prisma);
  }
};

export async function login(data, prisma) {
  let {email, password} = data;
  let response = await prisma.query.user(
    {where: {email}},
    '{ id password name}'
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
          userID: response.id
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

let resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers
};

export default resolvers;
