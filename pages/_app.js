import Head from 'next/head';
import '../src/styles/globals.css';
import '../src/styles/templates.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>AITi新闻海报生成器</title>
        <meta name="description" content="制作精美科技风的新闻海报，一键分享传播你的资讯" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 