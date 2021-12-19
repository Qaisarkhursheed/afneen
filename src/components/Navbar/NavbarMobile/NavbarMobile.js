import React, { Component } from "react";
import languageSelector from "../../../styles/images/us.png";
import { NavLink } from "react-router-dom";
import i18n from "../../../i18n";
import Italy from '../italy.svg'
import English from '../british.svg'
import Spanish from '../spain.svg'
import French from '../france.svg'
import Germany from '../germany.svg'
import './NavbarMobile.css';
import { withNamespaces } from "react-i18next";

class NavbarMobile extends Component {
  state = {
    hidden: true,
    transition: false ,
    languages : [
      {
        lang: "en",
        name: "En",
        flag: English,
      },
      {
        lang: "de",
        name: "De",
        flag: Germany,
      },
      {
        lang: "fr",
        name: "Fr",
        flag: French,
      },
      {
        lang: "it",
        name: "It",
        flag:  Italy,
      },
      {
        lang: "es",
        name: "Es",
        flag: Spanish,
      },
    ],
    language: 'en',
  };

 
  handleOpenLanguage= () => {
    this.setState({hidden: false,});
  }
  handleCloseClicked = ()=>{
    this.setState({hidden: true});
  }
  handleLanguageSelected = value => {
    i18n.changeLanguage(value);
    this.setState({language: value, hidden: true});
    this.props.itemClicked();
  };
  handlelistClicked = ()=>{
    // this.setState({transition: true});
    this.props.itemClicked();
  }
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <div>
          <div className={ this.state.hidden ? "hide-language-section": "language-selection-section"}>
            <button
              onClick={()=>this.handleCloseClicked()}
              className="language-selection-close"
            >
              <i className="iconify" data-icon="jam:close"></i>
            </button>
            <div className="language-container">
                
          <div className="list-of-languages">
          <div className="language-heading">Language</div>
            <div className="list">
              <ul>
                {this.state.languages.map(item=> <li className="single-item" key={item.name}
                  onClick={()=>this.handleLanguageSelected(item.lang)}>
                      <span><img src={item.flag}/>{item.name}</span>
                </li>)}
              </ul>
            </div>
          </div>
          </div>
          </div>
        </div>
          <div className="mobile-navbar">
              <ul className="mobile-navbar-menu" >
                <li onClick={this.handlelistClicked}>
                  <NavLink activeClassName="active-link" exact to="/">
                    {t("Home")}
                  </NavLink>
                </li>
                <li onClick={this.handlelistClicked}>
                  <NavLink activeClassName="active-link" exact to="/browse-restaurant">
                  {t("Browse Restaurant")}
                  </NavLink>
                </li>
                <li onClick={this.handlelistClicked}>
                  <NavLink
                    activeClassName="active-link"
                    exact
                    to="/restaurant-signup"
                  >
                    {t("Restaurant Signup")}
                  </NavLink>
                </li>
                <li onClick={this.handlelistClicked}>
                  <NavLink activeClassName="active-link" exact to="/contact">
                  {t("Contact")}
                  </NavLink>
                </li>
                {this.props.isAuthenticated ?
                <>
                <li onClick={this.handlelistClicked}>
                  <NavLink activeClassName="active-link" exact to="/profile">
                  <i className="fa fa-user" aria-hidden="true"></i> {this.props.username}
                  </NavLink>
                </li>
                <li onClick={this.handlelistClicked}>
                  <span  onClick={()=>{this.props.logout()}}>
                  Sign Out
                  </span>
                </li>
                </> 
                : 
                <li onClick={this.handlelistClicked}>
                <NavLink activeClassName="active-link" exact to="/signup">
                {t("Login & Signup")}
                </NavLink>
              </li>
                }
                <li className="language-selection">
                  <button onClick={()=>this.handleOpenLanguage()} className="language-button">
                    <img src={languageSelector} alt="lang" />
                    <span className="selected-language">{this.state.language}</span>
                  </button>
                </li>
              </ul>
            </div>
      </React.Fragment>
    );
  }
}
export default withNamespaces()(NavbarMobile);
