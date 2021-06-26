
import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Неверный адрес электронной почты")
        .required("Электронная почта обязательна"),
    password: Yup.string()
        .required("Пароль обязательна")
})

export const registerValidationSchema = Yup.object({
    first_name: Yup.string()
        .required("Имя обязательна"),
    last_name: Yup.string()
        .required("Фамиля обязательное"),
    email: Yup.string()
        .email("Неверный адрес электронной почты")
        .required("Электронная почта обязательна"),
    password: Yup.string()
        .required("Пароль обязательна")
        .min(8, 'Пароль должен содержать не менее 8 символов.')
        .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
    // .matches(
    //     /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    //     "Пароль должен содержать не менее 8 символов, не менее одной строчной буквы, одной прописной буквы и специальных символов."
    // ),
    password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
})

export default {
    login: loginValidationSchema,
    register: registerValidationSchema
}