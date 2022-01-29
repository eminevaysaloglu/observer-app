
export const fields = () => [
    {
        key: "id",
        type: "text",
        placeHolder: "Takım Adı",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue:"",
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

        key: "status",
        type: "text",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        placeHolder: "Durum",
        defaultValue: "",
    },
    {
        key: "createdAt",
        notShow: true,
        defaultValue: null,
    },
    {
        key: "updatedAt",
        notShow: true,
        defaultValue: null,
    }
]