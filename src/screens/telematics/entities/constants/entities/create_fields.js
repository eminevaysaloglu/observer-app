import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        defaultValue: "",
        placeHolder: "Varlık Adı"
    },
    {
        key: "type",
        type: "auto",
        options: "types",
        label: (option) => `${option?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Varlık Tipi",
        defaultValue: null,
    },
    {
        key: "user",
        type: "auto",
        options: "users",
        label: (option) => `${option?.id ||''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Kullanıcı Adı",
        defaultValue: null,
    },
    {
        key: "description",
        type: "text",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Açıklama",
        defaultValue: "",
    },
    {
        key: "createAt",
        notShow: true
    },
    {
        key: "updatedAt",
        notShow: true
    }
]