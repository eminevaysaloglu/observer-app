export const fields = () => [
    {
        key: "id",
        placeHolder:"Araç Plakası",
        validation: () => { },
        defaultValue: ""
    },
    {
        key: "engineNumber",
        type: "text",
        placeHolder: "Motor numarası",
        validation: () => { },
        defaultValue: "",
    },
    {
        key: "chasis",
        type: "text",
        placeHolder: "Şasi Numarası",
        validation: () => { },
        defaultValue: "",
    },
    {
        key: "brand",
        type: "text",
        placeHolder: "Marka",
        validation: () => { },
        defaultValue: "",
    },
    {
        key: "model",
        type: "text",
        placeHolder: "Model",
        validation: () => { },
        defaultValue: "",
    },
    {
        key: "modelYear",
        type: "number",
        placeHolder: "Model yılı",
        validation: () => { },
        defaultValue: 0,
    },
    {
        key: "load",
        type: "number",
        placeHolder: "Kapasite",
        validation: () => { },
        defaultValue: 0,
    },
    {
        key: "type",
        type: "text",
        placeHolder: "Tip",
        validation: () => { },
        defaultValue: 0,
    },
    {
        key: "createdAt",
        notShow: true
    },
    {
        key: "updatedAt",
        notShow: true
    },
    {
        key: "status",
        defaultValue: "ACTIVE",
        notShow: true
    }
]