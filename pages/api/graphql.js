import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolver } from '@/src/graphql/resolver/userResolver';
import { taskResolver } from '@/src/graphql/resolver/taskResolver';
import { sectionResolver } from '@/src/graphql/resolver/sectionResolver';
import { subtaskResolver } from '@/src/graphql/resolver/subtaskResolver';
import connectDB from '@/lib/mongoose';
import { typeDefs } from '@/src/graphql/typeDefs';

const resolvers = mergeResolvers([
  userResolver,
  taskResolver,
  sectionResolver,
  subtaskResolver,
]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(apolloServer);

console.log('Graphql up and running!');
connectDB();
