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
        key: "code",
        type: "text",
        placeHolder: "Kod",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "exchangeRate",
        type: "text",
        placeHolder: "Döviz Kuru",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "symbol",
        type: "text",
        placeHolder: "Sembol",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    }
]