import React, { Component } from "react";
import logo from "../../styles/images/afneen/logo.svg";
import Mbllogo from "../../styles/images/logo-mobile.png";
import languageSelector from "../../styles/images/us.png";
import HamburgerMenu from "./HamburgerMenu";
import { NavLink, withRouter } from "react-router-dom";
import {Collapse} from 'antd';
import NavbarMobile from "./NavbarMobile/NavbarMobile";
import { connect } from "react-redux";
import { Button, Select } from "antd";
import { asyncActionGenerator, LOGOUT } from "../../redux/actions";
import "./Navbar.css";
import { bindActionCreators } from "redux";
import { withNamespaces } from "react-i18next";
import i18n from "../../i18n";
import Italy from './italy.svg'
import English from './british.svg'
import Spanish from './spain.svg'
import French from './france.svg'
import Germany from './germany.svg'
import LoginModal from "./LoginModal";
import {
  Menu,
  MenuItem,
  MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const logoutActions = asyncActionGenerator(LOGOUT);
class Navbar extends Component {
  state = {
    hidden: true,
    showMobileMenu: false,
    open: false,
    showBurger:false,
    // languages: ["EN", "FR", "DE", "IT", "ES"],
    showLogin: false,
    languages : [
      {
        lang: "en",
        name: "English",
        flag: English,
      },
      {
        lang: "de",
        name: "German",
        flag: Germany,
      },
      {
        lang: "fr",
        name: "French",
        flag: French,
      },
      {
        lang: "it",
        name: "Italian",
        flag:  Italy,
      },
      {
        lang: "es",
        name: "Spanish",
        flag: Spanish,
      },
    ],
    language: "en",
  };
  handleBarClicked = () => {
    this.setState({ showMobileMenu: !this.state.showMobileMenu });
  };
  handleCartClicked = () => {
    this.props.history.push('/cart');
  };
  handleOpenLanguage = () => {
    this.setState({ hidden: false });
  };
  handleCloseClicked = () => {
    this.setState({ hidden: true });
  };
  handleLanguageSelected = (value) => {
    i18n.changeLanguage(value);
    this.setState({ language: value, hidden: true });
  };
  handleProfileClick = () => {
    this.props.history.push("/profile");
  };
  onSelect = value => {
    this.handleLanguageSelected(value)
  }
  onLoginCLicked = () => {
    this.setState({
      showLogin: true
    });
  }
  handleClick() {
    this.setState({
      open: !this.state.open,
      showBurger:!this.state.showBurger
    });

  }
  handleLiClick() {
    this.setState({
      // open: !this.state.open,
      showBurger: !this.state.showBurger
    });

  }
  onCancelCLicked = () => {
    this.setState({
      showLogin: false
    });
  }
  onTakewayClicked = () => {
    this.props.history.push("/");
  }
  render() {
    const { t } = this.props;
    const { Panel } = Collapse;
    return (
      <React.Fragment>
        <div>
          <div
            className={
              this.state.hidden
                ? "hide-language-section"
                : "language-selection-section"
            }
          >
            <button
              onClick={() => this.handleCloseClicked()}
              className="language-selection-close"
            >
              <i className="iconify" data-icon="jam:close"></i>
            </button>
            <div className="language-container">
              <div className="list-of-languages">
                <div className="language-heading">Language</div>
                <div className="list">
                  <ul>
                    {this.state.languages.map((item) => (
                      <li
                        className="single-item"
                        key={item.name}
                        onClick={() => this.handleLanguageSelected(item.lang)}
                      >
                       <span><img src={item.flag}/>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="top-menu-wrapper top-index">
          <div>
          <div className="container">
            <div className="logo-container">
              <NavLink to="/">
                <img src={logo} alt="logo" className="logo logo-desktop" />
                <img src={Mbllogo} alt="logo" className="logo logo-mobile" />
              </NavLink>
            </div>
            <div className="bars-icon-container">
            <div className="bars-icon" onClick={this.handleCartClicked}>
            <i className="fas fa-shopping-cart"></i>
              </div>
              <div className="bars-icon" onClick={this.handleBarClicked}>
              <i className="fas fa-bars"></i>
              </div>
            </div>
            <div className="menu-item-wrapper">
              <ul className="navbar-menu">
                <div className="margin-right-nav">
                <li>
                  <NavLink
                    activeClassName=""
                    exact
                    to="/"
                  >
                      Our Talents
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName=""
                    exact
                    to="/"
                  >
                      How it works
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName=""
                    exact
                    to="/"
                  >
                      Post a job
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName=""
                    exact
                    to="/"
                  >
                    Become a telent
                  </NavLink>
                </li>
                </div>
                <li>
                  <NavLink
                    activeClassName=""
                    exact
                    to="/"
                  >
                    Ar
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName=""
                    exact
                    to="/"
                  >
                    Sign in
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    // activeClassName="active-link"
                    exact
                    to="/restaurant-signup/membership"
                    className="restuarant-signup-nav-button"
                  >
                    Join
                  </NavLink>
                </li>
    
              </ul>
              <div className="clear"></div>
            </div>
          </div>
  
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default (withRouter(withNamespaces()(Navbar)));
