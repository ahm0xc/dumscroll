/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS, POST, PUT, DELETE",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
      // {
      //   // Apply the CSP to all routes
      //   source: "/(.*)", // This applies to all routes
      //   headers: [
      //     {
      //       key: "Content-Security-Policy",
      //       value: `
      //         default-src 'self' patient-crab-79.clerk.accounts.dev sandbox-buy.paddle.com *;
      //         script-src 'self' 'unsafe-inline' 'unsafe-eval' core.spreedly.com global.localizecdn.com js.stripe.com cdn.paddle.com patient-crab-79.clerk.accounts.dev sandbox-buy.paddle.com blob: data: *;
      //         style-src 'self' 'unsafe-inline' sandbox-cdn.paddle.com *;
      //         script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' cdn.paddle.com patient-crab-79.clerk.accounts.dev blob: *;
      //         img-src 'self' blob: data: *;
      //         font-src 'self';
      //         object-src 'none';
      //         base-uri 'self';
      //         form-action 'self';
      //         frame-ancestors *;
      //         upgrade-insecure-requests;
      //           `
      //         .replace(/\s{2,}/g, " ")
      //         .trim(),
      //     },
      //   ],
      // },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
};

export default config;
