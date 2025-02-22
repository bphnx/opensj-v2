# OpenSJ v2

This app is a fork of [OpenSJ](https://github.com/bphnx/openSJ)

[Published here](https://bphnx.github.io/opensj-v2/)

## Why the fork?

To be able to test and experiment with different ways of judging, trying to optimize and improve the original system.

The app has been modified as follows:
- SAPD and GCC parameters have been removed.
- Now each parameter (except PEN) gets up to 5 instead of 3.
- The starting value for each competitor is 5.0.
- The encoding algorithm [has been modified](https://github.com/bphnx/opensj-v2#the-new-algorithm)

The reasoning behind the modifications are:
- SAPD is barely used at all, and all those techniques can be included as COM or as a combination of BAS/MOV/DIN
- GCC nowadays is just the average of BAS/MOV/DIN, it does not give useful insights on the athlete.
- Since now we have less parameters, we can increase the ticks to the remaining ones, allowing the Style Judge to have more granularity per parameter.
- Now to get a perfect 10 it is not needed to use SOG at all, reducing the weight of the SJ opinion on the score.

## Current issues
- The perfect 10 is impossible to get in real life, because it needs 5 DIF, being a contradiction if the athlete has 5s in the other parameters. Ideally, the perfect 10 should be achievable only using BAS/MOV/DIN/COM.
- The current maximum score is 10.5, it should be 10.
- There are negative scores. Minimum should be 0.
- Reset All not working on mobile browser

## Pending features
- Reset PEN on long press
- Decode screen
- Fix issues
  
## The New Algorithm

Based off the original algorithm, it has been modified as:

One-character encoding
- Allows 26 possible combinations
- BAS/MOV/DIN with values 0, 1 or 2 *except* BAS = MOV = DIN = 2 -> 3^3 - 1 = 26 combinations.

Two-characters encoding
- Allows 26 * 23 = 598 combinations
- BAS/MOV/DIN with values 0, 1, 2, 3 or 4 (5^3 = 125) and COM/DIF with values 0 or 1 (2^2 = 4) -> 125 * 4 = 500 combinations.

Three-characters encoding
- Allows 26 * 26 * 23 = 15548 combinations
- BAS/MOV/DIN/COM/DIF with values 0, 1, 2, 3, 4 or 5 -> 6^5 = 7776 combinations.

# Tech Readme

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
