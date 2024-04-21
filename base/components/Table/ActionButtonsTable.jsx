import { Button } from "primereact/button";
export default function ActionButtonsTable(props) {
  return (
    <>
      <div className="flex justify-content-center gap-2"> 
        {typeof props?.handleClickEdit === "function" && (
            <Button
              tooltip="Editar"
              className="p-button-sm p-button-outlined p-button-secondary"
              icon="pi pi-pencil"
              onClick={props.handleClickEdit}
            />
          )}

        {typeof props?.handleClickDelete === "function" && (
            <Button
              tooltip="Eliminar"
              className="p-button-sm p-button-outlined p-button-secondary"
              icon="pi pi-trash"
              onClick={props.handleClickDelete}
            />
          )}
        {props.moreButtons}
      </div>
    </>
  );
}
