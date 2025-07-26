import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../generated/prisma";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    socialProviders: {
        github: {
            clientId: "Ov23lik4r9eJk55R440Y", 
            clientSecret:"194ca72d53d9041ac6da2fab2d32c8ea405c942b", 
        }, 
    },

})