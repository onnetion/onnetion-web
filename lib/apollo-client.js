import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://onnetion.com/graphql",
  cache: new InMemoryCache(),
});
