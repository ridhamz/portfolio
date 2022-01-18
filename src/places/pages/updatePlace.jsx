import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import './updatePlace.css';
import Input from '../../shared/components/formElements/input';
import Button from '../../shared/components/formElements/button';
import Card from '../../shared/components/uiElements/card';
import { useForm } from '../../shared/hooks/form-hook';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/utils/validator';
import ErrorModal from '../../shared/components/uiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/uiElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';



const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const auth = useContext(AuthContext);
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlace, setLoadedPlace] = useState();

    const [formState, inputHandler, setFormData] = useForm({
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
        }
    }, false);


    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_API_URL}/places/${placeId}`
                );
                setLoadedPlace(responseData.place);
                setFormData({
                    title: {
                        value: responseData.place.title,
                        isValid: true
                    },
                    description: {
                        value: responseData.place.description,
                        isValid: true
                    },
                    address: {
                        value: responseData.place.address,
                        isValid: true
                    }
                }, true)

            } catch (err) { }
        }

        fetchPlace();
    }, [sendRequest, placeId, setFormData])

    const placeUpdateSubmitHandler = async e => {
        e.preventDefault();
        const { title, address, description } = formState.inputs;
        try {
            const responseData = await sendRequest(process.env.REACT_APP_API_URL + '/places/' + placeId,
                'PATCH',
                JSON.stringify({
                    title: title.value,
                    description: description.value,
                    address: address.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            setLoadedPlace(responseData.place);
            history.push(`/${auth.userId}/places`);
        } catch (error) {

        }
    }

    if (isLoading) return (
        <div className='center'>
            <LoadingSpinner />
        </div>
    )

    if (!loadedPlace) return (
        <Card>
            <h2>No places found.</h2>
        </Card>
    )

    return (
        <Fragment>
            {error && <ErrorModal error={error} onClear={clearError} />}

            {!isLoading && loadedPlace && <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    initialValue={loadedPlace.title}
                    initialValid={true}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (min. 5 characters)."
                    onInput={inputHandler}
                    initialValue={loadedPlace.description}
                    initialValid={true}
                />
                <Input
                    id="adresse"
                    element="input"
                    label="Adresse"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid adresse."
                    onInput={inputHandler}
                    initialValue={loadedPlace.address}
                    initialValid={true}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    UPDATE PLACE
                    </Button>
            </form>}
        </Fragment>
    );
};

export default UpdatePlace;
