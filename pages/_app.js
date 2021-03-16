import "../styles/globals.scss";

import NavBarPk from "../components/navbarpk";
import App from "next/app";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.user = ctx.req?.session?.passport?.user;
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user,
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    const props = { ...pageProps, user: this.state.user };
    return <Component {...pageProps} />;
  }
}

export default MyApp;
