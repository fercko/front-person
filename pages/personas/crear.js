import PageTemplate from "@/base/components/BaseTemplate/PageTemplate";
import FormPersonaSubmit from "@/base/components/Form/persona/FormPersonaSubmit";

export default function CrearPersona() {

    return (
        <PageTemplate
            title={'DATOS GENERALES'}
            iconTitle="pi pi-user"
        >
            <FormPersonaSubmit
                submitAction="add"
            />
        </PageTemplate>
    )
}