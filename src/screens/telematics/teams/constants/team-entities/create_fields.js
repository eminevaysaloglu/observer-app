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
        label: (option) => `${option?.id ||''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Varlık ID",
        defaultValue: null,
    },
    {
        key: "team",
        type: "auto",
        options: "teams",
        label: (option) => `${option?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Takım Adı",
        defaultValue: null,
    },
    {

        key: "description",
        type: "text",
        placeHolder: "Takım Varlık Açıklama",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        defaultValue: "",
    },

]