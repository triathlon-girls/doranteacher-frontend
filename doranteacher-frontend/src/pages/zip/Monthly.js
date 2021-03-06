import React from 'react';

function Monthly({ year, month, recent, bookColor, link, num }) {
	const cName = 'coverDesign ' + bookColor;
	const check = num;

	return (
		<li>
			<figure className="book">
				<ul className="hardcover-front">
					<li>
						<div className={cName}>
							{recent ? <span className="ribbon">NEW</span> : ''}
							<h1>{year}년</h1>
							<p>{month}월의 일기</p>
						</div>
					</li>

					<li></li>
				</ul>
				<ul className="page">
					<li></li>
					<li>
						<a href={link} className="btn" onClick={() => localStorage.setItem('lennum', check)}>
							일기 보기
						</a>
					</li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				<ul className="hardcover-back">
					<li></li>
					<li></li>
				</ul>
				<ul className="book-spine">
					<li></li>
					<li></li>
				</ul>
			</figure>
			<div className="diariesnum">일기 개수 : {num}개</div>
		</li>
	);
}

export default Monthly;
