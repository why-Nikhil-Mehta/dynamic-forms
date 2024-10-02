import React, { useState, useEffect } from 'react';
import renderField from './components/renderField';
import './style.css'; // Import the enhanced CSS

const DynamicForm = ({ jsonStructure }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState(false);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0); // Track the current section
    const [savedData, setSavedData] = useState(null);

    const totalSections = jsonStructure.form.groups.length; // Total number of sections

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

    // Handle input changes
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

        if (field.type === 'number' && field.name === 'graduationYear' && value) {
            if (value < field.min || value > field.max) {
                field.errorMessage = `Graduation year must be between ${field.min} and ${field.max}.`;
            } else {
                field.errorMessage = undefined;
            }
        }

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

    };

    // Handle section navigation
    const handleNext = () => {
        if (!errors) {
            localStorage.setItem('formData', JSON.stringify(formData));
            setCurrentSectionIndex(currentSectionIndex + 1); // Move to next section
        }
    };

    const handleBack = () => {
        if(!errors)
            setCurrentSectionIndex(currentSectionIndex - 1); // Move to previous section
    };

    // Handle form submission (last step)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errors) {
            localStorage.setItem('formData', JSON.stringify(formData));
            alert('Form submitted successfully!');
        }
    };

    const currentSection = jsonStructure.form.groups[currentSectionIndex]; // Get current section

    return (
        <div className="form-container">
            <form>
                <h2>{jsonStructure.form.title}</h2>
                <p>{jsonStructure.form.description}</p>

                {/* Render the fields for the current section */}
                <div className="form-group">
                    <h3 className="group-title">{currentSection.title}</h3>
                    {currentSection.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex}>
                            {renderField(field, formData[field.name], handleChange, errors[field.name])}
                        </div>
                    ))}
                </div>

                {/* Navigation buttons */}
                <div className="form-navigation">
                    {currentSectionIndex > 0 && (
                        <button type="button" onClick={handleBack}>
                            Back
                        </button>
                    )}
                    {currentSectionIndex < totalSections - 1 ? (
                        <button  type="button" onClick={handleNext}>
                            Next
                        </button>
                    ) : (
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default DynamicForm;
