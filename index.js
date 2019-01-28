const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    greeting(name: String, position: String): String!
    add(num1: Float!, num2: Float!): Float!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info){
      if(args.name && args.position){
        return `Hello, ${args.name}! You are a great ${args.position}`
      } else  {
        return 'Hello!'
      }
    },
    add(parent, args, ctx, info){
      return args.num1 + args.num2
    },
    me() {
      return {
        id: '123098',
        name: 'Jason',
        email: 'support@goodfaith.church'
      }
    },
    post() {
      return {
        id: '007',
        title: 'Good Faith Paradigm',
        body: 'Co-Creating A New Faith Based Paradigm.',
        published: false
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });

const app = express();
server.applyMiddleware({ app });
app.get("/", (req, res) => {
  res.redirect("/graphql");
});

const port = 4000;

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at ${port}${server.graphqlPath}`
  )
);
