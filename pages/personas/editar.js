import PageTemplate from "@/base/components/BaseTemplate/PageTemplate";
import { useToastContext } from "@/base/context/ToastContext";
import api, { getResponseError } from "@/base/helpers/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";
import FormPersonaSubmit from "@/base/components/Form/persona/FormPersonaSubmit";


export default function Edit() {
    const router = useRouter();
    const [personaData, setPersonaData] = useState(null);

    const getPersona = async (id) => {
        try {

            const { data } = await api.get(`/personas/${id}`);
    
            if (!data.data) {
                showErrorMsg("No se pudo obtener los datos de la persona.");
                router.push('/personas');
                return;
            }

            setPersonaData(data.data);
        } catch (error) {
            router.push('/personas');
        }
    }


    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            getPersona(id);
        }
    }, [router]);

    if (!personaData) {
        return <SimpleLoader />;
    }

    return (
        <PageTemplate
            title={'Editar Persona'}
            iconTitle={''}
        >
            <FormPersonaSubmit
                submitAction="edit"
                personaData={personaData}
            />
        </PageTemplate>
    )
}