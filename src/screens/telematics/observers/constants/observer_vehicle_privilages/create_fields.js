import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "accessBeginTime",
        type: "time",
        placeHolder: "Erişim Başlama Saati",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        defaultValue: new Date(),
    },
    {
        key: "accessEndTime",
        type: "time",
        placeHolder: "Erişim Bitiş Saati",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        defaultValue: new Date(),
    },
    {
        key: "observerVehicle",
        type: "auto",
        options: "observerVehicles",
        label: (option) => `${option?.vehicle?.id ||''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Araç",
        defaultValue: null,
    },
    {
        key: "validityBeginDate",
        type: "date",
        placeHolder: "Geçerlilik Başlama Tarihi",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        defaultValue: new Date(),
    },
    {
        key: "validityEndDate",
        type: "date",
        placeHolder: "Geçerlilik Bitiş Tarihi",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        defaultValue: new Date(),
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