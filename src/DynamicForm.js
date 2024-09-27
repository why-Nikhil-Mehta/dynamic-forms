import React, { useState, useEffect } from 'react';
import { TextInput, TextArea, Dropdown, RadioGroup, CheckboxGroup, Slider, NumberInput } from './components/Field'; // Import NumberInput
import './style.css'; // Import the enhanced CSS

const DynamicForm = ({ jsonStructure }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState(false); // Track validation errors
    const [savedData, setSavedData] = useState(null);

    useEffect(() => {
        const savedForm = localStorage.getItem('formData');
        if (savedForm) {
            setSavedData(JSON.parse(savedForm));
            setFormData(JSON.parse(savedForm)); // Prepopulate the form
        } else {
            initializeDefaultValues(); // Initialize with default values if no saved data
        }
    }, []);

    // Initialize formData with default values from the JSON structure
    const initializeDefaultValues = () => {
        let initialData = {};

        jsonStructure.form.groups.forEach((group) => {
            group.fields.forEach((field) => {
                if (field.default) {
                    initialData[field.name] = field.default;
                }
            });
        });

        setFormData(initialData);
    };

    // Common function for onChange handlings
    const handleChange = (e, field, isCheckboxGroup = false) => {
        const { name, value, type, checked } = e.target;

        let updatedValue = value;
        if (type === 'checkbox' && isCheckboxGroup) {
            const previousValues = formData[field.name] || [];
            updatedValue = checked
                ? [...previousValues, value]
                : previousValues.filter((v) => v !== value);
        } else if (type === 'checkbox') {
            updatedValue = checked;
        }

        setFormData({
            ...formData,
            [name]: updatedValue,
        });

        if (field.required && !value) {
            field.errorMessage = `${field.label} is required`;
            setErrors(true)
        } else {
            field.errorMessage = undefined
            setErrors(false)
        }

    };

    // Created Custom Function on Top of common function for some field specific handlings
    const handleTextChange = (e, field) => {
        handleChange(e, field);
        const { value } = e.target;
        // Email validation (if the field is for email)
        if (field.type === 'text' && field.name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.errorMessage = 'Please enter a valid email address.';
                setErrors(true)
            } else {
                field.errorMessage = undefined
                setErrors(false)
            }
        }

        // Phone number validation (e.g., must be 10 digits)
        if (field.type === 'text' && field.name === 'phoneNumber' && value) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(value)) {
                field.errorMessage = 'Please enter a valid 10-digit phone number.';
                setErrors(true)
            } else {
                field.errorMessage = undefined
                setErrors(false)
            }
        }


    }

    // Created Custom Function on Top of common function for some field specific handlings
    const handleNumberChange = (e, field) => {
        handleChange(e, field);
        const { value } = e.target;
        // Numeric validation (e.g., for year range)
        if (field.type === 'number' && field.name === 'graduationYear' && value) {
            if (value < field.min || value > field.max) {
                field.errorMessage = `Graduation year must be between ${field.min} and ${field.max}.`;
            } else {
                field.errorMessage = undefined;
            }
        }


    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors) {
            localStorage.setItem('formData', JSON.stringify(formData));
            alert('Form data saved successfully!');
        } else {
            alert('Please correct the errors before submitting.');
        }
    };

    const renderField = (field, value) => {

        switch (field.type) {
            case 'text':
                return (
                    <TextInput
                        field={field}
                        value={value}
                        handleChange={(e) => handleTextChange(e, field)}
                        errorMessage={field.errorMessage}
                    />
                );
            case 'textarea':
                return (
                    <TextArea
                        field={field}
                        value={value}
                        handleChange={(e) => handleChange(e, field)}
                        errorMessage={field.errorMessage}
                    />
                );
            case 'dropdown':
                return (
                    <Dropdown
                        field={field}
                        value={value}
                        handleChange={(e) => handleChange(e, field)}
                        errorMessage={field.errorMessage}
                    />
                );
            case 'radio':
                return (
                    <RadioGroup
                        field={field}
                        value={value}
                        handleChange={(e) => handleChange(e, field)}
                        errorMessage={field.errorMessage}
                    />
                );
            case 'checkbox':
                return (
                    <CheckboxGroup
                        field={field}
                        value={value}
                        handleChange={(e) => handleChange(e, field, true)}
                        errorMessage={field.errorMessage}
                    />
                );
            case 'slider':
                return (
                    <Slider
                        field={field}
                        value={value}
                        handleChange={(e) => handleChange(e, field)}
                        errorMessage={field.errorMessage}
                    />
                );
            case 'number':
                return (
                    <NumberInput
                        field={field}
                        value={value}
                        handleChange={(e) => handleNumberChange(e, field)}
                        errorMessage={field.errorMessage}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>{jsonStructure.form.title}</h2>
                <p>{jsonStructure.form.description}</p>
                {jsonStructure.form.groups.map((group, groupIndex) => (
                    <div key={groupIndex} className="form-group">
                        <h3 className="group-title">{group.title}</h3>
                        {group.fields.map((field, fieldIndex) => (
                            <div key={fieldIndex}>
                                {renderField(field, formData[field.name])}
                            </div>
                        ))}
                        {groupIndex < jsonStructure.form.groups.length - 1 && <div className="group-divider"></div>}
                    </div>
                ))}
                <button disabled={errors} className={errors ? "error" : "success"} type="submit">Save Form</button>
            </form>
        </div>
    );
};

export default DynamicForm;
