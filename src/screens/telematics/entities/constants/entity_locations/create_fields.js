import { v4 as uuidv4 } from 'uuid';
import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        defaultValue: uuidv4(),
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
        placeHolder: "Varlık",
        defaultValue: null,
    },
    {
        key: "userAddress",
        type: "auto",
        options: "userAddresses",
        label: (option) => `${option?.id ||''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Kullanıcı Adresi",
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