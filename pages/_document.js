import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className="container max-w-7xl mx-auto bg-theme">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument