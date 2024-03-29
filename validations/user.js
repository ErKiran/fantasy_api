const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports =
    {
        validateUserInfo: function validateUserInfo(data) {
            let errors = {};
            data.name = !isEmpty(data.name) ? data.name : '';
            data.email = !isEmpty(data.email) ? data.email : '';
            data.password = !isEmpty(data.password) ? data.password : '';

            if (Validator.isEmpty(data.email)) {
                errors.email = 'Email field is required';
            }
            if (Validator.isEmpty(data.name)) {
                errors.name = 'Name field is required';
            }
            if (!Validator.isEmail(data.email)) {
                errors.email = 'Email is invalid';
            }
            if (Validator.isEmpty(data.password)) {
                errors.password = 'Password field is required';
            }

            if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
                errors.password = 'Password must be at least 8 characters and less than 30 characters';
            }

            if (!Validator.isLength(data.name, { min: 6, max: 30 })) {
                errors.password = 'Name must be at least 6 characters';
            }

            if (Validator.isAlphanumeric(data.password)) {
                errors.password = 'Password must contain atleast one special characters';
            }

            return {
                errors,
                isValid: isEmpty(errors),

            };

        }
    }
