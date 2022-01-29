export const fields = () => [
    {
        key: "id",
        placeHolder: "Cihaz Grup Adı",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
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
        defaultValue: null
    },
    {
        key: "updatedAt",
        notShow: true,
        defaultValue: null
    }
]