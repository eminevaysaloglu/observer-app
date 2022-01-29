import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        defaultValue: "",
        type: "text",
        placeHolder: "Varlık Grup Adı"
    },
    {
        key: "description",
        defaultValue: "",
        type: "text",
        placeHolder: "Açıklama"
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