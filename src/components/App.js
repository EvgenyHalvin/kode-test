import { React, useState, useEffect } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

// Импорт компоонентов
import Header from './Header';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import ErrorPopup from './ErrorPopup';
import FullImagePopup from './FullImagePopup';
import Confirmation from './Confirmation';
import FullInfoCard from './FullInfoCard';

// Импорт utils
import api from '../utils/api.js';

// Импорт контекста
import { PocemonFullInfoContext } from '../contexts/pocemonFullInfoContext.js';

function App() {
  const fakeUser = {
    email: 'kode@kode.ru',
    password: 'Enk0deng',
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [authData, setAuthData] = useState({});
  const [cards, setCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [subtypes, setSubtypes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [copyCards, setCopyCards] = useState([]);

  // Для попапов
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [cardInfo, setCardInfo] = useState({});

  // Стэйт для контекста
  const [pokemonFullInfo, setPokemonFullInfo] = useState({});

  // Стэйты лоадеров
  const [isGotItems, setIsGotItems] = useState(false);

  const history = useHistory();
  const { search } = useLocation();

  // Проверка токена
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsConfirmed(true);
      history.replace({ search: search });
      history.push(`/pokemon${search}`);
    } else {
      setIsConfirmed(false);
      history.push('/sign-in');
    }
  }, [history]);

  // Рендер карточек с сервера
  function getCards() {
    setIsGotItems(true);
    api
      .getCards()
      .then((res) => {
        setCards(res.data);
        setCopyCards(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsGotItems(false);
      });
  }

  // Рендер типов
  function getTypes() {
    api
      .getTypes()
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Рендер подтипов
  function getSubtypes() {
    api
      .getSubtypes()
      .then((res) => {
        setSubtypes(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Авторизация и запись токена в LocalStorage(имитация)
  function checkMatch(data) {
    if (JSON.stringify(data) === JSON.stringify(fakeUser)) {
      setAuthData(data);
      setLoggedIn(true);
      history.push('/confirmation');
    } else {
      setIsInfoToolTipOpen(true);
    }
  }

  // Подтверждение по коду из SMS(имитация)
  function checkCode({ code }) {
    const fakeCode = 123456;
    // eslint-disable-next-line eqeqeq
    if (code == fakeCode) {
      setLoggedIn(false);
      setIsConfirmed(true);
      localStorage.setItem(
        'jwt',
        `${authData.email}${authData.password}some_secret_key`
      );
      history.push('/pokemon');
    } else {
      setIsInfoToolTipOpen(true);
    }
  }

  // Выход из системы
  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setIsConfirmed(false);
    setLoggedIn(false);
  }

  // Закрытие любого из попапов
  function closeAllPopups() {
    setIsInfoToolTipOpen(false);
    setIsImagePopupOpen(false);
    setCardInfo({});
  }

  // Изменение значений контекста
  function getPokemonInfo(card) {
    setPokemonFullInfo(card);
  }

  // ФУНКЦИОНАЛЬНОСТЬ ДЛЯ ФИЛЬТРАЦИИ КАРТОЧЕК:
  // Задание опций для фильтрации карточек
  function getSelectedOptions(options) {
    setSelectedOptions(options);
  }

  // Проверка по условиям фильтра
  useEffect(() => {
    setCards(() => {
      return copyCards.filter((item) => {
        if (!selectedOptions.type && !selectedOptions.subtype) {
          return true;
        } else if (
          item.types.includes(selectedOptions.type) &&
          !selectedOptions.subtype
        ) {
          return true;
        } else if (
          !selectedOptions.type &&
          item.subtypes.includes(selectedOptions.subtype)
        ) {
          return true;
        } else if (
          item.types.includes(selectedOptions.type) &&
          item.subtypes.includes(selectedOptions.subtype)
        ) {
          return true;
        }
        return false;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions, search]);

  // Попап быстрого просмотра карточки
  function openFullImagePopup() {
    setIsImagePopupOpen(true);
  }

  function setInfoFullImagePopup(card) {
    setCardInfo(card);
  }

  return (
    <>
      <div className="page">
        <PocemonFullInfoContext.Provider value={pokemonFullInfo}>
          <Header
            signOut={signOut}
            loggedIn={loggedIn}
            isConfirmed={isConfirmed}
          />
          <Switch>
            <Route path="/sign-in">
              <Login checkMatch={checkMatch} />
            </Route>

            <Route path="/confirmation">
              <Confirmation loggedIn={loggedIn} confirm={checkCode} />
            </Route>

            <ProtectedRoute
              path="/pokemon"
              exact
              isConfirmed={isConfirmed}
              component={Main}
              cards={cards}
              types={types}
              subtypes={subtypes}
              getSelectedOptions={getSelectedOptions}
              getPokemonInfo={getPokemonInfo}
              isGotItems={isGotItems}
              setCardInfo={setInfoFullImagePopup}
              openFullImage={openFullImagePopup}
              getCards={getCards}
              getTypes={getTypes}
              getSubtypes={getSubtypes}
            />

            <ProtectedRoute
              path="/pokemon/:name"
              isConfirmed={isConfirmed}
              component={FullInfoCard}
            />
          </Switch>
        </PocemonFullInfoContext.Provider>
      </div>

      <ErrorPopup isOpen={isInfoToolTipOpen} onClose={closeAllPopups} />
      <FullImagePopup
        card={cardInfo}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
