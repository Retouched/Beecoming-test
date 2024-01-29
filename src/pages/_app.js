import { DataProvider } from "src/context/DataContext";
import "@styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />;
    </DataProvider>
  );
}

export default MyApp;
