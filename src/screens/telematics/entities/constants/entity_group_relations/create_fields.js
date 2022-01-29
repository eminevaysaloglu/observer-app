import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "entity",
        type: "auto",
        options: "entities",
        label: (option) => `${option?.id}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Varlık",
        defaultValue: null,
    },
    {
        key: "group",
        type: "auto",
        options: "groups",
        label: (option) => `${option?.id}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Grup",
        defaultValue: null,
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