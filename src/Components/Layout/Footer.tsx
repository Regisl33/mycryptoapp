const Footer = () => {
  //Get current Year
  const year = new Date().getFullYear();
  //Footer HTML return
  const mainFooter = (
    <footer className="main-footer">
      <p>Powered by Coingecko Api</p>
      <p>All right reserved &copy; {year}</p>
    </footer>
  );

  return mainFooter;
};

export default Footer;
