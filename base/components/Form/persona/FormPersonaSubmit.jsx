import useCustomForm from "@/base/hooks/useCustomForm";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { getResponseError } from "@/base/helpers/api";
import api from "@/base/helpers/api";
import { useEffect } from "react";
import { formatTimestampToDate } from "@/base/helpers/utils";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import FormPersona from "./FormPersona";

export default function FormPersonaSubmit(props) {
  const router = useRouter();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { showErrorMsg, showSuccessMsg } = useToastContext();

  const {
    handleFormChange,
    setFormData,
    formData,
    formErrors,
    setFormErrors,
    handleSetFormErrors,
  } = useCustomForm();

  /** Valida formulario */
  const validateForm = () => {
    let valid = true;

    if (!formData?.perNombre) {
      valid = false;
      handleSetFormErrors("perNombre", "Campo requerido");
    }

    if (!formData?.perApellido) {
      valid = false;
      handleSetFormErrors("perApellido", "Campo requerido");
    }

    if (!formData?.perNumeroDocumento) {
      valid = false;
      handleSetFormErrors("perNumeroDocumento", "Campo requerido");
    }

    if (typeof formData?.perTipoDocumento === "undefined") {
      valid = false;
      handleSetFormErrors("perTipoDocumento", "Campo requerido");
    }
    
    if (!formData?.perFechaNacimiento) {
      valid = false;
      handleSetFormErrors("perFechaNacimiento", "Campo requerido");
    }

    return valid;
  };

  const onGoBack = () =>{
    router.push("/")
  }

  const onSubmitForm = async () => {
    
    // Validamos campos
    if (validateForm()) {
      try {

        if(formData?.perFechaNacimiento){
          let fecha = new Date(formData?.perFechaNacimiento);
    
          let dia = fecha.getDate();
          let mes = fecha.getMonth() + 1; 
          let ano = fecha.getFullYear(); 
          let fechaFormateada = `${dia.toString().padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${ano}`;
    
          let newFormData = formData;
          // Formateamos fechas
          newFormData.perFechaNacimiento = fechaFormateada;
    
          setFormData(newFormData);
        }

        let request;

        // Creamos
        if (props.submitAction === "add") {
          request = await api.post("/personas", formData);
        } else if (props.submitAction === "edit") {
          // Editamos
          request = await api.put(`/personas/${formData.perId}`, formData);
        }

        const { data } = request;
        showSuccessMsg(data.message);
        router.push("/");
      } catch (error) {
        showErrorMsg(getResponseError(error));
      } finally {
        hideBackdropLoader();
      }
    }
  };

  // Seteamos datos de productor si le pasamos, como en caso de editar
  useEffect(() => {

    if (props.personaData) {
      const newFormData = { ...props.personaData };
      // Formateamos fechas
      newFormData.perFechaNacimiento = formatTimestampToDate(newFormData.perFechaNacimiento)
      setFormData(newFormData);
    }
  }, []);

  return (
    <>
      <div className="grid border-round shadow-2">
        <FormPersona
          inputValue={formData}
          errorValue={formErrors}
          handleFormChange={handleFormChange}
          setFormData={setFormData}
          formData={formData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          submitAction={props.submitAction}
        />
        <div className="col-12 mt-3 flex align-items-center justify-content-between">
          <Button
            onClick={onGoBack}
            label="Volver"
            className="p-button-sm p-button-outlined"
          />
          <Button
            onClick={onSubmitForm}
            label="Guardar"
            className="p-button-sm p-button-success"
          />
        </div>
      </div>
    </>
  );
}
