import { useEffect, useState } from "react";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";
import { ToastContextProvider } from "@/base/context/ToastContext";
import { GeneralContextProvider } from "@/base/context/GeneralContext";
import Head from "next/head";

export default function PublicRoutes({ children, redirectLogin }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false);
  });

  if (loading) {
    return <SimpleLoader />;
  }

  return (
    <GeneralContextProvider>
      <ToastContextProvider>
          <Head>
            <title>{process.env.project_title_head}</title>
            <link rel="icon" href={process.env.icon} />
          </Head>
          {children}
      </ToastContextProvider>
    </GeneralContextProvider>
  );
}
