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
        placeHolder: "Cihazlar",
        defaultValue: {},
    },
    {
        key: "group",
        type: "auto",
        options: "groups",
        label: (option) => `${option?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Grup Adı",
        defaultValue: {},
    },
]