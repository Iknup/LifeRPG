import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import GitHubProvider from 'next-auth/providers/github';
import axios from 'axios';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.MY_APP_GITHUB_ID,
      clientSecret: process.env.MY_APP_GITHUB_SECRET,
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),

    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token, user }) {
      // passing user data to session.
      session.user._id = user.id;

      if (user.createdAt) {
        const createdAtISO = user.createdAt.toISOString();
        session.user.createdAt = createdAtISO;
      }
      if (user.timezone) {
        const timezone = {
          timezoneString: user.timezone.timezoneString,
          offset: user.timezone.offset,
        };
        session.user.resetSchedule = user.resetSchedule;
        session.user.timezone = timezone;
      }

      return session;
    },
  },
  events: {
    createUser: async user => {
      try {
        // adding register date to user.
        const userData = user.user;
        if (!userData.createdAt) {
          const currentTime = new Date().toISOString();

          const updatedUser = await axios.patch(
            `${process.env.DOMAIN}/api/user?userId=${userData.id}`,
            { createdAt: currentTime }
          );
        }

        console.log('create user:', updatedUser);
      } catch (e) {
        console.error('create user error:', e);
      }
    },
  },
  pages: {
    newUser: '/about',
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
