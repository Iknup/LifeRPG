import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import GoogleProvider from 'next-auth/providers/google';
import Intl from 'intl';
import axios from 'axios';

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
  callbacks: {
    async session({ session, token, user }) {
      session.user._id = user.id;

      const createdAtISO = user.createdAt.toISOString();
      session.user.createdAt = createdAtISO;
      if (user.timezone) {
        const timezone = {
          timezone: user.timezone.timezoneString,
          offset: user.timezone.offset,
        };
        session.user.timzone = timezone;
      }

      return session;
    },
  },

  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
