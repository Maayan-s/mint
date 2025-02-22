import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import Script from 'next/script';

import { config } from '@/config';
import { BASEPATH } from '@/utils/api';

const FAVICON_VERSION = 3;

function v(href: string) {
  return `${BASEPATH}${href}?v=${FAVICON_VERSION}`;
}

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" className="dark [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href={v('/favicons/apple-touch-icon.png')} />
          <link rel="icon" type="image/png" sizes="32x32" href={v('/favicons/favicon-32x32.png')} />
          <link rel="icon" type="image/png" sizes="16x16" href={v('/favicons/favicon-16x16.png')} />
          <link rel="shortcut icon" href={v('/favicons/favicon.ico')} />
          <meta name="apple-mobile-web-app-title" content={config.name} />
          <meta name="application-name" content={config.name} />
          <meta name="theme-color" content="#ffffff" />
          <meta name="msapplication-TileColor" content={config.colors?.primary} />
          <meta name="msapplication-config" content={v('/favicons/browserconfig.xml')} />
          {/* TODO: Fix custom script setup and remove */}
          <link
            rel="stylesheet"
            href="https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (localStorage.theme === 'dark' || (${(
                    config.modeToggle?.default == null
                  ).toString()} && !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) || ${(
                config.modeToggle?.default === 'dark'
              ).toString()}) {
                    document.documentElement.classList.add('dark')
                  }
                  
                  else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (_) {}
              `,
            }}
          />
        </Head>
        <body
          className="antialiased bg-background-light dark:bg-background-dark text-slate-500 dark:text-slate-400"
          // Add background image
          {...(config.backgroundImage && {
            style: { background: `url('${config.backgroundImage}') no-repeat fixed top right` },
          })}
        >
          <Main />
          <NextScript />
          {/* TODO: Fix custom script setup and remove */}
          <Script
            strategy="beforeInteractive"
            type="module"
            src="https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js"
          />
        </body>
      </Html>
    );
  }
}
