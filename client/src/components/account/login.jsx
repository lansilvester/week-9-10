import { useState,useContext } from 'react'

import {Box, TextField, Button, styled, Typography} from '@mui/material'

import { API } from '../../service/api'
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 5px 15px 3px rgba(0 0 0/ 0.15)
`
const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`
const LoginButton = styled(Button)`
    text-transform: none;
    background: #2e87fa;
    color: #fff;
    height: 48px;
    border-radius: 3px;
`
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874F0;
    height: 48px;
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%)
`
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`
const loginInitialValues = {
    username: '',
    password: '',
}

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = () => {
    const imageURL = 'https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png';

    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();
    const toggleSignup = () => {
        account === 'signup' ?  toggleAccount('login') : toggleAccount('signup')
    }
    const onInputChange = (e) => {
        setSignup({ ...signup,[e.target.name]: e.target.value});
    }
    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if(response.isSuccess){
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login')
        }else{
            setError('Something went wrong! Please try again later');
        }
    }
    const onValueChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }
    const loginUser = async () => {
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('')
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            
            setAccount({username: response.data.username, name:response.data.name})
            navigate('/');
        }else{
            setError('Something went wrong! Please try again later');
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {
                    account === 'login' ?    
               
                    <Wrapper>
                        <TextField variant="standard" onChange={(e) => onValueChange(e) } value={login.username} name="username" label="Enter Username" />
                        <TextField variant="standard" onChange={(e) => onValueChange(e) } value={login.password} name="password" label="Enter Password" />

                        { error && <Error>{error}</Error>}

                        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <SignupButton onClick={() => toggleSignup()}>Create an account</SignupButton>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField variant="standard" onChange={(e) => onInputChange(e) } name="name" label="Enter Name" />
                        <TextField variant="standard" onChange={(e) => onInputChange(e) } name="username" label="Enter Username" />
                        <TextField variant="standard" onChange={(e) => onInputChange(e) } name="password" label="Enter Password" />
                        
                        { error && <Error>{error}</Error>}
                        <SignupButton onClick={()=> signupUser()}>Signup</SignupButton>
                        <Text style={{textAlign: 'center'}}>OR</Text>
                        <LoginButton variant="contained" onClick={(()=>toggleSignup())}>Already have an account</LoginButton>
                    </Wrapper>
            }
            </Box>
        </Component>
    )
}

export default Login