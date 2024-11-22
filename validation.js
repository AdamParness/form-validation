document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const fields = {
        email: document.getElementById('email'),
        country: document.getElementById('country'),
        zipCode: document.getElementById('zip-code'),
        password: document.getElementById('password'),
        passwordConfirm: document.getElementById('password-confirm')
    };

    // Validation configurations
    const validations = {
        email: {
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            errorMessage: 'Please enter a valid email address'
        },
        country: {
            regex: /^[a-zA-Z\s]{2,}$/,
            errorMessage: 'Please enter a valid country name'
        },
        zipCode: {
            regex: /^\d{5}(-\d{4})?$/,
            errorMessage: 'Please enter a valid zip code (e.g., 12345 or 12345-6789)'
        },
        password: {
            regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            errorMessage: 'Password must be 8+ chars, include letter, number, and special character'
        },
        passwordConfirm: {
            validate: (value) => value === fields.password.value,
            errorMessage: 'Passwords do not match'
        }
    };

    // Add event listeners for validation on blur
    Object.keys(fields).forEach(key => {
        fields[key].addEventListener('blur', () => validateField(key));
    });

    // Validation function for individual fields
    function validateField(fieldName) {
        const field = fields[fieldName];
        const validation = validations[fieldName];
        let isValid = true;

        // Remove previous error states
        field.classList.remove('valid', 'invalid');
        const errorSpan = document.getElementById(`${fieldName}-error`);
        if (errorSpan) errorSpan.remove();

        // Perform validation
        if (field.value.trim() === '') {
            isValid = false;
        } else if (validation.regex && !validation.regex.test(field.value)) {
            isValid = false;
        } else if (validation.validate && !validation.validate(field.value)) {
            isValid = false;
        }

        // Apply validation result
        if (isValid) {
            field.classList.add('valid');
        } else {
            field.classList.add('invalid');
            const errorSpan = document.createElement('span');
            errorSpan.id = `${fieldName}-error`;
            errorSpan.textContent = validation.errorMessage;
            errorSpan.style.color = 'red';
            field.parentNode.insertBefore(errorSpan, field.nextSibling);
        }

        return isValid;
    }

    // Form submission validation
    form.addEventListener('submit', (event) => {
        let formIsValid = true;

        // Validate all fields
        Object.keys(fields).forEach(key => {
            if (!validateField(key)) {
                formIsValid = false;
            }
        });

        // Prevent submission if validation fails
        if (!formIsValid) {
            event.preventDefault();
        }
    });
});