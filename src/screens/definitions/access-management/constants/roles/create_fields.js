import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        defaultValue: "",
        type: "text",
        placeHolder: "Rol",
    },
    {
        key: "description",
        type: "text",
        placeHolder: "Açıklama",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "isDefault",
        notShow: true,
        defaultValue: true
    },
    {
        key: "createdAt",
        notShow: true,
        defaultValue: toIsoString(new Date())
    },
    {
        key: "updatedAt",
        notShow: true,
        defaultValue: toIsoString(new Date())
    },
]