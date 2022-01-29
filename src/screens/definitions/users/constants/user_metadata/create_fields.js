export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "user",
        type: "auto",
        options: "users",
        label: (option) => `${option?.firstname || ''} ${option?.lastname || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Kullanıcı",
        defaultValue: {},
    },
    {
        key: "key",
        type: "auto",
        options: "keys",
        label: (option) => `${option.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Keys",
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
    {

        key: "createdAt",
        notShow: true
    },
    {

        key: "updatedAt",
        notShow: true
    }
]