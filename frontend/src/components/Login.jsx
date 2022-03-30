import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import GlobalStyle from '../globalStyles';
import BackgroundImage from '../images/blueSwoosh.png';
import MainImage from '../images/main-image.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isloggedIn, setIsLoggedIn] = useState(false);

  const userSchema = yup
    .object()
    .shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = () => {
    const loginInfo = {
      email,
      password,
    };

    // Need to figure out authorization flow here with useContext instead of Redux

    // const navigate = useNavigate();

    // // If logging in is successful
    // const redirect = () => {
    //   navigate('/user');
    // };

    //   dispatch(signin(loginInfo, () => {
    // redirect()
    //   }));

    console.log(loginInfo);

    // Set inputs back to blank after form submission;
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <LeftSideWrapper>
        <GlobalStyle />
        <Header>slackers</Header>
        <Underline />
        <Text>where those who slack go to chat</Text>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            type="email"
            {...register('email', { required: true })}
            placeholder="email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
          />
          <Input
            type="password"
            {...register('password', { required: true })}
            placeholder="password"
            value={password}
            onChange={(e) => {
              handlePasswordChange(e);
            }}
          />
          <LoginBtn as="button" type="submit">
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
  background: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  @media (max-width: 500px) {
    display: block;
  }
`;

const LeftSideWrapper = styled.div`
  width: 50%;
  min-width: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 550px) {
    width: 100%;
    padding: 4rem 2rem;
  }
`;

const RightSideWrapper = styled.div`
  width: 50%;
  box-sizing: border-box;
  @media (max-width: 400px) {
    display: none;
  }
`;

const Header = styled.header`
  padding-bottom: 1rem;
  margin-top: -3rem;
  font-size: 6.6rem;
  font-weight: 600;
  text-align: left;
  transition: 0.4s;
  @media (max-width: 1100px) {
    font-size: 4.5rem;
    margin-top: 3rem;
  }
  @media (max-width: 900px) {
    font-size: 4rem;
    margin-top: 3rem;
  }
  @media (max-width: 700px) {
    font-size: 3.5rem;
  }
  @media (max-width: 600px) {
    font-size: 3rem;
  }
}
@media (max-width: 500px) {
  margin-top:  1rem;
}
`;

const Underline = styled.hr`
  background-color: rgba(60, 21, 214);
  opacity: 50%;
  border: none;
  width: 50%;
  margin-top: -3rem;
  margin-bottom: 0.2rem;
  height: 0.5rem;
  box-sizing: border-box;
  transition: 0.4s;
  @media (max-width: 1100px) {
    margin-top: -2.2rem;
    width: 65%;
  }
  @media (max-width: 900px) {
    width: 60%;
    margin-top: -2.3rem;
  }
  @media (max-width: 750px) {
    width: 70%;
    margin-top: -2rem;
  }
  @media (max-width: 500px) {
    width: 50%;
    margin-top: -1.9rem;
  }
`;

const Text = styled.p`
  margin-bottom: 2rem;
  font-size: 1.3rem;
  font-style: italic;
  text-align: center;
  padding: 0 2rem;
  @media (max-width: 1000px) {
    font-size: 1rem;
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

const ImageBox = styled.img`
  padding: 5rem 4rem 5rem 0;
  max-width: 650px;
  box-sizing: border-box;
  transition: 0.4s;
  @media (max-width: 1250px) {
    max-width: 550px;
  }
  @media (max-width: 1100px) {
    max-width: 450px;
  }
  @media (max-width: 900px) {
    max-width: 400px;
  }
  @media (max-width: 900px) {
    max-width: 400px;
  }
  @media (max-width: 900px) {
    max-width: 400px;
  }
  @media (max-width: 700px) {
    max-width: 300px;
  }
  @media (max-width: 500px) {
    display: none;
  }
}
`;

export default Login;
