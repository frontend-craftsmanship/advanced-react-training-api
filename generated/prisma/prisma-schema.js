export const typeDefs = /* GraphQL */ `type AggregateTransaction {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

enum Category {
  FOOD
  CLOTHES
  COMMUNICATIONS
  ENTERTAINMENT
  TRANSPORTATION
  BILLS
  SALARY
  SAVINGS
  DEPOSITS
}

scalar DateTime

scalar Long

type Mutation {
  createTransaction(data: TransactionCreateInput!): Transaction!
  updateTransaction(data: TransactionUpdateInput!, where: TransactionWhereUniqueInput!): Transaction
  updateManyTransactions(data: TransactionUpdateInput!, where: TransactionWhereInput): BatchPayload!
  upsertTransaction(where: TransactionWhereUniqueInput!, create: TransactionCreateInput!, update: TransactionUpdateInput!): Transaction!
  deleteTransaction(where: TransactionWhereUniqueInput!): Transaction
  deleteManyTransactions(where: TransactionWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  transaction(where: TransactionWhereUniqueInput!): Transaction
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction]!
  transactionsConnection(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TransactionConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  transaction(where: TransactionSubscriptionWhereInput): TransactionSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Transaction {
  id: ID!
  type: Transaction_Type!
  transactionDetail: String!
  amount: Float!
  category: Category!
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
}

enum Transaction_Type {
  EXPENSE
  INCOME
}

type TransactionConnection {
  pageInfo: PageInfo!
  edges: [TransactionEdge]!
  aggregate: AggregateTransaction!
}

input TransactionCreateInput {
  type: Transaction_Type!
  transactionDetail: String!
  amount: Float!
  category: Category!
  user: UserCreateOneWithoutTransactionsInput!
}

input TransactionCreateManyWithoutUserInput {
  create: [TransactionCreateWithoutUserInput!]
  connect: [TransactionWhereUniqueInput!]
}

input TransactionCreateWithoutUserInput {
  type: Transaction_Type!
  transactionDetail: String!
  amount: Float!
  category: Category!
}

type TransactionEdge {
  node: Transaction!
  cursor: String!
}

enum TransactionOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  transactionDetail_ASC
  transactionDetail_DESC
  amount_ASC
  amount_DESC
  category_ASC
  category_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type TransactionPreviousValues {
  id: ID!
  type: Transaction_Type!
  transactionDetail: String!
  amount: Float!
  category: Category!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type TransactionSubscriptionPayload {
  mutation: MutationType!
  node: Transaction
  updatedFields: [String!]
  previousValues: TransactionPreviousValues
}

input TransactionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TransactionWhereInput
  AND: [TransactionSubscriptionWhereInput!]
  OR: [TransactionSubscriptionWhereInput!]
  NOT: [TransactionSubscriptionWhereInput!]
}

input TransactionUpdateInput {
  type: Transaction_Type
  transactionDetail: String
  amount: Float
  category: Category
  user: UserUpdateOneRequiredWithoutTransactionsInput
}

input TransactionUpdateManyWithoutUserInput {
  create: [TransactionCreateWithoutUserInput!]
  delete: [TransactionWhereUniqueInput!]
  connect: [TransactionWhereUniqueInput!]
  disconnect: [TransactionWhereUniqueInput!]
  update: [TransactionUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [TransactionUpsertWithWhereUniqueWithoutUserInput!]
}

input TransactionUpdateWithoutUserDataInput {
  type: Transaction_Type
  transactionDetail: String
  amount: Float
  category: Category
}

input TransactionUpdateWithWhereUniqueWithoutUserInput {
  where: TransactionWhereUniqueInput!
  data: TransactionUpdateWithoutUserDataInput!
}

input TransactionUpsertWithWhereUniqueWithoutUserInput {
  where: TransactionWhereUniqueInput!
  update: TransactionUpdateWithoutUserDataInput!
  create: TransactionCreateWithoutUserInput!
}

input TransactionWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  type: Transaction_Type
  type_not: Transaction_Type
  type_in: [Transaction_Type!]
  type_not_in: [Transaction_Type!]
  transactionDetail: String
  transactionDetail_not: String
  transactionDetail_in: [String!]
  transactionDetail_not_in: [String!]
  transactionDetail_lt: String
  transactionDetail_lte: String
  transactionDetail_gt: String
  transactionDetail_gte: String
  transactionDetail_contains: String
  transactionDetail_not_contains: String
  transactionDetail_starts_with: String
  transactionDetail_not_starts_with: String
  transactionDetail_ends_with: String
  transactionDetail_not_ends_with: String
  amount: Float
  amount_not: Float
  amount_in: [Float!]
  amount_not_in: [Float!]
  amount_lt: Float
  amount_lte: Float
  amount_gt: Float
  amount_gte: Float
  category: Category
  category_not: Category
  category_in: [Category!]
  category_not_in: [Category!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  user: UserWhereInput
  AND: [TransactionWhereInput!]
  OR: [TransactionWhereInput!]
  NOT: [TransactionWhereInput!]
}

input TransactionWhereUniqueInput {
  id: ID
}

type User {
  id: ID!
  email: String!
  name: String!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  transactions(where: TransactionWhereInput, orderBy: TransactionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Transaction!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  name: String!
  password: String!
  transactions: TransactionCreateManyWithoutUserInput
}

input UserCreateOneWithoutTransactionsInput {
  create: UserCreateWithoutTransactionsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutTransactionsInput {
  email: String!
  name: String!
  password: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  name_ASC
  name_DESC
  password_ASC
  password_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  name: String!
  password: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  name: String
  password: String
  transactions: TransactionUpdateManyWithoutUserInput
}

input UserUpdateOneRequiredWithoutTransactionsInput {
  create: UserCreateWithoutTransactionsInput
  update: UserUpdateWithoutTransactionsDataInput
  upsert: UserUpsertWithoutTransactionsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutTransactionsDataInput {
  email: String
  name: String
  password: String
}

input UserUpsertWithoutTransactionsInput {
  update: UserUpdateWithoutTransactionsDataInput!
  create: UserCreateWithoutTransactionsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  transactions_every: TransactionWhereInput
  transactions_some: TransactionWhereInput
  transactions_none: TransactionWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`