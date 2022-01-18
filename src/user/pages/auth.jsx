import React, { useContext, Fragment } from 'react';

import './auth.css';
import Card from '../../shared/components/uiElements/card';
import Input from '../../shared/components/formElements/input';
import Button from '../../shared/components/formElements/button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Auth = () => {
    const auth = useContext(AuthContext);
    const { isLoading, sendRequest } = useHttpClient();
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const authSubmitHandler = async e => {
        e.preventDefault();
        console.log(formState.inputs);
        const { email, password } = formState.inputs;
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_API_URL + '/users/login',
                'POST',
                JSON.stringify({
                    email: email.value,
                    password: password.value
                }),
                { 'Content-Type': 'application/json' },
            )
            auth.login(responseData.userId, responseData.token);
        } catch (err) { console.log(err) }

    }



    return (
        <Fragment>
            <Card className='authentication'>
                {isLoading && <LoadingSpinner asOverlay />}
                <h2>Login Required</h2>
                <form onSubmit={authSubmitHandler}>
                    <Input
                        id='email'
                        element='input'
                        type='email'
                        label='E-Mail'
                        validators={[VALIDATOR_EMAIL()]}
                        errorText='Please enter a valid email.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='password'
                        element='input'
                        type='password'
                        label='Password'
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText='Please enter a valid password.'
                        onInput={inputHandler}
                    />
                    <Button
                        type='submit'
                        disabled={!formState.isValid}
                    >
                        LOGIN
                    </Button>
                </form>
            </Card>
        </Fragment>
    );
}

export default Auth;