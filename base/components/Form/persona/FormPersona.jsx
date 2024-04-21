import FloatInput from "@/base/components/Form/FloatInput";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "@/base/components/Form/InputNumber";
import { addLocale } from "primereact/api";

export default function FormPersona(props) {

  const tipoDocumento = [
    {
        value:'DNI',
        label: 'D.N.I'
    },
    {
        value:'PASAPORTE',
        label: 'Pasaporte'
    },
    {
        value:'LIBRETA',
        label: 'Libreta'
    },
  ]

  addLocale('es', {
    firstDayOfWeek: 1,
    showMonthAfterYear: true,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
});
    
  return (
    <>
        <FloatInput
            className="col-4 mt-4"
            label="Nombre"
            errorName={`${props.objName ? `${props.objName}.` : ""}perNombre`} //concatena . si es necesario
            formErrors={props.formErrors}
        >
            <InputText
            className={`${props.errorValue?.perNombre && "p-invalid"} w-full`}
            name={`${props.objName ? `${props.objName}.` : ""}perNombre`} //concatena . si es necesario
            value={props.inputValue?.perNombre ?? ""}
            onChange={props.handleFormChange}
            autoComplete="off" // Desactivar el autocompletado
            />
        </FloatInput>

        <FloatInput
            className="col-4 mt-4"
            label="Apellido"
            errorName={`${props.objName ? `${props.objName}.` : ""}perApellido`} //concatena . si es necesario
            formErrors={props.formErrors}
        >
            <InputText
            className={`${props.errorValue?.perApellido && "p-invalid"} w-full`}
            name={`${props.objName ? `${props.objName}.` : ""}perApellido`} //concatena . si es necesario
            value={props.inputValue?.perApellido ?? ""}
            onChange={props.handleFormChange}
            autoComplete="off" // Desactivar el autocompletado
            />
        </FloatInput>

        <FloatInput
            className="col-4 mt-4"
            label="Numero Documento"
            errorName={`${props.objName ? `${props.objName}.` : ""}perNumeroDocumento`} //concatena . si es necesario
            formErrors={props.formErrors}
        >
            <InputNumber
            className={`${props.errorValue?.perNumeroDocumento && "p-invalid"} w-full`}
            name={`${props.objName ? `${props.objName}.` : ""}perNumeroDocumento`} //concatena . si es necesario
            value={props.inputValue?.perNumeroDocumento ?? ""}
            onChange={props.handleFormChange}
            useGrouping={false}
            />
        </FloatInput>

        <FloatInput
            className="col-4 mt-4"
            label="Tipo de Documento"
            errorName={`${props.objName ? `${props.objName}.` : ""}perTipoDocumento`} //concatena . si es necesario
            formErrors={props.formErrors}
        >
            <Dropdown
            name={`${props.objName ? `${props.objName}.` : ""}perTipoDocumento`} //concatena . si es necesario
            className={`${props.errorValue?.perTipoDocumento && "p-invalid"} w-full`}
            options={tipoDocumento}
            value={props.inputValue?.perTipoDocumento ?? ""}
            onChange={props.handleFormChange}
            />
        </FloatInput>

        <FloatInput
            className="col-4 mt-4"
            label="Fecha Nac."
            errorName={`${props.objName ? `${props.objName}.` : ""}perFechaNacimiento`} //concatena . si es necesario
            formErrors={props.formErrors}
        >
            <Calendar
                mask="99/99/9999"
                key={props.inputValue?.perFechaNacimiento} //le paso key para que se renderize de nuevo, sino queda en blanco cuando encuentro una persona
                className={`${props.errorValue?.perFechaNacimiento && "p-invalid"} w-full p-inputcalendar`}
                name={`${props.objName ? `${props.objName}.` : ""}perFechaNacimiento`} //concatena . si es necesario
                value={props.inputValue?.perFechaNacimiento ?? ""}
                onChange={props.handleFormChange}
                showIcon
                showOnFocus={false}
                locale="es"
                dateFormat="dd/mm/yy"
            />
        </FloatInput>
    </>
  );
}
