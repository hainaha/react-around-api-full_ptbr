function Footer() {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <>
      <footer className="footer">
        <p className="footer__text">&copy; {year} Around The U.S.</p>
      </footer>
    </>
  );
}

export default Footer;
