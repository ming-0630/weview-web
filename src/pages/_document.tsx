import Document, { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next';
const getInitialProps = createGetInitialProps();


export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="en">
        <Head />
        <body data-theme="mytheme">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
