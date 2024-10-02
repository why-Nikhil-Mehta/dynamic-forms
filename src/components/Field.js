import React from 'react';

export const TextInput = ({ field, value, handleChange, errorMessage }) => (
  <div className="form-group">
    <label style={{ paddingBottom: "10px" }}>{field.label} <span className='mandatory'>{field.required && '  *'}</span></label>
    <input
      type="text"
      name={field.name}
      placeholder={field.placeholder || field.default || ''}
      value={value || field.default || ''}
      onChange={handleChange}
      required={field.required}
    />
    {field.errorMessage && <p className="error-message">{field.errorMessage}</p>}
  </div>
);

export const TextArea = ({ field, value, handleChange, errorMessage }) => (
  <div className="form-group">
    <label style={{ paddingBottom: "10px" }}>{field.label}<span className='mandatory'>{field.required && '  *'}</span></label>
    <textarea
      name={field.name}
      placeholder={field.placeholder || field.default || ''}
      value={value || field.default || ''}
      onChange={handleChange}
      required={field.required}
    />
    {field.errorMessage && <p className="error-message">{field.errorMessage}</p>}
  </div>
);

export const Dropdown = ({ field, value, handleChange, errorMessage }) => (
  <div className="form-group">
    <label style={{ paddingBottom: "10px" }}>{field.label}<span className='mandatory'>{field.required && '  *'}</span></label>
    <select
      name={field.name}
      value={value || field.default || ''}
      onChange={handleChange}
      required={field.required}
    >
      <option value="" disabled>{field.placeholder || 'Select an option'}</option>
      {field.options.map((option, idx) => (
        <option key={idx} value={option}>{option}</option>
      ))}
    </select>
    {field.errorMessage && <p className="error-message">{field.errorMessage}</p>}
  </div>
);

export const RadioGroup = ({ field, value, handleChange, errorMessage }) => (
  <div className="form-group">
    <label style={{ paddingBottom: "10px" }}>{field.label}{<span className='mandatory'>{field.required && '  *'}</span>}</label>
    {field.options.map((option, idx) => (
      <label style={{ padding: "5px 0px" }} key={idx}>
        <input
          type="radio"
          name={field.name}
          value={option.value}
          checked={value === option.value || field.default === option.value}
          onChange={handleChange}
          required={field.required}
          style={{ marginRight: "5px" }}
        />
        {option.label}
      </label>
    ))}
    {field.errorMessage && <p className="error-message">{field.errorMessage}</p>}
  </div>
);

export const CheckboxGroup = ({ field, value = [], handleChange, errorMessage }) => (
  <div className="form-group">
    <label style={{ paddingBottom: "10px" }}>{field.label} <span className='mandatory'>{field.required && '  *'}</span></label>
    {field.options.map((option, idx) => (
      <label style={{ padding: "5px 0px" }} key={idx}>
        <input
          type="checkbox"
          name={field.name}
          value={option.value}
          checked={value.includes(option.value)}
          onChange={handleChange}
          style={{ marginRight: "5px" }}
        />
        {option.label}
      </label>
    ))}
    {field.errorMessage && <p className="error-message">{field.errorMessage}</p>}
  </div>
);

export const Slider = ({ field, value, handleChange, errorMessage }) => (
  <div className="form-group">
    <label style={{ paddingBottom: "10px" }}>{field.label} <span className='mandatory'>{field.required && '  *'}</span> </label>
    <input
      type="range"
      name={field.name}
      min={field.min}
      max={field.max}
      step={field.step}
      value={value || field.min}
      onChange={handleChange}
      required={field.required}
    />
    <span>  {value || field.min} </span>
    {field.errorMessage && <p className="error-message">{field.errorMessage}</p>}
  </div>
);

export const NumberInput = ({ field, value, handleChange, errorMessage }) => (
  <div className="form-group">
    <label style={{ paddingBottom: "10px" }}>{field.label}<span className='mandatory'>{field.required && '  *'}</span></label>
    <input
      type="number"
      name={field.name}
      placeholder={field.placeholder}
      min={field.min}
      max={field.max}
      value={value || field.default || ''}
      onChange={handleChange}
      required={field.required}
    />
    {field.errorMessage && <p className="error-message">{field.errorMessage}</p>}
  </div>
);

