// src/components/renderField.js
import React from 'react';
import { TextInput, TextArea, Dropdown, RadioGroup, CheckboxGroup, Slider, NumberInput } from './Field';

/**
 * A function to render form fields based on the field type.
 * @param {object} field - The field object from JSON structure.
 * @param {string|number|array} value - The current value of the field.
 * @param {function} handleChange - The function to handle input change.
 * @param {object} errors - Error messages for the field, if any.
 */
const renderField = (field, value, handleChange, errorMessage) => {
  switch (field.type) {
    case 'text':
      return (
        <TextInput
          field={field}
          value={value}
          handleChange={(e) => handleChange(e, field)}
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
          handleChange={(e) => handleChange(e, field)}
          errorMessage={field.errorMessage}
        />
      );
    default:
      return null;
  }
};

export default renderField;
