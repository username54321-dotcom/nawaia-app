import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every page.
 * We enforce `lang="ar"` and `dir="rtl"` for Arabic SEO optimization.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* 
          This resets the default scroll view styles to behavior more like a native app.
          It ensures the body takes up the full height of the viewport.
        */}
        <ScrollViewStyleReset />

        {/* Using raw CSS to ensure the body background matches the app theme immediately (prevents white flash) */}
        <style dangerouslySetInnerHTML={{ __html: `body { background-color: #fff; }` }} />
      </head>
      <noscript>
        نوايا هي منصة تعليمية متكاملة تقدم دورات أونلاين، مكتبة كتب متنوعة، واستشارات متخصصة لدعم
        مسيرتك في النمو والتطوير الشخصي.
      </noscript>
      <body>{children}</body>
    </html>
  );
}
