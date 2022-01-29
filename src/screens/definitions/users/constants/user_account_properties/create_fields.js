export const fields = () => [
    {
        key: "id",
        defaultValue: "",
        notShow: true,
        validation: (value) => {
            return false
        }
    },
    {
        key: "account",
        type: "auto",
        options: "accounts",
        label: (option) => `${option?.user?.id}`,
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
        label: (option) => `${option.id}`,
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
            if (!value)
                return true
            else false
        },
        defaultValue: "",
    },
    {
        key: "datatype",
        type: "text",
        placeHolder: "Veri Tip",
        validation: (value) => {
            if (!value)
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
    },
]