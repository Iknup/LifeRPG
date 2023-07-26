import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { User } from '@/models/User';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, email }) {
      await db.connect();
      const userExists = await User.findOne({
        email: user.email, //the user object has an email property, which contains the email the user entered.
      });
      if (userExists) {
        return true; //if the email exists in the User collection, email them a magic login link
      } else {
        return '/register';
      }
    },
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
};

export default NextAuth(authOptions);
