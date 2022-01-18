import React, { useContext, useState, useEffect, Fragment } from 'react';
import './updateProject.css';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { useForm } from '../../../shared/hooks/form-hook';
import LoadingSpinner from '../../../shared/components/uiElements/LoadingSpinner';
import { VALIDATOR_REQUIRE } from '../../../shared/utils/validator';
import Input from '../../../shared/components/formElements/input';
import ImageUpload from '../../../shared/components/formElements/imageUpload';
import Button from '../../../shared/components/formElements/button';
import ErrorModal from '../../../shared/components/uiElements/ErrorModal';
import Card from '../../../shared/components/uiElements/card';

const UpdateProject = ({projectId}) => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedProject, setLoadedProject] = useState({});
    const [link, setLink] = useState('');
    const [formState, inputHandler, setFormData] = useForm({
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

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_API_URL}/project/${projectId}`
                );
                setLoadedProject(responseData.project);
                setFormData({
                    title: {
                        value: responseData.project.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.project.description,
                        isValid: true
                    },
                    video: {
                        value: responseData.project.video,
                        isValid: true
                    },
                    image: {
                        value: responseData.project.image,
                        isValid: true
                    },
                    technologies: {
                        value: responseData.project.technologies,
                        isValid: true
                    },
                    githubLink: {
                        value: responseData.project.githubLink,
                        isValid: true
                    },
                    link: {
                        value: responseData.project.link,
                        isValid: true
                    },
                }, true)

            } catch (err) { }
        }

        fetchProject();
    }, [sendRequest, projectId, setFormData])

    const updateSubmitHandler = async e => {
        e.preventDefault();
        const { title, description, video, image, githubLink, technologies } = formState.inputs;
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('description', description.value);
        formData.append('video', video.value);
        formData.append('image', image.value);
        formData.append('githubLink', githubLink.value);
        formData.append('technologies', technologies.value)
        formData.append('link', link.value);
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
            <Card className='updateproject'>
                {isLoading && <LoadingSpinner asOverlay />}
                <form onSubmit={updateSubmitHandler}>

                    <ImageUpload
                        id="image"
                        onInput={inputHandler}
                        initialValue={loadedProject.image}
                        errorText='Please provide an image'
                        center />

                    <Input
                        id='title'
                        element='input'
                        type='text'
                        label='Project Title'
                        initialValue={loadedProject.title}
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                    />
                    <Input
                        id='description'
                        element='input'
                        type='text'
                        label='Description'
                        initialValue={loadedProject.description}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Please enter description.'
                        onInput={inputHandler}
                    />
                    <Input
                        id='video'
                        element='input'
                        type='text'
                        label='Video link'
                        initialValue={loadedProject.video}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText='Error.'
                        onInput={inputHandler}
                    />

                    <Input
                        id='technologies'
                        element='input'
                        type='text'
                        label='Technologies used'
                        initialValue={loadedProject.technologies}
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
                        initialValue={loadedProject.githubLink}
                        errorText='Please enter githublink.'
                        onInput={inputHandler}
                    />
                    <input
                        style={{ width: '100%', border: '1px solid #ccc', background: '#f8f8f8', padding: '0.30rem 0.25rem', margin: '5px auto' }}
                        type='text'
                        name='link'
                        initialValue={loadedProject.link}
                        value={link}
                        onChange={(e) => setLink(e.value)}
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

export default UpdateProject;