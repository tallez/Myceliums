import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

import prisma from "../../../../lib/prisma"

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
        })
        if (user && user.password === password) {
          return user
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
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn(user, account, profile) {
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
          : "/custom-url" // Redirect to a custom URL on unsuccessful authentication
      )
    },
  },
  pages: {
    error: "/login",
  },
})
