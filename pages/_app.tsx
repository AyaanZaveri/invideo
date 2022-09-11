import "../styles/globals.css";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import SnackbarProvider from "react-simple-snackbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

export default MyApp;
