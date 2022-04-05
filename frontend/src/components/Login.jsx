import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import GlobalStyle from '../globalStyles';
import BackgroundImage from '../images/blueSwoosh.png';
import MainImage from '../images/main-image.png';
import { loginUser, useAuthState, useAuthDispatch } from '../context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userSchema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useAuthDispatch(); // gets the dispatch method from the useDispatch custom hook in the context file
  const { loading, errorMessage } = useAuthState(); // read the values of loading and errorMessage (state variables)

  const history = useHistory();

  //This is supposed to prevent an error when pressing return before pressing submit//
  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const handleFormSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const response = await loginUser(dispatch, { email, password });
      console.log(response); // loginUser action makes the request and handles all the neccessary state changes

      // Set inputs back to blank after form submission;
      setEmail('');
      setPassword('');

      if (!response) return;
      // if user found - navigate to user dashboard
      history.push('/user');
    } catch (error) {
      console.log(error);
    }
  };

  // For error messages, so they don't persist
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  useEffect(() => {
    // message is empty (meaning no errors). Adjust as needed
    if (!errors.email) {
      setEmailErr(false);
      return;
    }
    // error exists. Display the message and hide after 4 secs
    setEmailErr(true);
    const timer = setTimeout(() => {
      setEmailErr(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [errors]); // executes every time `message` changes. Adjust as needed

  useEffect(() => {
    if (!errors.password) {
      setPassErr(false);
      return;
    }
    setPassErr(true);
    const timer = setTimeout(() => {
      setPassErr(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [errors]); // executes every time `message` changes. Adjust as needed

  return (
    <Container>
      <LeftSideWrapper>
        <GlobalStyle />
        <Header>slackers</Header>
        {errorMessage ? <ErrorMsg>{errorMessage}</ErrorMsg> : null}
        <Underline />
        <Text>where those who slack go to chat</Text>
        <Form onSubmit={handleSubmit(handleFormSubmit)} onKeyDown={(e) => checkKeyDown(e)}>
          <Input
            {...register('email', { required: true })}
            placeholder="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
          {emailErr ? (
            <ErrorInput>Please enter a valid email</ErrorInput>
          ) : null}
          <Input
            {...register('password', { required: true })}
            placeholder="password"
            value={password}
            type="password"
            onChange={(e) => {
              handlePasswordChange(e);
            }}
          />
          {passErr ? <ErrorInput>Password is incorrect</ErrorInput> : null}
          <LoginBtn as="button" type="submit" disabled={loading}>
            Login
          </LoginBtn>
        </Form>
      </LeftSideWrapper>

      <RightSideWrapper>
        <ImageBox src={MainImage} alt="people conversing" />
      </RightSideWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
  background: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
`;

const LeftSideWrapper = styled.div`
  width: 45%;
  min-width: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 1000px) {
    width: 100%;
    padding-top: 2rem;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const RightSideWrapper = styled.div`
  width: 55%;
  box-sizing: border-box;
  @media (max-width: 1000px) {
    width: 0%;
  }
`;

const Header = styled.header`
  padding-bottom: 1rem;
  margin-top: -3rem;
  font-size: 6.6rem;
  font-weight: 600;
  text-align: left;
  transition: 0.4s;
  @media (max-width: 1200px) {
    font-size: 5.5rem;
  }
  @media (max-width: 1000px) {
    font-size: 4.8rem;
    margin-top: -4rem;
  }
  @media (max-width: 500px) {
    font-size: 4rem;
    margin-top: -4rem;
  }
`;

const Underline = styled.hr`
  background-color: rgba(60, 21, 214);
  opacity: 50%;
  border: none;
  width: 65%;
  margin-top: -3rem;
  margin-bottom: 1.5rem;
  height: 0.5rem;
  box-sizing: border-box;
  transition: 0.4s;
  @media (max-width: 1250px) {
    margin-top: -2.5rem;
    width: 75%;
  }
  @media (max-width: 1000px) {
    width: 40%;
    margin-top: -2rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 900px) {
    margin-top: -2rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 800px) {
    margin-top: -2rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 700px) {
    width: 50%;
    margin-top: -2rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 700px) {
    width: 55%;
    margin-top: -2rem;
    margin-bottom: 1rem;
  }
`;

const Text = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  @media (max-width: 1200px) {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
  @media (max-width: 1000px) {
    font-size: 1rem;
    margin: 1rem 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 8rem;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5rem;
  font-style: italic;
  letter-spacing: 0.3px;
  background: #dfdef9;
  border: none;
  border-radius: 8px;
  width: 12rem;
`;

const LoginBtn = styled.button`
  background-color: #1e1926;
  margin-top: 2rem;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 10rem;
  padding: 0.6rem 3.5rem;
  border: none;
  border-radius: 10px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background-color: #b7a2d7;
  }
`;

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
  margin: 1rem;
`;

const ErrorInput = styled.p`
  color: red;
  text-align: center;
`;
const ImageBox = styled.img`
  padding: 5rem 4rem 5rem 0;
  height: calc(100% - 100px);
  box-sizing: border-box;
  padding-right: 5rem;
  max-width: 90%;
  transition: 0.4s;
  @media (max-width: 1300px) {
    height: calc(95% - 100px);
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

export default Login;
