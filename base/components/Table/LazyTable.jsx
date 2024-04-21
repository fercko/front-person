import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import FiltersLazyTable from "@/base/components/Table/FiltersLazyTable";
import { useToastContext } from "@/base/context/ToastContext";
import { InputText } from "primereact/inputtext";
import api from "@/base/helpers/api";

export default function LazyTable({
  columns,
  pageSize,
  url,
  params,
  filterTemplate,
  refreshTable,
  buttonsSection,
  title,
  iconTitle,
  selectionMode,
  selection,
  onSelectionChange,
  showGeneralSearch,
  onFilter,
}) {
  const { showErrorMsg, showInfoMsg } = useToastContext();
  
  const [data, setData] = useState([]);
  
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: pageSize,
    page: 0,
  });

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filters, setFilters] = useState({});
  const [generalSearch, setGeneralSearch] = useState("");

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        align={col.align}
        style={col.style}
      />
    );
  });

  const onPage = (event) => {
    const _page = event.page;
    setLazyParams({ ...event, page: _page });
  };

  const loadLazyData = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(url,{
        params: {
          page: lazyParams.page,
          pageSize: lazyParams.rows,
          filters: JSON.stringify(filters),
          search: generalSearch,
          ...params,
        }
      });
      setData(data.data);
      setTotalRecords(data.total);
    } catch (error) {
      showErrorMsg("Ocurrió un error al traer los datos.");
    } finally {
      setLoading(false);
    }
  };

  const paginatorTemplate = {
    layout:
      "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
      ];

      return (
        <>
          <span className="mx-1 pl-6">Items por pagina: </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span>
          Mostrando {options.first} - {options.last} de {options.totalRecords}{" "}
          registros
        </span>
      );
    },
  };

  useEffect(() => {
    loadLazyData();
  }, [lazyParams, filters, generalSearch, refreshTable]);

  useEffect(() => {
    if (typeof onFilter == "function") {
      onFilter(filters);
    }
  }, [filters]);

  return (
    <>
      {typeof filterTemplate === "object" && (
        <FiltersLazyTable filters={filters} setFilters={setFilters}>
          {filterTemplate}
        </FiltersLazyTable>
      )}

      <div className="header_table">
        <div className="page_title">
          <i className={iconTitle} /> {title}
        </div>
        {typeof buttonsSection === "object" && (
          <div className="buttons">
            <div className="buttons_section">{buttonsSection}</div>
          </div>
        )}
      </div>

      {showGeneralSearch && (
        <div className="mb-2">
          <span className="p-input-icon-left w-full md:w-5">
            <i className="pi pi-search" />
            <InputText
              value={generalSearch}
              onChange={(e) => setGeneralSearch(e.target.value)}
              placeholder="Buscar"
            />
          </span>
        </div>
      )}

      <DataTable
        lazy
        value={data}
        responsiveLayout="scroll"
        paginator
        onPage={onPage}
        first={lazyParams.first}
        rows={lazyParams.rows}
        totalRecords={totalRecords}
        loading={loading}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName="justify-content-end"
        selectionMode={selectionMode}
        selection={selection}
        onSelectionChange={onSelectionChange}
        emptyMessage="No hay registros disponibles"
      >
        {dynamicColumns}
      </DataTable>
    </>
  );
}
