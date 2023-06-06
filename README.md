## Uniform Contentful, commercetools, Cloudinary starter

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Add Commercetools Commerce integration

1. Navigate to your project then go to tab `Integrations`.

2. In section `Browse Integrations` chose `Commercetools`.

3. Fill out settings page

4. Click on `Save` button.

### Add Contentful integration

1. Navigate to your project then go to tab `Integrations`.

2. In section `Browse Integrations` chose `Contentful`.

3. Navigate to your Data Types page

4. Create new Contentful Data Source with public ID 'contentfulDataSource'

5. Fill data source page with necessary credentials

6. Click on `Save` button.
  
### Environment Variables

- `UNIFORM_API_KEY`: your uniform api key
  > ⚠️ For the initial setup, this API key needs the Developer role assigned to it.
- `UNIFORM_PROJECT_ID`: your uniform project
- `COMMERCETOOLS_PROJECT_KEY`: your Commercetools project key
- `COMMERCETOOLS_CLIENT_ID`: your Commercetools client id
- `COMMERCETOOLS_CLIENT_SECRET`: your Commercetools client secret
- `COMMERCETOOLS_API_URL`: your Commercetools api url
- `COMMERCETOOLS_AUTH_URL`: your Commercetools auth url
- `GOOGLE_ANALYTICS_ID`: optional, for [ga-plugin](https://docs.uniform.app/integrations/data/google-analytics#activate-ga-plugin)

### Init and start Commercetools Demo

1. In your terminal, from the project root, run the following command:

```bash
npm i
```

1. In your code editor and rename `.env.example` to `.env` file and add your `UNIFORM_API_KEY`, ` UNIFORM_PROJECT_ID`, `COMMERCETOOLS_PROJECT_KEY `, `COMMERCETOOLS_CLIENT_ID`, `COMMERCETOOLS_CLIENT_SECRET`, `COMMERCETOOLS_API_URL` and `COMMERCETOOLS_AUTH_URL` variables
   > ⚠️ For the initial setup, this API key needs the Developer role assigned to it.

1. This command pushes all configurations to your new Uniform project.

```bash
npm run push
```

1. Run the production server:

```bash
npm run build && npm run start
```

or development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.