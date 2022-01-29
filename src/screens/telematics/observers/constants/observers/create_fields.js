import { toIsoString } from "utils/locale"
export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "user",
        type: "auto",
        options: "users",
        label: (option) => `${option?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Gözlemci Adı",
        defaultValue: {},
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
        key: "createdAt",
        notShow: true,
        defaultValue: null,
        defaultValue: toIsoString(new Date())
    },
    {
        key: "updatedAt",
        notShow: true,
        defaultValue: null,
    }
]