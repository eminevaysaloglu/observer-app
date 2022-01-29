import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "vehicle",
        type: "auto",
        options: "vehicles",
        label: (option) => `${option.id}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Araç Plakası",
        defaultValue: {},
    },
    {
        key: "observer",
        type: "auto",
        options: "observers",
        label: (option) => `${option?.user?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Gözlemci Adı",
        defaultValue: {},
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