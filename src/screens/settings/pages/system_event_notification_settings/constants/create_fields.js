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
        key: "event",
        type: "auto",
        options: "events",
        label: (option) => `${option?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Olay",
        defaultValue: {},
    },
    {
        key: "method",
        type: "auto",
        options: "userNotifications",
        label: (option) => `${option?.id || ''}`,
        validation: (value) => {
            if (!value)
                return true
            else false
        },
        placeHolder: "Yöntem",
        defaultValue: {},
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
        placeHolder: "Kullanıcı",
        defaultValue: {},
    },
    {
        key: "isActive",
        notShow: true,
        defaultValue: true
    }
]