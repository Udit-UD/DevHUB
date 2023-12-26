import React, {useState} from 'react'
import { Box, TextField, Button, useTheme, useMediaQuery, Typography } from '@mui/material';
import { Formik } from  "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../../state';
import { useDispatch } from 'react-redux';
import { RegisterField } from './RegisterField';
import LoadingButton from '@mui/lab/LoadingButton';


const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email().required("required"),
    password: yup.string().required("requried"),
    occupation: yup.string().required("required"),
    location: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email().required("required"),
    password: yup.string().required("required")
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}

const initialValuesLogin = {
    email: "",
    password: "",
}


export const Form = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [pageType, setPageType] = useState("login");
  const [error, setError] = useState("");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const neutralLight = theme.palette.neutral.light;

  const handleRegister = async(values, onSubmitProps) => {
    setIsLoading(true);
    const formData = new FormData();
    for (let value in values){
        formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const registerResponse = await fetch("http://localhost:3000/auth/register", {
        method:"POST",
        body: formData

    })

    const registerUser = await registerResponse.json();
    onSubmitProps.resetForm();

    if(registerUser){
        setPageType("login");
    }
    setIsLoading(false);
  }
  

  const handleLogin = async(values, onSubmitProps) => {
    setIsLoading(true);
    setError("");
    const loggedInResponse = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
    });

    if (loggedInResponse.status === 401) {
        const errorData = await loggedInResponse.json();
        setError(errorData.msg); 
        return;
    }
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if(loggedIn){
        dispatch(
            setLogin({
                user: loggedIn.user,
                token: loggedIn.token
            })
        );
        navigate("/home");
    }
    setIsLoading(false);
  }

  const handleSubmit = async(values, onSubmitProps) => {
    if(isLogin) await handleLogin(values, onSubmitProps);
    if(isRegister) await handleRegister(values, onSubmitProps);
  }


  return (  
    <Formik 
        onSubmit={handleSubmit}
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
                  component="section" 
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {gridColumn: isNonMobile ? undefined: "span 4"},
                    paddingTop:"5vh", marginTop:"2vh"
                    }}
                >
                    { isRegister && (
                        <>
                            <RegisterField values={values} errors ={errors} touched={touched} handleBlur={handleBlur} handleChange={handleChange}  setFieldValue={setFieldValue} />
                        </>
                    )}

                <TextField 
                    label = "Email"
                    placeholder='abc@gmail.com'
                    onBlur = {handleBlur}
                    onChange = {handleChange}
                    name='email'
                    value = {values.email}
                    error = {Boolean(touched.email) && Boolean(errors.email)}
                    helperText = {touched.email && errors.email}
                    sx={{gridColumn: "span 4"}}
                />

                <TextField 
                    label = "Password"
                    onBlur = {handleBlur}
                    onChange = {handleChange}
                    name='password'
                    type='password'
                    value = {values.password}
                    error = {Boolean(touched.password) && Boolean(errors.password)}
                    helperText = {touched.password && errors.password}
                    sx={{gridColumn: "span 4"}}
                />
                
                <Typography textAlign="center" sx={{gridColumn: "span 4", color: "red"}}>
                    {error}
                </Typography>

                <LoadingButton loading={isLoading} variant="contained" fullWidth size="large" type='submit' sx={{ gridColumn: "span 4", color:`${neutralLight}`}}>
                    {isLogin ? "LOGIN" : "REGISTER"}
                </LoadingButton>

                <LoadingButton variant="outlined" fullWidth size="large" onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    setError("");
                    resetForm();
                }} sx={{ gridColumn: "span 4"}}>
                    {isLogin ? "REGISTER" : "LOGIN"}
                </LoadingButton>
                </Box>


            </form>
        )}

    </Formik>
  )
}
