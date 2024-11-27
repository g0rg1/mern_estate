import "./footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContent">
        {/* Support Section */}
        <div className="footerSection">
          <h3>Support</h3>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">AirCover</a>
            </li>
            <li>
              <a href="#">Safety information</a>
            </li>
            <li>
              <a href="#">Supporting people with disabilities</a>
            </li>
            <li>
              <a href="#">Cancellation options</a>
            </li>
            <li>
              <a href="#">Report a neighborhood concern</a>
            </li>
          </ul>
        </div>

        {/* Community Section */}
        <div className="footerSection">
          <h3>Community</h3>
          <ul>
            <li>
              <a href="#">Airbnb.org: disaster relief</a>
            </li>
            <li>
              <a href="#">Support Afghan refugees</a>
            </li>
            <li>
              <a href="#">Combating discrimination</a>
            </li>
          </ul>
        </div>

        {/* Hosting Section */}
        <div className="footerSection">
          <h3>Hosting</h3>
          <ul>
            <li>
              <a href="#">Try hosting</a>
            </li>
            <li>
              <a href="#">AirCover for Hosts</a>
            </li>
            <li>
              <a href="#">Explore hosting resources</a>
            </li>
            <li>
              <a href="#">Visit our community forum</a>
            </li>
            <li>
              <a href="#">How to host responsibly</a>
            </li>
          </ul>
        </div>

        {/* Airbnb Section */}
        <div className="footerSection">
          <h3>Airbnb</h3>
          <ul>
            <li>
              <a href="#">Newsroom</a>
            </li>
            <li>
              <a href="#">Learn about new features</a>
            </li>
            <li>
              <a href="#">Letter from our founders</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Investors</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottomBar">
        <div className="bottomContent">
          <div className="leftContent">
            <p>© 2024 Airbnb, Inc.</p>
            <ul>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Sitemap</a>
              </li>
              <li>
                <a href="#">Company details</a>
              </li>
            </ul>
          </div>

          <div className="rightContent">
            <div className="language">
              <FaGlobe />
              <a href="#">English (US)</a>
            </div>
            <div className="currency">
              <span>$</span>
              <a href="#">USD</a>
            </div>
            <div className="socialLinks">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
