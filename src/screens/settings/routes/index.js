
import UserAccountPropertyEdit from '../pages/user_account_properties/edit'
import UserAccountPropertyCreate from '../pages/user_account_properties/create'

const routes = [
    {
        path: "/definitions/settings/currency/create",
        component: UserAccountPropertyCreate,
        name: "Kullanıcı Hesabı Özellikleri Ekle"
    },
    {
        path: "/definitions/settings/currency/edit/:id",
        component: UserAccountPropertyEdit,
        name: "Kullanıcı Hesabı Özellikleri Düzenle"
    },
    {
        path: "/definitions/settings/device-data-log/create",
        component: UserAccountPropertyCreate,
        name: "Kullanıcı Hesabı Özellikleri Ekle"
    }
]

export default routes