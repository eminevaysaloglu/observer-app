import { toIsoString } from "utils/locale"

export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "accessBeginTime",
        type: "datetimeOffset",
        placeHolder: "Erişim Başlama Tarihi",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        defaultValue: new Date(),
    },
    {
        key: "accessEndTime",
        type: "datetimeOffset",
        placeHolder: "Erişim Bitiş Tarihi",
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        defaultValue: new Date(),
    },
    {
        key: "observerDriver",
        type: "auto",
        options: "observerDrivers",
        label: (option) => `${option?.observer?.user?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Gözlemci",
        defaultValue: {},
    },
    {
        key: "validityBeginDate",
        type: "datetimeOffset",
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
        type: "datetimeOffset",
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