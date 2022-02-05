import * as yup from 'yup'
const formValidationModel = {
        email: yup.string().matches(/^[A-Z0-9._+-]+@[A-Z0-9+-]+\.[A-Z]{2,}$/i, "Invalid Mail").required('Need to Verify You!'),
        username : yup.string().min(4, "Atleast 4 Characters").matches(/^[A-Za-z\d_]{4,}$/, "Invalid Username" ).required('Need to Fill !'),
        password : yup.string().min(6,`Atleast 6 char longer`).required('Need to Fill!'),
        name : yup.string().min(4).required('Need to fill !')
}

export default formValidationModel