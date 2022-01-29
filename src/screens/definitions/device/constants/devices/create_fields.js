export const fields = () => [
    {
        key: "id",
        notShow: true
    },
    {
        key: "model",
        type: "text",
        placeHolder: "Model",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "dataProtocol",
        type: "text",
        placeHolder: "Protokol",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "dataProtocolVersion",
        type: "text",
        placeHolder: "Versiyon",
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

        key: "password",
        type: "text",
        placeHolder: "Parola",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "simPin",
        type: "text",
        placeHolder: "Sim Pin",
        validation: (value) => {
            if(!value)
                return true
            else false
         },
        defaultValue: "",
    },
    {
        key: "simPuk",
        type: "text",
        placeHolder: "Sim Puk",
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
        defaultValue: null,
    },
    {
        key: "updatedAt",
        notShow: true,
        defaultValue: null,
    }
]