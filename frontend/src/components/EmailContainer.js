import { useState } from 'react';

function EmailContainer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function showMenu() {
    setIsMenuOpen(true);
  }

  function hideMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className='header__menu'>
        <button
          className='header__menu-button'
          type='button'
          onClick={showMenu}
        ></button>
        <button
          className='popup__close'
          type='button'
          onClick={hideMenu}
        ></button>
      </div>
    </>
  );
}

export default EmailContainer;
