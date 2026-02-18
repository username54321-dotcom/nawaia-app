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

        {/* SEO Keywords - Arabic & English */}
        <meta
          name="keywords"
          content="نوايا, تعليم, دورات أونلاين, كتب, استشارات, تطوير شخصي, نمو ذاتي, تدريب, منصة تعليمية, Nawaia, education, online courses, books, consultations, personal development, self-growth, e-learning"
        />

        {/* Bilingual Alternate Links */}
        <link rel="alternate" hrefLang="ar" href="https://nawaia.net/" />
        <link rel="alternate" hrefLang="en" href="https://nawaia.net/" />
        <link rel="alternate" hrefLang="x-default" href="https://nawaia.net/" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nawaia" />
        <meta name="twitter:title" content="نوايا | Nawaia - منصة تعليمية متكاملة" />
        <meta
          name="twitter:description"
          content="اكتشف دورات أونلاين، كتب متنوعة، واستشارات متخصصة | Discover online courses, books & consultations"
        />
        <meta name="twitter:image" content="https://nawaia.net/favicon.png" />
        <meta name="twitter:image:alt" content="شعار نوايا - Nawaia Logo" />

        {/* Additional SEO Meta */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="google" content="notranslate" />

        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://hdxnyotrpjmrigmpdpkn.supabase.co" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        {/* Preload Critical Fonts for Performance */}
        <link
          rel="preload"
          href="/assets/fonts/NotoKufiArabic-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/assets/fonts/PlaywriteDEGrund-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

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
        مسيرتك في النمو والتطوير الشخصي. | Nawaia is a comprehensive educational platform offering
        online courses, a diverse book library, and specialized consultations to support your
        personal growth journey.
      </noscript>
      <body>{children}</body>
    </html>
  );
}
