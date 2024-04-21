import { createContext, useState, useContext } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";

const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [blockedDocument, setBlockedDocument] = useState(false);

  const showConfirmDialog = (title, message, accept, reject = null) => {
    confirmDialog({
      message: message,
      header: title,
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: accept,
      reject: reject,
    });
  };

  const showBackdropLoader = () => {
    setBlockedDocument(true);
  };

  const hideBackdropLoader = () => {
    setBlockedDocument(false);
  };

  const data = {
    showConfirmDialog,
    showBackdropLoader,
    hideBackdropLoader,
  };

  return (
    <GeneralContext.Provider value={data}>
      <BlockUI
        blocked={blockedDocument}
        fullScreen
        template={<ProgressSpinner />}
      />
      <ConfirmDialog />
      {children}
    </GeneralContext.Provider>
  );
};

export { GeneralContextProvider };

export const useGeneralContext = () => useContext(GeneralContext);
