import "primeicons/primeicons.css";                           //icons
import "primeflex/primeflex.css";
import "@/styles/globals.css";
import "@/styles/custom.css";
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import Head from 'next/head';
import PublicRoutes from "@/base/components/PublicRoutes";

function MyApp({ Component, pageProps }) {
  return (
                <PublicRoutes redirectLogin={false}>
                    <Head>
                        <title>{process.env.project_title_head}</title>
                        <link rel="icon" href={process.env.icon} />
                    </Head>
                    <Component {...pageProps} />
                </PublicRoutes>
    );
}

export default MyApp