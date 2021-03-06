import React from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';
import Heart from './Heart';

const TypeItems = styled.div`
	position: relative;

	.heart_1 {
		position: absolute;
		cursor: pointer;
		top: 20%;
		left: 30%;
		z-index: 1;
	}

	.heart_2 {
		position: absolute;
		cursor: pointer;
		top: 20%;
		left: 45%;
		z-index: 1;
	}

	.heart_3 {
		position: absolute;
		cursor: pointer;
		top: 20%;
		left: 70%;
		z-index: 1;
	}

	.heart_on_1 {
		top: 25%;
		left: 35%;
		&:before {
			top: 20%;
			left: 30%;
		}
	}

	.heart_on_2 {
		top: 25%;
		left: 50%;
		&:before {
			top: 20%;
			left: 45%;
		}
	}

	.heart_on_3 {
		top: 25%;
		left: 75%;
		&:before {
			top: 20%;
			left: 70%;
		}
	}

	.typeItem {
		cursor: pointer;
		min-width: 160px;
		padding-top: 10px;
		border-radius: 25px;

		display: flex;
		flex-direction: column;
		justify: center;
		align-items: center;
		font-size: 22px;
		line-height: 80px;
	}

	.typeItem_on {
		background: #5dcb83;
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
`;

function TypeItem({ id, diaryType, onClick, isSelected }) {
	return (
		<TypeItems>
			<div className={['heart_' + id, isSelected ? `heart_on_` + id : ''].join(' ')}>
				{(id === 1 || id === 2 || id === 3) && <Heart id={id} />}
			</div>
			<div className="typeItem">
				<Button
					onClick={() => onClick(id)}
					width="100px"
					height="90px"
					extraClassName={['typeItem', isSelected ? `typeItem_on` : ''].join(' ')}
					buttonText={diaryType}
					outputColor="green"
				></Button>
			</div>
		</TypeItems>
	);
}

export default TypeItem;
