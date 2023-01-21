import logo from '../images/logo.svg';

function Header({ children }) {
  return (
    <>
      <header className='header'>
        <img src={logo} className='logo' alt='logo da Around The U.S.' />
        {children}
      </header>
    </>
  );
}

export default Header;
