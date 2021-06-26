
import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email("Неверный адрес электронной почты")
        .required("Электронная почта обязательна"),
    password: Yup.string()
        .required("Пароль обязательна")
})

export const registerValidationSchema = Yup.object({
    firstname: Yup.string()
        .required("Имя обязательна"),
    lastname: Yup.string()
        .required("Фамиля обязательное"),
    email: Yup.string()
        .email("Неверный адрес электронной почты")
        .required("Электронная почта обязательна"),
    password: Yup.string()
        .required("Пароль обязательна")
        .matches(
            "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,}$",
            "Должно содержать 8 символов, один прописной, один строчный, одну цифру и один символ специального регистра."
        ),
    password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
})

export default {
    login: loginValidationSchema,
    register: registerValidationSchema
}