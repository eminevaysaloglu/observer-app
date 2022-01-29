export const fields = () => [
    {
        key: "id",
        notShow: true,
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "device",
        type: "auto",
        options: "devices",
        label: (option) => `${option?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Cihaz",
        defaultValue: {},
    },
    {
        key: "key",
        type: "auto",
        options: "keys",
        label: (option) => `${option?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Key",
        defaultValue: {},
    },
    {

        key: "value",
        type: "text",
        placeHolder: "Değer",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {

        key: "datatype",
        type: "text",
        placeHolder: "Veri Tipi",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
]