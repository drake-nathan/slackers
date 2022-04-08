import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ReactDom from 'react-dom';
import { useAuthDispatch, logout } from '../../../context';
import GlobalStyles from '../../../globalStyles';

function Menu({ setAway }) {
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const username =
    JSON.parse(localStorage.getItem('currentUser')).user.name || '';

  const handleLogout = () => {
    logout(dispatch);
    history.push('/');
  };

  const handleAway = () => {
    setAway(true);
  };

  const handleActive = () => {
    setAway(false);
  };

  return ReactDom.createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <Backdrop>
      <GlobalStyles />
      <Container>
        <Name>{username}</Name>
        <BtnAway onClick={handleAway}>Set as away</BtnAway>
        <BtnActive onClick={handleActive}>Set as active</BtnActive>
        <Button onClick={handleLogout}>Logout</Button>
      </Container>
    </Backdrop>,
    document.getElementById('portal')
  );
}

const Backdrop = styled.div`
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  top: 40px;
  right: 20px;
  min-width: 250px;
  border-radius: 10px;
  background-color: #1e1926;
  color: white;
  box-sizing: border-box;
  z-index: 999;
`;

const Button = styled.button`
  margin-top: 4rem;
  margin-bottom: 1rem;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.6px;
  width: 90%;
  padding: 0.6rem 3.5rem;
  border-radius: 10px;
  background-color: #0063b2;
  border: none;
  outline: none;
  box-shadow: none;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: pointer;
  transform: 0.4s ease-out;
  &:hover {
    background-color: #b7a2d7;
  }
`;

const Name = styled.p`
  font-weight: 700;
  color: white;
  padding: 1rem;
  text-align: center;
  margin: 0 auto;
  overflow-wrap: break-word;
`;

const BtnAway = styled.button`
  color: white;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 90%;
  padding: 0.6rem 2rem;
  border-radius: 10px;
  margin-top: 1rem;
  background-color: transparent;
  border: 1px solid darkgrey;
  outline: none;
  box-shadow: none;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: pointer;
  transform: 0.4s ease-out;
  &:hover {
    border: 3px solid darkgrey;
  }
`;

const BtnActive = styled.button`
  color: white;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 90%;
  padding: 0.6rem 2rem;
  margin-top: 2rem;
  border-radius: 10px;
  background: transparent;
  border: 1px solid #48b300;
  outline: none;
  box-shadow: none;
  text-transform: uppercase;
  box-sizing: border-box;
  cursor: pointer;
  transform: 0.4s ease-out;
  &:hover {
    border: 3px solid #48b300;
  }
`;

export default Menu;
