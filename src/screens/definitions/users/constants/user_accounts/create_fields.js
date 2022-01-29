import { toIsoString } from "utils/locale"

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
        key: "user",
        type: "auto",
        options: "users",
        label: (option) => `${option?.id}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Kullanıcı Adı",
        defaultValue: {},
    },
    {
        key: "locale",
        type: "text",
        placeHolder: "Bölge",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "timezone",
        type: "text",
        placeHolder: "Saat Dilimi",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "restricted",
        notShow: true,
        defaultValue: false,
    },
    {
        key: "verified",
        notShow: true,
        defaultValue: true,
    },
    {
        key: "status",
        type: "text",
        placeHolder: "Durum",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "IDLE",
    },
    {
        key: "theme",
        type: "text",
        placeHolder: "Tema",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "DARK",
    },
    {
        key: "createdAt",
        notShow: true,
        defaultValue: toIsoString(new Date())
    }
]