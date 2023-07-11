import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // ...add more providers here
  ],
  // If want to use a custom sign in page
  // pages: {
  //   signIn: '/login',
  // },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
