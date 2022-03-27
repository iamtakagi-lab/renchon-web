import { GoogleAdsense } from "../components/adsense";
import { GoogleAnalytics } from "../components/ga";
import { Seo } from "../components/seo";
import "../styles/style.css";

export const App: React.FC<{
  Component: React.FC;
  pageProps: any;
}> = ({ Component, pageProps }) => {
  return (
    <>
      <GoogleAnalytics />
      <GoogleAdsense />
      <Component {...pageProps} />
    </>
  );
};

export default App;
