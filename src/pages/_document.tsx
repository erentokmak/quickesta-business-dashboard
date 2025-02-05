import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html
      className="h-full no-scrollbar"
      data-theme="true"
      data-theme-mode="ligth"
      lang="tr"
    >
      <Head></Head>
      <body className="antialiased flex h-full text-base text-gray-700 [--tw-page-bg:#F6F6F9] [--tw-page-bg-dark:var(--tw-coal-200)] [--tw-content-bg:var(--tw-light)] [--tw-content-bg-dark:var(--tw-coal-500)] [--tw-content-scrollbar-color:#e8e8e8] [--tw-header-height:60px] [--tw-sidebar-width:270px] bg-[--tw-page-bg] dark:bg-[--tw-page-bg-dark] lg:overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
