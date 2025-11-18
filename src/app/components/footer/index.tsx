import {
  TwitterOutlined,
  LinkedinOutlined,
  MailOutlined,
  GithubOutlined,
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
          <a href="mailto:shiwani.sonii08@gmail.com" className="footer-link">
            <MailOutlined />
          </a>
          <a
            href="https://github.com/shiwani08"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <GithubOutlined />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <LinkedinOutlined />
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
