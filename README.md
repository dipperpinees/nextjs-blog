<p align="center">
  <a href="https://www.hiepnguyen.site/" target="blank"><img src="https://i.ibb.co/jLnn96z/B-2.png" width="200" alt="BLOGIFY" /></a>
</p>
<p align="center">A blog website using  <a href="https://nextjs.org/" target="_blank">Next.js</a> framework, <a href="https://www.apollographql.com/docs/react/" target="_blank">Apollo Client</a> and <a href="https://mui.com/" target="_blank">Material UI</a>.</p>

## <a href="https://www.hiepnguyen.site/">Demo</a>

### <a href="https://github.com/hiepnguyen223/nestjs-blog">Back-end repository</a>

## Getting Started

To get the frontend running locally:

- Clone this repo
- `npm install` or `yarn install` to install all dependencies
- `npm run dev` or `yarn run dev` to start the local server

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables
Fill env variables in `.env.local` file
```bash
NEXT_PUBLIC_ENDPOINT=BACKEND_DOMAIN/graphql
NEXT_PUBLIC_APOLLO_URI=FRONTEND_DOMAIN/graphql
```

## Functionality overview

**General functionality:**
- Authenticate via JWT
- CRUD articles
- CRUD comments on articles
- Follow other users
