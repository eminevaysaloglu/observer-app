export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "vehicle",
        type: "auto",
        options: "vehicles",
        label: (option) => `${option.id ||''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Araç",
        defaultValue: {},
    },
    {
        key: "key",
        type: "auto",
        options: "keys",
        label: (option) => `${option.id ||''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Key",
        defaultValue: {},
    },
    {
        key: "createdAt",
        notShow: true
    },
    {
        key: "updatedAt",
        notShow: true
    },
]