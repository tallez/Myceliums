import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { comparePasswords } from "@utils/passwords-encrypt"

import prisma from "../../../../lib/prisma"

class CustomPrismaAdapter extends PrismaAdapter {
  async createUser(profile) {
    // Custom logic to create a user in your Prisma schema
    // based on the profile data received from the provider
    // You can override any other methods as needed
    return prisma.user.create({
      data: {
        email: profile.email,
        name: profile.name,
        image: profile.image,
        emailVerified: profile.email_verified || false,
      },
    })
  }
}

const customPrismaAdapter = new CustomPrismaAdapter(prisma)

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Please provide your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Please provide your password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
          select: {
            id: true,
            password: true,
            email: true,
            name: true,
            emailVerified: true,
          },
        })
        if (user && (await comparePasswords(password, user.password))) {
          if (user.emailVerified) {
            return user
          } else {
            throw new Error("Email not confirmed")
          }
        } else {
          throw new Error("Invalid Credentials")
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: customPrismaAdapter,
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If a user is logged in, include the user's ID in the token
      if (user) {
        token.id = user.id // Include the 'id' field in the token
      }
      return token
    },
    async session({ session, token }) {
      // Include the user's ID in the session data
      session.user.id = token.id
      return session
    },
    async signIn(user) {
      if (user) {
        return Promise.resolve(true)
      }
      // If authentication fails, redirect to an error page or the login page
      throw new Error("Authentication failed")
    },
    async redirect(url, baseUrl) {
      const callbackUrl =
        typeof url === "string" && url.startsWith(baseUrl)
          ? url
          : baseUrl + "/api/auth/callback/[provider]"

      return Promise.resolve(
        callbackUrl === baseUrl + "/api/auth/callback/[provider]"
          ? "/playground" // Redirect to /playground on successful authentication
          : "/login?error=An%20Error%20Occured" // Redirect to a custom URL on unsuccessful authentication
      )
    },
  },
  pages: {
    error: "/login",
  },
})
