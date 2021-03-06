import React, { useEffect, useState } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import Header from '../components/Header';
import Button from '../components/Button';
import GlobalStyle from '../components/GlobalStyle';
import { useNavigate, Link } from 'react-router-dom';
import LeftDoran from '../components/LeftDoran';
import ProgressBar from '../components/ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

const MainBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	.content {
		margin-top: 30px;
		margin-bottom: 20px;
		font-family: 'KOTRAHOPE';
		font-style: normal;
		font-weight: 380;
		font-size: 35px;
		line-height: 48px;
		text-align: center;
	}

	.question {
		margin-top: 25px;
		margin-bottom: 20px;
		font-family: 'KOTRAHOPE';
		font-style: normal;
		font-weight: 380;
		font-size: 25px;
		line-height: 48px;
		text-align: center;
	}

	.yellowbox {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 20px;

		width: 600px;
		height: 480px;
		z-index: 1;
		background: white;
		outline: 0;
		border: 0;
		letter-spacing: 1px;
		position: relative;

		border-radius: 25px;
		border: 2px solid black;
		transition: transform 0.2s cubic-bezier(0, 0, 0.7, 1);
	}

	.buttons {
		display: flex;
	}

	.buttonStyle {
		margin-left: 10px;
		margin-right: 10px;
	}

	.saveButton {
		margin-top: 15px;
	}

	.key {
		color: #e75244;
	}

	.nextButton {
		align-self: flex-end;
		margin-top: 20px;
		margin-right: 70px;
	}

	.on {
		background: #e75244;
		// background: #5dcb83;
		transition: all 0.1s cubic-bezier(0, 0, 0.7, 1);
		top: 3px;
		left: -3px;
		box-shadow: -3px 3px 0 var(--brown);

		&::after {
			top: 1px;
			left: -2px;
			width: var(--angle);
			height: var(--angle);
		}

		&::before {
			bottom: -2px;
			right: 1px;
			width: var(--angle);
			height: var(--angle);
		}
	}

	.imageUpload {
		padding-left: 280px;
		margin-top: 20px;
		margin-bottom: -20px;
	}
`;

function DiarySave() {
	// console.log(getStringDate(new Date()));
	const [painting, setPainting] = useState(true);
	const [correct, setCorrect] = useState(true);
	const [comment, setComment] = useState(true);
	const [file, setFile] = useState(null);
	// const [text, setText] = useState(localStorage.getItem("text"));
	// const [correctText, setCorrectText] = useState(null);
	const [cookies] = useCookies(['acessToken']);

	const navigate = useNavigate('');

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

	const errorNotify = () => {
		toast.error('????????? ?????????????????????', {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 1000,
		});
	};

	const successNotify = () => {
		toast.success('????????? ??????????????? ?????? ????????????????', {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 1800,
		});
	};

	const toastId = React.useRef(null);

	const pending = () => {
		toastId.current = toast.loading(`????????? ???????????? ???`, {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: false,
		});
	};

	const dismiss = () => toast.dismiss(toastId.current);

	const [cm, setCm] = useState('');
	const [gm, setGm] = useState([]);
	const [correctSentence, setCorrectSentence] = useState('');

	useEffect(() => {
		if (gm.length !== 0) {
			pending();
		}
	}, [gm]);

	function saveFunc() {
		if (!painting && !file) {
			errorNotify();
		} else {
			const formData = new FormData();
			if (!painting) {
				formData.append('images', file);
			}
			if (comment) {
				fetch('http://52.78.38.31:5000/correct', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({
						text: localStorage.getItem('text'),
					}),
				})
					.then((res) => {
						return res.json();
					})
					.then((json) => {
						console.log(json);
						setGm(json.corrected);
						// setCorrectSentence(json.correct);
						return [json.corrected, json.correct];
					})
					.then(([gram, cSentence]) => {
						console.log(cSentence);
						fetch('http://52.78.38.31:5000/comment', {
							method: 'POST',
							headers: {
								'Content-type': 'application/json',
							},
							body: JSON.stringify({
								text: cSentence,
							}),
						})
							.then((res) => {
								return res.json();
							})
							.then((json) => {
								console.log(json.result); // ???????????? ?????? json???????????? ?????? ???
								setCm(json.result);
								return json.result;
							})
							.then((commentvalue) => {
								console.log(gram);
								console.log(commentvalue);
								formData.append(
									'data',
									JSON.stringify({
										title: localStorage.getItem('title'),
										date: localStorage.getItem('date'),
										weather: localStorage.getItem('weather'),
										keywords: localStorage.getItem('apiKeywords'),
										originalText: localStorage.getItem('text'),
										diaryType: localStorage.getItem('diaryType'),
										isPrivate: !comment,
										wantToCorrect: correct,
										wantToImage: painting,
										comment: commentvalue,
										correctText: gram,
									}),
								);
								fetch('http://3.39.158.98:8080/diaries', {
									method: 'POST',
									headers: {
										Authorization: `Bearer ${cookies['accessToken']}`,
									},
									body: formData,
								})
									.then((response) => response.json())
									.then((res) => {
										console.log(res);
									})
									.then(() => {
										successNotify();
										setTimeout(function setNavi() {
											navigate('/');
										}, 1800);
									});
							});
					});
			} else {
				fetch('http://52.78.38.31:5000/correct', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify({
						text: localStorage.getItem('text'),
					}),
				})
					.then((res) => {
						return res.json();
					})
					.then((json) => {
						console.log(json);
						setGm(json.corrected);
						// setCorrectSentence(json.correct);
						return json.corrected;
					})
					.then((gram) => {
						console.log(gram);
						formData.append(
							'data',
							JSON.stringify({
								title: localStorage.getItem('title'),
								date: localStorage.getItem('date'),
								weather: localStorage.getItem('weather'),
								keywords: localStorage.getItem('apiKeywords'),
								originalText: localStorage.getItem('text'),
								diaryType: localStorage.getItem('diaryType'),
								isPrivate: !comment,
								wantToCorrect: correct,
								wantToImage: painting,
								comment: '',
								correctText: gram,
							}),
						);
						fetch('http://3.39.158.98:8080/diaries', {
							method: 'POST',
							headers: {
								Authorization: `Bearer ${cookies['accessToken']}`,
							},
							body: formData,
						})
							.then((response) => response.json())
							.then((res) => {
								console.log(res);
							})
							.then(() => {
								successNotify();
								setTimeout(function setNavi() {
									navigate('/');
								}, 1800);
							});
					});
			}
		}
	}

	return (
		<>
			<GlobalStyle backColor="yellow" />
			<LeftDoran />
			<Header
				isProgress
				isLogout
				isImgBtn
				progress={
					<ProgressBar
						progressText={'7.????????????'}
						progressWidth={'100'}
						progressColor={'#E75244'}
						backColor="red"
					></ProgressBar>
				}
			/>
			<MainBlock>
				<div className="content">
					?????? ??? ????????????!
					<br />
					????????? ????????? ???????????????????
				</div>
				<div className="yellowbox">
					<div className="question">
						Q1. ????????? ???????????? <span className="key">??????</span>??? ???????????????????
					</div>
					<div className="buttons">
						<div className="buttonStyle">
							<Button
								buttonText="???"
								inputColor="purple"
								extraClassName={painting === true ? `on` : ''}
								onClick={() => setPainting(true)}
							></Button>
						</div>
						<div className="buttonStyle">
							<Button
								buttonText="???????????????"
								inputColor="purple"
								extraClassName={painting === false ? 'on' : ''}
								onClick={() => setPainting(false)}
							/>
						</div>
					</div>

					<div className="imageUpload">
						{!painting ? (
							<input
								type="file"
								id="ex_file"
								accept="image/jpg, image/png, image/jpeg"
								onChange={(e) => setFile(e.target.files[0])}
							/>
						) : (
							''
						)}
					</div>
					<div className="question">
						Q2. ???????????? <span className="key">????????? ??????</span>??? ?????????????
					</div>
					<div className="buttons">
						<div className="buttonStyle">
							<Button
								buttonText="???"
								inputColor="purple"
								extraClassName={correct === true ? `on` : ''}
								onClick={() => setCorrect(true)}
							></Button>
						</div>
						<div className="buttonStyle">
							<Button
								buttonText="?????????"
								inputColor="purple"
								extraClassName={correct === false ? 'on' : ''}
								onClick={() => setCorrect(false)}
							></Button>
						</div>
					</div>
					<div className="question">
						Q3. ???????????? <span className="key">??????</span>??? ?????? ??????????
					</div>
					<div className="buttons">
						<div className="buttonStyle">
							<Button
								buttonText="???"
								inputColor="purple"
								extraClassName={comment === true ? `on` : ''}
								onClick={() => setComment(true)}
							></Button>
						</div>
						<div className="buttonStyle">
							<Button
								buttonText="?????????"
								inputColor="purple"
								extraClassName={comment === false ? 'on' : ''}
								onClick={() => setComment(false)}
							></Button>
						</div>
					</div>
				</div>
				<div className="nextButton">
					<Button buttonText="???!" type="submit" outputColor="purple" onClick={saveFunc}></Button>
				</div>
			</MainBlock>
			<StyledContainer>
				<ToastContainer />
			</StyledContainer>
		</>
	);
}
export default DiarySave;
