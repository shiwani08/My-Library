import {
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
} from "@ant-design/icons";
// import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} Ravenclaw Library. All Rights Reserved.
        </p>

        <div className="footer-icons">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <TwitterOutlined />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <LinkedinOutlined />
          </a>
          <a href="mailto:ravenclawlibrary@gmail.com" className="footer-link">
            <MailOutlined />
          </a>
        </div>
      </div>

      <p className="footer-quote">
        “Wit beyond measure is man’s greatest treasure.” — Rowena Ravenclaw
        <p>Made With ❤️ by Shiwani!</p>
      </p>
    </footer>
  );
}
