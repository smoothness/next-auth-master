# BCard Web App

## Getting Started

### After the project is cloned:

1. Use the correct Node version, so install NVM first
   Open [NVM Github](https://github.com/nvm-sh/nvm)

2. Use NVM to use the correct Node version for this project, which will be 20.+
   Since we have a `.nvmrc` file in the project you can just run:

```bash
nvm use
```

And nvm will pick the `.nvmrc` file and switch to the correct Node version.

3. Install all the node packages needed by running:

```bash
npm i
```

4. Install the Talwind extension for VSCode
   Tailwind CSS IntelliSense

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Add components from shadcn

Navigate to [Shadcn component UI library](https://ui.shadcn.com/docs/components)

Select the component you want to use

Add the component to the UI components in the project by running:

```bash
npx shadcn-ui@latest add button
```

In which button is the component you want to add. The component will be added to the `/components/ui/` directory.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
