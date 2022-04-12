const yup = require('yup');

exports.userValidation = yup.object().shape({
    fullname: yup.string().required().min(4).max(255),
    email: yup.string().email().required(),
    password: yup.string().min(3).max(255).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'password does not match'),
});
