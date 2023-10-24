// api/auth/dynamic_auth/route

import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { dbConnect } from "@utils/Database";
import User from "@models/user";

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ]
    ,
    callbacks:{ // on next auth the async functions after providers the callbacks which is a object contains async functions.
        async session({session}){
            const sessUser= await User.findOne({
                email:session.user.email,
            })
            console.log("callback1")
            session.user.id=sessUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try {
                // serverless function which is a lambda where it will use only call when needed
                // It will make a connection to the DB 
                await dbConnect();
                // check if the user exist
                const userExist= await User.findOne({email:profile.email});
                // if not create
                userExist?null:await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ","").toLowerCase(),
                    image:profile.picture
                    })
                return true;
            } catch (error) {
                console.log("Unable to Sign In");
                console.log(error.message)
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };

// Usually it has to be Get / Post 
// But for the nextAuth it has to be like this 