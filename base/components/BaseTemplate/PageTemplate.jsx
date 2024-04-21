import SectionLoader from "@/base/components/Loader/SectionLoader";
import ErrorMsg from "@/base/components/ErrorMsg/ErrorMsg";

export default function PageTemplate({
  title,
  iconTitle,
  children,
  loading = false,
  error = null,
}) {
  const renderContent = () => {
    if (loading) {
      return (
        <div className="mt-2">
          <SectionLoader />
        </div>
      );
    }

    if (error) {
      return (
        <div className="mt-2">
          <ErrorMsg detail={error} />
        </div>
      );
    }

    return <div className="mt-2">{children}</div>;
  };

  return (
    <div className="card">
      {title && (
        <div className="DATOS GENERALES">
          <i className={iconTitle} /> {title}
        </div>
      )}
      {renderContent()}
    </div>
  );
}
