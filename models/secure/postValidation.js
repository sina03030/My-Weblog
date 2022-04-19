const Yup = require('yup');

exports.schema = Yup.object().shape({
    title: Yup.string().min(5).max(100).required(),
    body: Yup.string().required(),
    status: Yup.mixed().oneOf(['public', 'private']),
});
