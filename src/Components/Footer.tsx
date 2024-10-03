const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>Powered by Coingecko Api</p>
      <p className="copyright">All right reserved &copy; {year}</p>
    </footer>
  );
};

export default Footer;
