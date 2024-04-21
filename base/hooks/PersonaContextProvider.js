import { createContext, useContext, useState, useEffect } from "react";
import api from "@/base/helpers/api";
import { useRouter } from "next/router";
import { useGeneralContext } from "@/base/context/GeneralContext";

const PersonaContext = createContext();

const PersonaContextProvider = ({ children }) => {
    const router = useRouter();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
    const [personalData, setPersonaData] = useState(0);
    const [requestStatus, setRequestStatus] = useState("LOADING");

    const getDataPersona = async (id) => {
        try {
            setRequestStatus('LOADING');
            const { data } = await api.get(`/personas/${id}`);
            // Si todo esta OK
            setRequestStatus('SUCCESS');
            setPersonaData(data);
        } catch (error) {
            setRequestStatus('ERROR');
        }
    }

    const refreshDataPersona = async (id) => {
        try {
            showBackdropLoader();
            const { data } = await api.get(`/personas/${id}`);
            setPersonaData(data);
        } catch (error) {
            console.log(error);
        } finally {
            hideBackdropLoader();
        }
    }

    // Obtenemos datos de la url
    useEffect(() => {
        if (router.isReady) {
            if (router.pathname == "/personas/editar") {
                getDataPersona(router.query?.id);
            }
        }
    }, [router]);

    const data = {
        refreshDataPersona,
        personalData,
        requestStatus
    };

    return (
        <PersonaContext.Provider value={data}>
            {children}
        </PersonaContext.Provider>
    );
};

export { PersonaContextProvider };

export const usePersonaContext = () => useContext(PersonaContext);