import React, { useState } from 'react';
import LazyTable from '@/base/components/Table/LazyTable';
import ActionButtonsTable from '@/base/components/Table/ActionButtonsTable';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
import useGenericDelete from '@/base/hooks/useGenericDelete';
import FilterTablePersona from '@/base/components/Form/persona/FilterTablePersona';

export default function Home() {
    const [refreshTable, setRefreshTable] = useState(0);
    const router = useRouter();
    const { genericDelete } = useGenericDelete();

    const handleClickAdd = () => {
        router.push(`/personas/crear`);
    }

    function onSucessDelete() {
        setRefreshTable(!refreshTable);
    }

    const handleClickDelete = (rowData) => {
        genericDelete(`/personas/${rowData.perId}`, null, onSucessDelete);
    };

    const actionButtons = (rowData) => {
        return (
            <ActionButtonsTable
                handleClickDelete={() => handleClickDelete(rowData)}
                handleClickEdit={() => router.push(`/personas/editar?id=${rowData.perId}`)}
            />
        )
    }

    const columns = [
        {
            field: "perId",
            header: "Id",
        },
        {
            field: "perNombre",
            header: "Nombre"
        },
        {
             field: "perApellido",
             header: "Apeliido"
        },
        {
            field: "perNumeroDocumento",
            header: "N° Documento"
        },
        {
             field: "perTipoDocumento",
             header: "Tipo Documento"
        },
        {
            field: "perFechaNacimiento",
            header: "Fecha Nacimiento"
        },
        {
            field: "action_buttons",
            header: "Acciones",
            align: "center",
            body: actionButtons,
        }
    ];

    return (
        <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
            <div className="text-3xl text-800 font-bold mb-4">Personas</div>
                <LazyTable
                    refreshTable={refreshTable}
                    columns={columns}
                    url={'/personas'}
                    pageSize={5}
                    filterTemplate={<FilterTablePersona />}
                    showGeneralSearch={false}
                    buttonsSection={(
                        <Button
                            label="Nuevo"
                            className="p-button p-button-success"
                            icon="pi pi-plus"
                            onClick={handleClickAdd}
                        />
                    )}
                />
        </div>
    );
}