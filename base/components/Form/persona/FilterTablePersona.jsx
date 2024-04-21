import FloatInput from "@/base/components/Form/FloatInput";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";

export default function FilterTablePersona({ filters, setFilters }) {
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

  const handleSearch = ({ target }) => {
    setFilters({ ...filters,[target.name]: target.value });
  };

  return (
    <>
      <FloatInput className="col-12 md:col-6 mt-3" label="Nombre">
      <InputText
            className={'w-full'}
            name={'perNombre'} 
            value={filters?.perNombre}
            onChange={handleSearch}
            autoComplete="off"
            />
      </FloatInput>

      <FloatInput className="col-12 md:col-6 mt-3" label="Tipo documento">
        <Dropdown
          className={`w-full`}
          name={"perTipoDocumento"}
          value={filters?.perTipoDocumento}
          options={tipoDocumento}
          onChange={handleSearch}
        />
      </FloatInput>
    </>
  );
}
