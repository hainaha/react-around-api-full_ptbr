import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
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

  return (
    <Switch>
      <Route path='/login' component={Login}>
        <Login />
      </Route>
      <Route path='/footer'>
        <Footer />
      </Route>
      {/* <Route path='/'>
          <>
            <CreateUserContext.Provider value={currentUser}>
            <div className='page'>
              <Header />
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
        </Route> */}
    </Switch>
  );
}

export default App;
