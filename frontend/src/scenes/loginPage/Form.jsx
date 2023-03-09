import { useState } from "react";
import {
    Box,
    Button,
    TextFields,
    useMediaQuery,
    Typography,
    useTheme,
    TextField
} from '@mui/material'
import { Formik } from "formik";
import * as yup from "yup"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween.jsx";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import useCookies from "react-cookie/cjs/useCookies";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("Obrigatório"),
    lastName: yup.string().required("Obrigatório"),
    email: yup.string().email("Email inválido").required("Obrigatório"),
    password: yup.string().required("Obrigatório"),
    location: yup.string().required("Obrigatório"),
    occupation: yup.string().required("Obrigatório"),
    picture: yup.string().required("Obrigatório")
})

const loginSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Obrigatório"),
    password: yup.string().required("Obrigatório")
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [pageType, setPageType] = useState('login')
    const {palette} = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const isLogin = pageType === 'login'
    const isRegister = pageType ==='register'
    const [cookies, setCookie] = useCookies(['auth'])

    const register = async (values, onSubmitProps) => {
        const formData = new FormData()
        for(let value in values) {
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name )
        const savedUserResponse = await fetch(
            "https://api-portsmedia.herokuapp.com/auth/register",
            {
                method: "POST",
                body: formData
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm()
        if(savedUser) {
            setPageType('login')
        }
    }

    const login = async (values, onSubmitProps) => {
        const emailIgnoreCaseValues = {
            "email": values.email.toLowerCase(),
            "password": values.password
        }
        const loggedInResponse = await fetch(
            "https://api-portsmedia.herokuapp.com/auth/login",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(emailIgnoreCaseValues)
            }
        )
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm()
        if(loggedIn) {
            setCookie('auth', loggedIn.user.token, { path: '/' })
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate('/home')
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) await login(values, onSubmitProps)
        if(isRegister) await register(values, onSubmitProps)
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >

            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display='grid'
                        gap='30px'
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        sx={{
                            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4'}
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="Nome"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: 'span 2' }}
                                />
                                <TextField
                                    label="Sobrenome"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: 'span 2' }}
                                />
                                <TextField
                                    label="Localidade"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.localidade) && Boolean(errors.localidade)}
                                    helperText={touched.localidade && errors.localidade}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <TextField
                                    label="Ocupação"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText={touched.occupation && errors.occupation}
                                    sx={{ gridColumn: 'span 4' }}
                                />
                                <Box
                                    gridColumn='span 4'
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius='5px'
                                    p='1rem'
                                >
                                    <Dropzone
                                        acceptedFiles={['.jpg', '.png', '.jpeg']}
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                        setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                            <p>Adicione uma foto</p>
                                            ) : (
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>
                                                <ModeEditOutlineOutlinedIcon />
                                            </FlexBetween>
                                            )}
                                        </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: 'span 4' }}
                        />
                        <TextField
                            label="Senha"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: 'span 4' }}
                        />
                    </Box>

                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                '&:hover': { color: palette.primary.main }
                            }}
                        >
                            {isLogin ? "Entrar" : "Registrar"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login")
                                resetForm()
                            }}
                            sx={{
                                textDecoration: 'underline',
                                color: palette.primary.main,
                                '&:hover': {
                                    cursor: 'pointer',
                                    color: palette.primary.light
                                },
                            }}
                        >
                            {isLogin ? 
                                "Não tem uma conta? Clique aqui para criar uma" : 
                                "Já possui uma conta? Clique aqui para entrar"
                                }
                        </Typography>
                    </Box>

                </form>
            )} 

        </Formik>
    )
}

export default Form