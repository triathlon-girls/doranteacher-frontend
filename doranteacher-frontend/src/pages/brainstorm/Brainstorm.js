import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import GlobalStyle from '../../components/GlobalStyle';
import ProgressBar from '../../components/ProgressBar';
import BrainstormList from './BrainstormList';
import LeftDoran from '../../components/LeftDoran';
import { useNavigate } from 'react-router-dom';
import WordPaint from './WordPaint';
import { useWordState } from './WordContext';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import NextButton from '../../components/NextButton';

const MainBlock = styled.div`
	.literally {
		width: 562px;
		min-height: 243px;
	}

	.centercontent {
		font-family: 'KOTRAHOPE';
		font-style: normal;
		font-weight: 380;
		font-size: 38px;
		line-height: 48px;
		text-align: center;
		div {
			display: inline-block;
			vertical-align: middle;
			margin: 40px 0;
		}

		button {
			display: inline-block;
			vertical-align: middle;
			margin: 10px 20px;
		}
	}

	.questioncontent {
		width: 900px;
	}

	.paint {
		text-align: center;
		width: 562px;
		margin: 0 auto;
		.canvas {
			.literally toolbar-at-top {
				text-align: center;
			}
		}
	}

	.buttonline {
		text-align: center;
		margin: 20px auto;
		width: 212px;
	}

	.wordlist {
		padding: 15px;
		background: #f9de4b;
		border: 3px solid #000000;
		box-sizing: border-box;
		border-radius: 32px;
		font-family: 'KOTRAHOPE';
		font-style: normal;
		font-weight: 400;
		font-size: 40px;
		text-align: center;
		display: flex;
		align-items: center;
		color: #000000;
		margin: 5px 5px;
	}

	.onedit {
		background: white;
		box-sizing: border-box;
		border-radius: 32px;
		font-family: 'KOTRAHOPE';
		font-style: normal;
		font-weight: 400;
		font-size: 40px;
		text-align: center;
		display: inline-block;
		max-width: calc(100% - 32px);
		align-items: center;
		color: #000000;
	}

	.xbutton {
		z-index: 5;
		display: inline-block;
		font-family: 'soojin';
		font-size: 30px;
		background: #e75244;
		width: 50px;
		height: 50px;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: white;
		margin-left: 5px;
	}

	.description {
		font-family: 'Cafe24Syongsyong';
		font-style: normal;
		font-size: 25px;
		color: white;
		line-height: 35px;
	}

	.container {
		margin-right: 100px;
	}
`;

const NextButtonStyle = styled.div`
	text-align: center;
	padding: 20px 0;
`;

function Brainstorm() {
	const [brainstormQs, setBrainstormQs] = useState([
		{
			id: 1,
			question: '?????? ????????? ?????? ?????? ?????? ?????????????',
			active: true,
		},
		{
			id: 2,
			question: '?????? ????????? ???????????? ????????? ?????? ????????????????',
			active: false,
		},
		{
			id: 3,
			question: '?????? ????????? ???????????? ????????? ?????? ????????????????',
			active: false,
		},
		{
			id: 4,
			question: '?????? ????????? ???????????? ????????? ?????? ????????????????',
			active: false,
		},
		{
			id: 5,
			question: '?????? ??? ?????? ????????? ?????????????',
			active: false,
		},
		{
			id: 6,
			question: '?????? ???????????? ?????? ????????? ??????????',
			active: false,
		},
		{
			id: 7,
			question: '?????? ?????? ????????? ????????????????',
			active: false,
		},
		{
			id: 8,
			question: '?????? ?????? ???????????? ?????? ????????? ????????? ?????????????',
			active: false,
		},
		{
			id: 9,
			question: '?????? ?????? ????????? ?????? ????????? ????????? ?????????????',
			active: false,
		},
		{
			id: 10,
			question: '?????? ?????? ????????? ?????? ????????? ????????? ?????????????',
			active: false,
		},
	]);

	function onChange(originId, nextId) {
		setBrainstormQs(
			brainstormQs.map((brainstormQs) =>
				brainstormQs.id === originId
					? { ...brainstormQs, active: false }
					: brainstormQs.id === nextId
					? { ...brainstormQs, active: true }
					: brainstormQs,
			),
		);
	}

	const nowText = brainstormQs.filter((brainstormQs) => brainstormQs.active);

	const [lenWords, setLenWords] = useState(0);
	const countWords = (x) => {
		console.log(x);
		setLenWords(x);
	};

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

	const lessNotify = () => {
		toast.error('????????? ????????????!', {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 3000,
		});
	};

	const moreNotify = () => {
		toast.error('????????? ?????? ?????????!', {
			position: toast.POSITION.BOTTOM_RIGHT,
			autoClose: 3000,
		});
	};

	const words = useWordState();

	const nextStep = () => {
		var returnText = '';
		var apiText = '';
		for (var i = 0; i < words.length; i++) {
			returnText += '#' + words[i].content;
			if (i !== 0) {
				apiText += ',' + words[i].content;
			} else {
				apiText += words[i].content;
			}
		}
		localStorage.setItem('keywords', returnText);
		localStorage.setItem('apiKeywords', apiText);
		navigate('/writing/diary-type');
	};

	return (
		<>
			<GlobalStyle backColor="red" />
			<Header
				isProgress
				isLogout
				isImgBtn
				progress={
					<ProgressBar
						progressText={'2.????????????'}
						progressWidth={'28'}
						progressColor={'#E75244'}
					></ProgressBar>
				}
				backColor="red"
			/>
			<MainBlock>
				<LeftDoran text={nowText} />
				<BrainstormList brainstormQs={brainstormQs} onChange={onChange} countWords={countWords} />
				<div className="paint">
					<WordPaint />
				</div>
				<div className="nextBtn" style={lenWords === 0 ? { marginTop: '80px' } : { display: 'block' }}>
					<NextButton onClick={lenWords < 5 ? lessNotify : lenWords > 10 ? moreNotify : nextStep} />
				</div>
			</MainBlock>
			<StyledContainer>
				<ToastContainer />
			</StyledContainer>
		</>
	);
}

export default Brainstorm;
