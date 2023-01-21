import { useState, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';
import api from '../utils/api';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CreateUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import EmailContainer from './EmailContainer';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubscribePopupOpen, setIsSubscribePopupOpen] = useState(false);
  const [isSubscribeSuccessful, setIsSubscribeSuccessful] = useState(false);
  const [registerFormValues, setRegisterFormValues] = useState({
    email: '',
    password: '',
  });
  const [loginFormValues, setLoginFormValues] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  // const [userEmail, setUserEmail] = useState({ email: '' });
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    api.getUserData().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsSubscribePopupOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about }).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(url) {
    api.setUserAvatar(url).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    });
  }

  function handleAddPlaceSubmit({ placeName, imageLink }) {
    api.addCard({ name: placeName, link: imageLink }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.keyCode === 27) {
        closeAllPopups();
      }
    };
    window.addEventListener('keydown', handleEscClose);

    return () => window.removeEventListener('keydown', handleEscClose);
  }, []);

  function enableValidation(e, inputRef, errorRef) {
    let isValid = false;
    if (!e.target.validity.valid) {
      inputRef.current.className = 'popup__input popup__input_type_error';
      errorRef.current.textContent = inputRef.current.validationMessage;
      errorRef.current.className = 'popup__error popup__error_visible';
      isValid = false;
    } else {
      inputRef.current.className = 'popup__input';
      errorRef.current.textContent = '';
      errorRef.current.className = 'popup__error';
      isValid = true;
    }
    return isValid;
  }

  function resetValidation(inputRef, errorRef) {
    inputRef.current.className = 'popup__input';
    errorRef.current.textContent = '';
    errorRef.current.className = 'popup__error';
  }

  useEffect(() => {
    const handleClickOutside = (evt) => {
      if (
        !evt.target.closest('.popup__container') &&
        evt.target.tagName !== 'IMG' &&
        evt.target.tagName !== 'BUTTON'
      ) {
        closeAllPopups();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    api.getInitialCards().then((initialCards) => {
      setCards(initialCards);
    });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((deletedCard) => {
      setCards((state) => state.filter((c) => c._id !== deletedCard));
      closeAllPopups();
    });
  }

  function handleRegisterFormChange(event) {
    const { name, value } = event.target;
    setRegisterFormValues({ ...registerFormValues, [name]: value });
  }

  function handleSubscribeClick(e) {
    e.preventDefault();
    auth
      .register(registerFormValues)
      .then((res) => {
        setIsSubscribeSuccessful(true);
      })
      .then((res) => setIsSubscribePopupOpen(true))
      .catch((err) => {
        console.log(err);
        setIsSubscribeSuccessful(false);
        setIsSubscribePopupOpen(true);
      });
  }

  function handleLoginFormChange(event) {
    const { name, value } = event.target;
    setLoginFormValues({ ...loginFormValues, [name]: value });
  }

  function handleLoginClick(e) {
    e.preventDefault();
    auth
      .login(loginFormValues)
      .then((res) => setIsLoggedIn(true))
      .then((res) => history.push('/'))
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.verifyToken(token).then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setIsLoggedIn(true);
          history.push('/');
        }
      });
    }
  }, [history]);

  function handleSignOutClick() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    history.push('/signin');
  }

  return (
    <Switch>
      <Route path='/signup'>
        <div className='page'>
          <Header>
            <Link to='signin' className='header__link'>
              Faça o login
            </Link>
          </Header>
          <Register
            handleChange={handleRegisterFormChange}
            values={registerFormValues}
            handleSubmit={handleSubscribeClick}
          />
          <InfoTooltip
            success={isSubscribeSuccessful}
            isOpen={isSubscribePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </Route>
      <Route path='/signin'>
        <div className='page'>
          <Header>
            <Link to='signin' className='header__link'>
              Entrar
            </Link>
          </Header>
          <Login
            handleChange={handleLoginFormChange}
            values={loginFormValues}
            handleSubmit={handleLoginClick}
          />
          <Footer />
        </div>
      </Route>
      <ProtectedRoute isLoggedIn={isLoggedIn} path='/'>
        <>
          <CreateUserContext.Provider value={currentUser}>
            <div className='page'>
              <EmailContainer />
              <Header>
                <div className='header__email-container'>
                  <p className='header__email'>{userEmail}</p>
                  <button className='header__link' onClick={handleSignOutClick}>
                    Sair
                  </button>
                </div>
              </Header>
              <Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
              ></Main>
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                enableValidation={enableValidation}
                resetValidation={resetValidation}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                enableValidation={enableValidation}
                resetValidation={resetValidation}
              />
              <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                enableValidation={enableValidation}
                resetValidation={resetValidation}
              />
              <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
              />
              <ConfirmDeletePopup
                card={selectedCard}
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                onDeleteSubmit={handleCardDelete}
              />
              <Footer />
            </div>
          </CreateUserContext.Provider>
        </>
      </ProtectedRoute>
    </Switch>
  );
}

export default App;
