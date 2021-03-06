import React, {Component} from 'react';
import './App.scss';
import {Route, Switch} from 'react-router-dom';
import {router} from '../Router/Index';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {connect} from "react-redux";
import {setLanguage, setToken} from "../Redux/Actions/Main";
import ChangeLanguage from "./Containers/ChangeLanguage";
import Registration from "./Containers/Registration";
import Authorization from "./Containers/Authorization";

class App extends Component {
	componentDidMount() {
		const
				tokenLocalStorage = JSON.parse(localStorage.getItem('token')),
				tokenState = this.props.token;

		console.log(tokenLocalStorage);
		// console.log(tokenState);
	}

	render() {
		return (
				<div className="body container">
					<Header/>

					<div className="body__inner">
						{this.props.firstLaunch ? <ChangeLanguage/> :
								this.props.token ?
										<Switch>
											{router.map((props, index) => <Route key={index} {...props}/>)}
										</Switch>
										:
										<Switch>
											{/*<Registration/>*/}
											<Route exact={true} path={"/"} component={Authorization}/>
											<Route path={"/registration"} component={Registration}/>
										</Switch>
						}
					</div>

					<Footer/>
				</div>
		);
	}
}

const mapStateToProps = state => ({
	firstLaunch: state.main.firstLaunch,
	language: state.main.language,
	dictionary: state.main.dictionary,
	token: state.main.token,
});

const mapDispatchToProps = {
	setLanguage,
	setToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
