import React, { Component } from "react";
import bootstrap, {
  Col,
  Container,
  Row,
  Image,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import footericon from "./images/footericon.png";
import { useLocation } from "react-router-dom";

class Footer extends Component {
  state = {
    show: true,
    path: "",
  };

  checkPath() {
    this.setState({ path: window.location.href });
    console.log(this.state.path);
  }

  componentDidMount() {
    this.checkPath();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.path !== this.state.path) {
      this.checkPath();
    }
  }

  render() {
    let show = this.state.show ? "block" : "none";
    return (
      <div className="linkedin-footer" style={{ display: `${show}` }}>
        <Container>
          <Image
            src={footericon}
            style={{
              height: "70px",
              width: "150px",
              bottom: "0",
              display: "flex",
              left: "0",
              marginLeft: "38px",
            }}
          />
          <Row>
            <Col>
              <ul style={{ listStyle: "none", textAlign: "left" }}>
                <li>About</li>
                <li>Community Guidelines</li>
                <li>Privacy Terms </li>
                <li>Sales Solutions</li>
                <li>Safety Center</li>
              </ul>
            </Col>
            <Col>
              <ul style={{ listStyle: "none", textAlign: "left" }}>
                <li>Accessibility</li>
                <li>Careers</li>
                <li>Ad Choices</li>
                <li>Mobile</li>
              </ul>
            </Col>
            <Col>
              <ul style={{ listStyle: "none", textAlign: "left" }}>
                <li>Talent Solutions</li>
                <li>Marketing Solutions</li>
                <li>Advertising</li>
                <li>Small Business</li>
              </ul>
            </Col>
            <Col>
              <ul style={{ listStyle: "none", textAlign: "left" }}>
                <li>
                  <i className="fas fa-question-circle"></i>Questions? <br />
                  <p style={{ color: "Grey", fontSize: "12px" }}>
                    Visit our Help Center.
                  </p>
                </li>
                <li>
                  <i className="fas fa-cog"></i>Manage your account and privacy{" "}
                  <br />
                  <p style={{ color: "Grey", fontSize: "12px" }}>
                    Go to your Settings.
                  </p>
                </li>
              </ul>
            </Col>
            <Col>
              Select Language
              <div className="dropdown">
                <button
                  style={{
                    borderRadius: "0",
                    backgroundColor: "white",
                    color: "black",
                    width: "200px",
                  }}
                  className="btn  dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  English
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Footer;
