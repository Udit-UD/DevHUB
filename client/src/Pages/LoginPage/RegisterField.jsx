import React from 'react'
import { TextField, Typography, Box } from '@mui/material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import  Dropzone from "react-dropzone";
import FlexBetween from '../../Components/FlexBetween';
import { useTheme } from '@mui/material';
import * as yup from "yup";



export const RegisterField = ({handleBlur, handleChange, values, touched, errors, setFieldValue}) => {
    const theme = useTheme();
  return (
    <>
        <TextField 
            label = "First Name"
            onBlur = {handleBlur}
            onChange = {handleChange}
            name='firstName'
            value = {values.firstName}
            error = {Boolean(touched.firstName) && Boolean(errors.firstName)}
            helperText = {touched.firstName && errors.firstName}
            sx={{gridColumn: "span 2"}}
        />
        <TextField 
            label = "Last Name"
            onBlur = {handleBlur}
            onChange = {handleChange}
            name='lastName'
            value = {values.lastName}
            error = {Boolean(touched.lastName) && Boolean(errors.lastName)}
            helperText = {touched.lastName && errors.lastName}
            sx={{gridColumn: "span 2"}}
        />
        <TextField 
            label = "Location"
            onBlur = {handleBlur}
            onChange = {handleChange}
            name='location'
            value = {values.location}
            error = {Boolean(touched.location) && Boolean(errors.location)}
            helperText = {touched.location && errors.location}
            sx={{gridColumn: "span 2"}}
        />
        <TextField 
            label = "Occupation"
            onBlur = {handleBlur}
            onChange = {handleChange}
            name='occupation'
            value = {values.occupation}
            error = {Boolean(touched.occupation) && Boolean(errors.occupation)}
            helperText = {touched.occupation && errors.occupation}
            sx={{gridColumn: "span 2"}}
        />
        <Box 
            gridColumn="span 4"
            border={`1px solid ${theme.palette.neutral.medium}`}
            borderRadius="5px"
            p="1rem"
        >
            <Dropzone
                acceptedFiles = ".png, .jpg, .jpeg"
                multiple = {false}
                onDrop={(acceptedFiles) => 
                    setFieldValue("picture", acceptedFiles[0])
                }   
            >
                {({getRootProps, getInputProps}) => (
                    <Box 
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.primary.main}`}
                        p="1rem"
                        sx={{"&:hover": {cursor: "pointer"}}}
                    >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                            <p>Add profile Picture</p>
                        ) : (
                            <FlexBetween>
                                <Typography >
                                    {values.picture.name}
                                </Typography>
                                <EditOutlinedIcon />
                            </FlexBetween>
                        )}

                    </Box>
                )}
            </Dropzone>
        </Box>
    </>
  )
}
