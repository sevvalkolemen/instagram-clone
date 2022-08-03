import * as Yup from "yup";

Yup.setLocale({
    mixed: {
        required: "Bu alan zorunludur!"
    },
    string: {
        email: "Geçerli bir e-mail girin!"
    }
})

export default Yup