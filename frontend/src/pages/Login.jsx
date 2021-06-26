import React from 'react'
import styled from 'styled-components'
import Button from '../components/controls/Button'
import { BaseLink } from '../components/partials/NavItem'
import { useFormik } from "formik";
import { loginValidationSchema } from '../helpers/validators';
import { useQuery } from '../hooks/useQuery';
import { navigate } from '@reach/router';
import useAuthUser from '../store/actions/auth';

const Login = () => {
    const { query } = useQuery()
    const [error, setError] = React.useState()
    const { loading, login, me } = useAuthUser()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            setError("")
            const rep = await login(values)
            if (rep.error) {
                setError("Неверный адрес электронной почты или пароль")
            } else {
                formik.resetForm()
                await me()
                redirect()
            }
        },
    });

    function redirect() {
        const path = query.get('redirect') || '/'
        navigate(path)
    }

    return <Wrapper>
        <div className="login">
            <form className="flex flex-col login-form" onSubmit={formik.handleSubmit}>
                <div className="brand-logo flex items-center">
                    <div className="logo">
                        <svg enableBackground="new 0 0 503.589 503.589"
                            viewBox="0 0 503.589 503.589" xmlns="http://www.w3.org/2000/svg">
                            <g><path d="m69.954 459.229 168.711-291.214-71.765-123.863-166.9 290.897z" />
                                <path d="m503.355 319.98-166.877-290.858h-143.615l168.521 290.858z" />
                                <path d="m167.917 349.98-72.12 124.488h337.666l70.126-124.488z" />
                            </g>
                        </svg>
                    </div>
                    <div className="logo-text">AESDrive</div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <h1 className="login-heading">Вход</h1>
                    </div>
                    {error && <div className="error-panel">
                        <p>{error}</p>
                    </div>}
                    <div className="input-group">
                        <input type="text" className="input"
                            placeholder="Адрес эл. почты"
                            name="email"
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <small className="text-error">{formik.errors.email}</small>
                        )}
                    </div>
                    <div className="input-group">
                        <input type="password" className="input"
                            placeholder="Пароль"
                            name="password"
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.password && formik.touched.password && (
                            <small className="text-error">{formik.errors.password}</small>
                        )}
                    </div>
                    <div className="alt-link  flex flex-col">
                        <div>
                            Нет учетной записи? <BaseLink to="/register" >Создайте ее!</BaseLink>
                        </div>
                    </div>
                    <div className="input-group flex flex-col">
                        <Button className="btn btn-primary w-full" type="submit"
                            loading={loading}
                        >Войти</Button>
                    </div>
                </div>
            </form>
        </div>
    </Wrapper>
}

const Wrapper = styled.div`
.login{
    background: var(--highlight-color);
    position:fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items:center;
}
.login-form{
   width: 400px;
   height: 420px;
   background: #fff;
   padding: 30px;
   --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.login-heading{
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 20px;
}
.input-group{
    padding: 5px 0;
}
.alt-link{
   color: #555;
   font-weight: 400;
   font-size:12px;
   margin-bottom: 20px;
}
.alt-link a{
    color: var(--main-color);
}
.alt-link a:hover{
    text-decoration: underline
}
.error-panel{
    background: #f1b5b5;
    padding: 10px;
    font-size: 10px;
    margin-bottom: 10px;
}
.text-error{
    font-size: 10px;
    color: crimson;
}
`
export default Login