import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import styled, { css, createGlobalStyle } from 'styled-components';
import Header from '../components/Header';
import GlobalStyle from '../components/GlobalStyle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const MainBlock = styled.div`
	background: #f9de4b;
	display: flex;
	justify-content: space-between;
	.leftSide {
		width: 22vw;
	}

	.middleSide {
	}
	.rightSide {
	}
`;

const CenterLogo = styled.div`
	text-align: center;

	img {
		width: 300px;
		padding: 50px 0px 20px 0px;
	}

	.centercontent {
		font-family: 'KOTRAHOPE';
		font-style: normal;
		font-weight: 400;
		font-size: 30px;
		line-height: 30px;
		padding: 0px 0px 70px 0px;
	}
`;

const SignupUI = styled.div`
	.column {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0px 130px 0px 0px;
	}

	.content {
		font-family: 'Cafe24Syongsyong';
		font-style: normal;
		font-weight: 450;
		font-size: 25px;
		line-height: 25px;
		background: #f9de4b;
		text-align: center;
	}

	.content_button {
		padding: 20px;
		text-align: center;
	}
`;

const BigDoran = styled.div`
	.bigDoran {
		height: 700px;
	}
`;

const Input = styled.input`
	width: 250px;
	padding: 10px;
	margin: 5px 10px 5px 10px;
	background: #f9de4b;
	border-radius: 10px;
	border: 2px solid black;
	&:focus {
		background: white;
	}
`;

function Signuppage(props) {
	const [Name, setName] = useState('');
	const [Id, setId] = useState('');
	const [Password, setPassword] = useState('');
	const [ConfirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const StyledContainer = styled(ToastContainer)`
		&&&.Toastify__toast-container {
			bottom: 80px;
			right: 20px;
		}
		.Toastify__toast {
			font-size: 30px;
		}
		.Toastify__toast-body {
			font-family: 'KOTRAHOPE';
			font-style: normal;
			font-size: 24px;
			color: black;
		}
		.Toastify__progress-bar {
		}
	`;

	// const dispatch = useDispatch();

	// handler ?????????
	const onNameHandler = (event) => {
		setName(event.currentTarget.value);
	};

	const onIdHandler = (event) => {
		setId(event.currentTarget.value);
	};

	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value);
	};

	const onConfirmPasswordHandler = (event) => {
		setConfirmPassword(event.currentTarget.value);
	};

	// login ?????? ?????? ?????????
	const onClickLogin = () => {
		console.log('click login');
	};

	const successNotify = () => {
		toast.success('??????????????? ???????????????!', {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 1800,
		});
	};

	const onSubmitHandler = (event) => {
		// ????????? ?????? ???????????? ???????????? ?????? ?????? ??????.
		event.preventDefault();

		if (Password !== ConfirmPassword) {
			return alert('??????????????? ???????????? ????????? ????????? ??????!');
		}

		let data = {
			nickname: Name,
			username: Id,
			password1: Password,
			password2: Password,
		};

		console.log(data);

		axios
			.post('http://3.39.158.98:8080/auth/signup', data)
			.then((res) => {
				console.log(res);
				console.log('???????????????');
				successNotify();
				console.log('????????????');
				setTimeout(function setNavi() {
					navigate('/login');
				}, 1800);
				// navigate("/login");
				//????????? url ?????? ?????????
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<GlobalStyle backColor="yellow" />
			<Header isIcon isLogin backColor="yellow" />
			<MainBlock>
				<div className="leftSide"></div>
				<div className="middleSide">
					<CenterLogo>
						<div className="centerlogo">
							<img className="doranLogo" src="/img/doranlogo.png" />
						</div>
						<div className="centercontent">
							AI ???????????? ??????
							<br />
							?????? ???????????????
						</div>
					</CenterLogo>

					<SignupUI>
						<form onSubmit={onSubmitHandler}>
							<div className="signupform">
								<div className="column">
									<label className="content">??????</label>
									<Input className="input" type="name" value={Name} onChange={onNameHandler} />
								</div>
								<div className="column">
									<label className="content">?????????</label>
									<Input className="input" type="id" value={Id} onChange={onIdHandler} />
								</div>
								<div className="column">
									<label className="content">????????????</label>
									<Input
										className="input"
										type="password"
										value={Password}
										onChange={onPasswordHandler}
									/>
								</div>
								<div className="column">
									<label className="content">???????????? ??????</label>
									<Input
										className="input"
										type="password"
										value={ConfirmPassword}
										onChange={onConfirmPasswordHandler}
									/>
								</div>

								<br />
								<Button
									buttonText="????????????"
									type="submit"
									outputColor="red"
									className="content_button"
									onClick={onClickLogin}
								></Button>
							</div>
						</form>
					</SignupUI>
				</div>
				<div className="rightSide">
					<BigDoran>
						<img className="bigDoran" src="/img/big-doran-smile.png" />
					</BigDoran>
				</div>
			</MainBlock>
			<StyledContainer>
				<ToastContainer />
			</StyledContainer>
		</>
	);
}

export default Signuppage;
