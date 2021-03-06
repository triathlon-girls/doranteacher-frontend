import React, { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styled, { css } from 'styled-components';
import { MdDone } from 'react-icons/md';
import { useSentenceDispatch, useSentenceState } from './SentenceContext';

const CheckCircle = styled.div`
	width: 32px;
	height: 32px;
	border-radius: 16px;
	border: 2px solid #ced4da;
	font-size: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
	cursor: pointer;
	${(props) =>
		props.act &&
		css`
			border: 2px solid #5dcb83;
			color: white;
			background-color: #5dcb83;
		`}
`;

function AnswerBox({ id, checkfirst }) {
	const dispatch = useSentenceDispatch();
	const state = useSentenceState();
	const [editable, setEditable] = useState(false);
	const [text, setText] = useState('');
	const ref = useRef(null);

	useEffect(() => {
		setText(state[id - 1].answer);
	}, [state]);

	// text상태일 때 onClick 이벤트로 넣어 줄 함수
	const editOn = (e) => {
		setText(text);
		setEditable(true);
	};
	const editOn1 = (e) => {
		setText(state[id - 1].answer);
		setEditable(true);
	};
	// input상태일 때 내용의 변화를 감지해서 text를 바꾸어 줌
	const handleChange = (e) => {
		setText(e.target.value);
	};
	// enter키를 눌렀을 때 입력을 중지하는 함수
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			setEditable(!editable);
			onUpdate(id, text);
		}
	};

	function onUpdate(updateid, answer) {
		dispatch({
			type: 'CHANGE_ANSWER',
			sentence: {
				id: updateid,
				answer: answer,
			},
		});
		setText(answer);
	}

	const act = state[id - 1].active;
	const onToggle = () => dispatch({ type: 'TOGGLE', id });

	return (
		<div className="answer">
			<CheckCircle act={act} onClick={onToggle}>
				{act && <MdDone />}
			</CheckCircle>
			{id}번째 문장
			<div className="editbox" ref={ref}>
				{editable ? (
					<>
						<input
							className="onedit"
							id="resizable"
							type="text"
							value={text}
							onChange={(e) => handleChange(e)}
							onKeyDown={handleKeyDown}
						/>
						<div className="trash">
							<FaTrashAlt />
						</div>
					</>
				) : (
					<>
						{checkfirst && (
							<div className="offedit" onClick={() => editOn1()}>
								{state[id - 1].answer}
							</div>
						)}
						{!checkfirst && (
							<div className="offedit" onClick={() => editOn()}>
								{text}
							</div>
						)}

						<div className="trash">
							<FaTrashAlt
								onClick={() => {
									onUpdate(id, '');
								}}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default AnswerBox;
