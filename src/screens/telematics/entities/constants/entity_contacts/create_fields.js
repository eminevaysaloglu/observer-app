import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "firstname",
        type: "text",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "İsim",
        defaultValue: "",
    },
    {
        key: "lastname",
        type: "text",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Soyisim",
        defaultValue: "",
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
        key: "email",
        type: "email",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Mail Adresi",
        defaultValue: "",
    },
    {
        key: "phone",
        type: "text",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Telefon",
        defaultValue: "",
    },
    {
        key: "website",
        type: "text",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Website",
        defaultValue: "",
    },
    {
        key: "entity",
        type: "auto",
        options: "entities",
        label: (option) => `${option.id}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Varlık Adı",
        defaultValue: null,
    },
    {
        key: "createdAt",
        notShow: true,
        defaultValue: null,
    },
    {
        key: "updatedAt",
        notShow: true,
        defaultValue: null,
    }
]