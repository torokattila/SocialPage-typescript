import axios, { AxiosResponse } from 'axios';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { Post } from '../models/Post';

export interface ParamTypes {
    id: string;
}

const ProfileContainer = () => {
    const { id } = useParams<ParamTypes>();
    const [username, setUsername] = useState<string>('');
    const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
    const { authState } = useContext(AuthContext);

    const getUser = async (): Promise<void> => {
        await axios.get(`http://localhost:3001/users/${id}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')!
            }
        })
        .then((response: AxiosResponse) => {
            setUsername(response.data.username);
            setListOfPosts(response.data.posts);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    return {
        username,
        listOfPosts,
        authState,
        getUser
    }
}

export default ProfileContainer;