import React, { Fragment, useContext, useState } from 'react';
import ErrorModal from '../../../shared/components/uiElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/uiElements/LoadingSpinner';
import Input from '../../../shared/components/formElements/input';
import ImageUpload from '../../../shared/components/formElements/imageUpload';
import Button from '../../../shared/components/formElements/button';
import Card from '../../../shared/components/uiElements/card';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { useForm } from '../../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../../shared/utils/validator';
import './addProject.css'
import { AuthContext } from '../../../shared/context/auth-context';

const AddProjet = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [link, setLink] = useState('');
    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        video: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        },
        technologies: {
            value: '',
            isValid: false
        },
        githubLink: {
            value: '',
            isValid: true
        }
    }, false)

    const authSubmitHandler = async e => {
        e.preventDefault();
        const { title, description, video, image, githubLink, technologies } = formState.inputs;
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('description', description.value);
        formData.append('video', video.value);
        formData.append('image', image.value);
        formData.append('githubLink', githubLink.value);
        formData.append('technologies', technologies.value)
        formData.append('link', link);
        try {
            await sendRequest(process.env.REACT_APP_API_URL + '/projects',
                'POST',
                formData,
                { Authorization: 'Bearer ' + auth.token }
            )
        } catch (err) { }
    }
    return (
        <Fragment>
            {error && <ErrorModal error={error} onClear={clearError} />}
            <Card className='addproject'>
                {isLoading && <LoadingSpinner asOverlay />}
                <form onSubmit={authSubmitHandler}>

                    <ImageUpload
                        id="image"
                        onInput={inputHandler}
                        errorText='Please provide an image'
                        center />

                    <Input
                        id='title'
                        element='input'
                        type='text'
                        label='Project Title'
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        id='description'
                        element='input'
                        type='text'
                        label='Description'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter description.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='video'
                        element='input'
                        type='text'
                        label='Video link'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Error.'
                        onInput={inputHandler}
                    />

                    <Input
                        id='technologies'
                        element='input'
                        type='text'
                        label='Technologies used'
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Error.'
                        onInput={inputHandler}
                    />

                    <Input
                        id='githubLink'
                        element='input'
                        type='text'
                        label='Github link'
                        validators={[]}
                        errorText='Please enter githublink.'
                        onInput={inputHandler}
                    />
                    <input
                        style={{ width: '100%', border: '1px solid #ccc', background: '#f8f8f8', padding: '0.30rem 0.25rem', margin: '5px auto' }}
                        type='text'
                        name='link'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <Button
                        type='submit'
                        disabled={!formState.isValid}
                    >
                        ADD Project
                    </Button>
                </form>
            </Card>
        </Fragment>
    );
}

export default AddProjet;