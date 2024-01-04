# Leafythings Web
This is project for website for leafythings

## Development
Conventions for developers
- Use **yarn**
- Use **eslint** for formatting and code styling
- **Atomic (reusable)** design pattern
- Use GraphQL codegen and generated Apollo hooks
  - all *.graphql files should be located in api/graphql/
  - get schema.graphql from backend server using GraphQL plugin
  - run `yarn generate`
- If there is a need for REST API requests use [react-query](https://react-query.tanstack.com/).
- Use `memo` for non-dynamic props components.
- Use `useCallback` inside components and hooks.
- Use **simple** single value props rather than object value props.

### Running locally
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

