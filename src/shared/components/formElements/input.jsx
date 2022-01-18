import React, { useReducer, useEffect } from 'react';

import { validate } from '../../utils/validator';
import './input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
}

const Input = ({ id, label, type, placeholder, initialValue, initialValid, rows, element, validators, errorText, onInput }) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue || '',
        isValid: initialValid || false,
        isTouched: false
    });

    const { value, isValid, isTouched } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    const changeHandler = e => {
        dispatch({
            type: 'CHANGE',
            val: e.target.value,
            validators: validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        })
    }

    const Element = element === 'input' ?
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        /> :
        <textarea
            id={id}
            rows={rows || 3}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={value}
        />;
    return (
        <div className={`form-control ${
            !isValid &&
            isTouched &&
            'form-control--invalid'}`
        }>
            <label htmlFor={id}>{label}</label>
            {Element}
            {!isValid && isTouched && <p><small>{errorText}</small></p>}
        </div>
    );
}

export default Input;