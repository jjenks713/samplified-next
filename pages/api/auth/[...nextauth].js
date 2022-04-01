import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import connectToDB  from '../../../db/connect'
import createInfo from '../../../db/createInfo'



export default (req, res) => //eslint-disable-line

NextAuth(req, res, {
    session: {
        // use JWTs instead adding again
      jwt: true,
      maxAge: .1 * 24 * 60 * 60,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
      }),
      Providers.Google({        
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      // ...add more providers here
    ],

    database: process.env.DATABASE_URL,
    pages: {
      signIn: '/sign-up',
    },  
    callbacks: {
        async session(session, user) {
        session.user.id = user.id
        return session
        },
        async jwt(tokenPayload, user, account, profile, isNewUser) {
        const { db } = await connectToDB()
        if (isNewUser) {
            await createInfo(db, {
              _id: `${user.id}`,
              createdBy: `${user.id}`,
              info: '',
              soundcloud: '',
              twitter: '',
              facebook: '',
            })
            //res.send({ data: newInfo });
        }
    
        if (tokenPayload && user) {
            return { ...tokenPayload, id: `${user.id}` }
        }
    
        return tokenPayload
        },
    },
  })