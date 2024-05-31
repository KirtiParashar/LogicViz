import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer>
      {/* Footer content with copyright */}
      <p>&copy; {new Date().getFullYear()} LogicViz. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
