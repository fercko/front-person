export const formatDateToIso = (date) => {
    const formattedDate = date.toISOString();
    return formattedDate;
}

export const isNumber = (value) => {
    return !isNaN(value) ? true : false;
}

export const maskDate = (event) => {
    let returnData = event.key;
    return returnData;
}

export const formatTimestamp = (timestamp, format) => {
   
    const fecha = new Date(timestamp);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    let fechaFormateada = "";

    switch (format) {
        case 'dd/mm/yyyy':
            fechaFormateada = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0') + '/' + anio.toString();
            break;
        case 'mm/yyyy':
            fechaFormateada = mes.toString().padStart(2, '0') + '/' + anio.toString();
            break;
    }

    return fechaFormateada;
}

export const formatDate = (format, date) => {
    const fecha = new Date(date);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');

    let fechaFormateada = "";

    switch (format) {
        case 'dd/mm/yyyy':
            fechaFormateada = `${dia}/${mes}/${anio}`;
            break;
        case 'mm/yyyy':
            fechaFormateada = `${mes}/${anio}`;
            break;
        case 'dd/mm/yyyy|hh:mm':
            fechaFormateada = `${dia}/${mes}/${anio}, ${horas}:${minutos}`;
            break;
    }

    return fechaFormateada;
}

export const formatTimestampToDate = (date) => {
    const formattedDate = date ? new Date(date) : null;
    return formattedDate;
}

export const formatMultipartFormData = (
    array_keys,
    object,
    _formData = new FormData(),
    parentKey = ""
) => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const value = object[key];
            const currentKey = parentKey
                ? `${parentKey}[${isNumber(key) ? "" : key}]`
                : key;
            if (typeof value === "object" && value !== null) {
                
                if (value instanceof Date) {
                    _formData.append(currentKey, value);
                } else if (value instanceof File) {
                    
                    _formData.append(parentKey, value, value.name);
                } else {
                    formatMultipartFormData(array_keys, value, _formData, currentKey);
                }
            } else {
                if (!array_keys.includes(parentKey)) {
                    _formData.append(currentKey, value);
                }
            }
        }
    }
    return _formData;
}
