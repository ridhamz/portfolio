import React, { useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/formElements/input';
import Button from '../../shared/components/formElements/button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';
import ImageUpload from '../../shared/components/formElements/imageUpload';
import './newPlace.css';




const NewPlace = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }

    }, false)

    const history = useHistory();

    const placeSubmitHandler = async e => {
        e.preventDefault();
        const { title, description, address, image } = formState.inputs;
        try {
            const formData = new FormData();
            formData.append('title', title.value);
            formData.append('description', description.value);
            formData.append('address', address.value);
            formData.append('creator', auth.userId);
            formData.append('image', image.value);
            console.log(formData)
            await sendRequest(
                process.env.REACT_APP_API_URL + '/places',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            )
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Fragment>
            {error && <ErrorModal error={error} onClear={clearError} />}
            <form className='place-form' onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id='title'
                    element='input'
                    type='text'
                    label='Title'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid title.'
                    onInput={inputHandler}
                />
                <Input
                    id='description'
                    element='textarea'
                    label='Description'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='Please enter a valid descrtiption (at last 5 charachter ).'
                    onInput={inputHandler}
                />
                <Input
                    id='address'
                    element='input'
                    label='Address'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid adress.'
                    onInput={inputHandler}
                />
                <ImageUpload
                    id='image'
                    onInput={inputHandler}
                />
                <Button
                    type='submit'
                    disabled={!formState.isValid}
                >
                    ADD PLACE
            </Button>
            </form>
        </Fragment>
    );
}

export default NewPlace;