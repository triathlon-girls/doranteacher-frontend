import React, { useState, useEffect } from "react";
import styled, { css, createGlobalStyle } from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";
import GlobalStyle from "../components/GlobalStyle";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { TypeHangul } from "type-hangul";
import { useCookies } from "react-cookie";
import axios from "axios";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";
// const diary_img = process.env.PUBLIC_URL + `/img/diary_img.jpeg`;

const diary_img = "https://i.ytimg.com/vi/L6JTC0t3n9U/maxresdefault.jpg";

const doran_img = process.env.PUBLIC_URL + `/img/doran_half_1.png`;

const MainBlock = styled.div`
    .main-wrapper {
        display: flex;
    }

    .leftside {
        display: flex;
        width: 650px;
        flex-direction: column;
    }
    .mini-header-wrapper {
        margin-top: 10px;
        display: flex;
    }

    .diaryType_button {
        cursor: default;
        pointer-events: none;
        padding-right: 10px;
        padding-left: 10px;
        margin-right: 5px;
        margin-left: 30px;
    }

    .keywords-wrapper {
        display: flex;
    }
    .keyword_button {
        font-size: 20px;
        cursor: default;
        pointer-events: none;
        padding-right: 3px;
        padding-left: 3px;
        margin-right: 5px;
        margin-left: 5px;
    }

    .diarycontents {
        position: relative;
        margin-top: 30px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .correct_button {
        position: absolute;
        cursor: pointer;
        top: 2%;
        left: 70%;
        z-index: 1;
        font-size: 20px;
        line-height: 30px;
        height: 30px;
        border: 0;
        letter-spacing: 1px;
        cursor: pointer;
        padding: 0px 30px;
        font-family: "Cafe24Syongsyong";
        font-style: normal;
        font-weight: 400;
        border-radius: 25px;
        border: 2px solid black;
    }
    .correct_button_on {
        background-color: #d3d3d3;
        color: #e75244;
        border: 3px solid #e75244;
    }
    .contents-box {
        background-color: white;
        border-radius: 15px;
        display: flex;
        // align-items: center;
        align-self: flex-end;

        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
            rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }

    .answers {
        padding: 40px;
        align-self: flex-end;
    }
    .answer {
        font-family: "Cafe24Syongsyong";
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 40px;
        word-wrap: break-word;
        /* padding: 7px 0; */
        text-underline-offset: 17px;
        text-decoration: underline;
        text-decoration-thickness: 2px;
        line-height: 60px;
        border-bottom: 2px solid black;
    }
    .answer_black {
        font-family: "Cafe24Syongsyong";
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 40px;
        word-wrap: break-word;
        padding: 7px 0;
        // text-decoration: underline;
        text-underline-offset: 17px;
        text-decoration-thickness: 2px;
        line-height: 60px;
        border-bottom: 2px solid black;
    }

    .answer_green {
        font-family: "Cafe24Syongsyong";
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 40px;
        word-wrap: break-word;
        color: #33ff33;
        padding: 7px 0;
        text-underline-offset: 17px;
        text-decoration-thickness: 2px;
        line-height: 60px;
        border-bottom: 2px solid black;
    }
    .content {
        font-family: "KOTRAHOPE";
        font-size: 35px;
        text-align: center;
    }

    .rightside {
        display: flex;
        flex-direction: column;
        margin-right: 25px;
    }
    .comment_button {
        font-size: 30px;
        color: white;
        margin-right: 25px;
        cursor: default;
        pointer-events: none;
        border-radius: 30px;
    }
    .comment-wrapper {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .on {
        background: #e75244;
        transition: all 0.1s cubic-bezier(0, 0, 0.7, 1);
        top: 4px;
        left: 3.5px;
        &:before {
            top: -4px;
            left: -4.7px;
        }
    }

    .comment-title-wrapper {
        margin-top: 50px;
        margin-right: 30px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .comment-box {
        line-height: 50px;
        text-align: center;
        // margin-top: 20px;
        width: 420px;
        font-size: 25px;
        height: 50px;
        background-color: #f9de4b;
        outline: 0;
        border: 0;
        letter-spacing: 1px;
        // cursor: pointer;
        position: relative;
        padding: 3px 35px;
        font-family: "Cafe24Syongsyong";
        font-style: normal;
        font-weight: 400;

        border-radius: 20px;
        border: 2px solid black;
        transition: transform 0.2s cubic-bezier(0, 0, 0.7, 1);

        // &:before {
        // 	z-index: -1;
        // 	position: absolute;
        // 	top: 0;
        // 	right: 0;
        // 	bottom: 0;
        // 	left: 0;
        // 	content: '';
        // 	width: 100%;
        // 	height: 100%;
        // 	position: absolute;
        // 	background: white;
        // 	transform: translate3d(0.2em, 0.15em, 1em);
        // 	border-radius: 20px;
        // 	border: 2px solid black;
        // 	transition: transform 0.2s cubic-bezier(0, 0, 0.7, 1);
        // 	&:active {
        // 		z-index: -1;
        // 	}
        // }
    }
    .photo-box {
        text-align: center;
        margin-top: 20px;
        width: 420px;
        font-size: 25px;
        height: 300px;
        background-color: #f9de4b;
        outline: 0;
        border: 0;
        letter-spacing: 1px;
        // cursor: pointer;
        position: relative;
        padding: 3px 35px;
        font-family: "Cafe24Syongsyong";
        font-style: normal;
        font-weight: 400;

        border-radius: 20px;
        border: 2px solid black;
        transition: transform 0.2s cubic-bezier(0, 0, 0.7, 1);

        // &:before {
        //     z-index: -1;
        //     position: absolute;
        //     top: 0;
        //     right: 0;
        //     bottom: 0;
        //     left: 0;
        //     content: "";
        //     width: 100%;
        //     height: 100%;
        //     position: absolute;
        //     background: white;
        //     transform: translate3d(0.2em, 0.15em, 1em);
        //     border-radius: 20px;
        //     border: 2px solid black;
        //     transition: transform 0.2s cubic-bezier(0, 0, 0.7, 1);
        //     &:active {
        //         z-index: -1;
        //     }
        // }
    }
    .diary_img {
        margin-top: 30px;
        border-radius: 15px;
        transition: all 0.2s linear;
        // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        //     rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        //     rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    }

    .diary_img:hover {
        transform: scale(1.28);
    }

    .mama {
        color: red;
    }

    #sub {
        font-size: 30px;
        text-decoration: none;
        line-height: 60px;
        border-bottom: 2px solid black;
    }
`;

function DiaryDetail() {
    const [correct, setCorrect] = useState(false);
    const { id } = useParams();
    const [cookies] = useCookies(["acessToken"]);
    const [data, setData] = useState([]);
    const diaryDetail = () => {
        axios
            .get(`http://3.39.158.98:8080/diaries/${id}`, {
                headers: {
                    Authorization: `Bearer ${cookies["accessToken"]}`,
                    "Content-type": "application/json",
                },
            })
            .then((res) => {
                console.log(res.data.results[0]);
                setData(res.data.results[0]);
            });
    };

    useEffect(() => {
        diaryDetail();
    }, []);

    const dummyData =
        // ??????????????? ???????????? ???????????????
        {
            weather: "????????? ?????????",
            date: "2022??? 06??? 01???",
            diaryType: "????????????",
            keywords: ["#??????", "#??????", "#?????????", "#?????????", "#??????"],
            // ???????????? json ?????? ????????? ???????????????
            title: "????????????????????? ?????? ?????? ???",
            correct_text: [
                "????????? ????????? ?????? ???????????? ",
                "#????????????.",
                " ???????????? ??? ????????? ??????????????? ",
                "#??????",
                " ",
                "#??????",
                " ???????????? ???????????? ",
                "#??????",
                " ",
                "#????????????.",
                " ????????? ?????? ?????? ",
                "#?????????",
                " ???????????? ?????? ?????????. ???????????? ?????? ???????????? ?????? ?????? ",
                "#????????????!",
                " ??? ????????? ??????????????? ?????????????????????. ????????????!",
            ],
            original_text:
                "????????? ????????? ?????? ???????????? ????????????. ???????????? ??? ????????? ??????????????? ???????????? ???????????? ???????????? ??????????????????. ????????? ?????? ?????? ????????? ???????????? ?????? ?????????. ???????????? ?????? ???????????? ?????? ?????? ????????????! ??? ????????? ??????????????? ?????????????????????. ????????????!",
            isPrivate: true,
            comment: "?????? ?????? ??? ???????????????",
            wantToCorrect: true,
            hasImage: true,
            // imagePath: "",
            // // ????????? ????????? ????????????
        };

    return (
        <>
            <GlobalStyle backColor="yellow" />

            <Header isUndo />

            <MainBlock>
                <div className="main-wrapper">
                    <div className="leftside">
                        <div className="mini-header-wrapper">
                            <div className="diaryType-wrapper">
                                <Button
                                    buttonText={data.diaryType}
                                    extraClassName="diaryType_button"
                                    inputColor="purple"
                                    width="130px;"
                                ></Button>
                            </div>
                            <div className="keywords-wrapper">
                                {data.keywords &&
                                    data.keywords.map((it, index) => (
                                        <Button
                                            key={index}
                                            buttonText={it}
                                            width="120px;"
                                            inputColor="green"
                                            extraClassName="keyword_button"
                                        ></Button>
                                    ))}
                            </div>
                        </div>
                        <div className="diarycontents">
                            <div className="contents-box">
                                <div className="answers">
                                    <div className="answer" id="sub">
                                        ?????? | {data.date}
                                    </div>
                                    <div className="answer" id="sub">
                                        ?????? | {data.weather}
                                    </div>
                                    <div className="answer" id="sub">
                                        ?????? | {data.title}
                                    </div>
                                    {!correct ? (
                                        <div className="answer">
                                            {data.original_text}
                                        </div>
                                    ) : (
                                        <div>
                                            {/* ?????? ????????? ??????????????? ??????????????? */}
                                            {data.correct_text &&
                                                data.correct_text.map((text) =>
                                                    text[0] === "#" ? (
                                                        <span className="answer_green">
                                                            {text.slice(1)}
                                                        </span>
                                                    ) : (
                                                        <span className="answer_black">
                                                            {text}
                                                        </span>
                                                    )
                                                )}
                                        </div>
                                    )}
                                </div>
                                {data.wantToCorrect ? (
                                    <div
                                        className={[
                                            "correct_button",
                                            correct === true
                                                ? `correct_button_on`
                                                : "",
                                        ].join(" ")}
                                        onClick={() => setCorrect(!correct)}
                                    >
                                        ????????? ??????
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="rightside">
                        <div className="comment-wrapper">
                            <div className="comment-title-wrapper">
                                <img
                                    src={doran_img}
                                    height="140"
                                    width="95"
                                    alt=""
                                ></img>
                                <div className="content">
                                    ????????????
                                    <br />
                                    ?????????
                                </div>
                            </div>
                            <div className="comment-box" id="target">
                                {data.comment}
                            </div>
                            {data.comment ? (
                                <Helmet>
                                    <script>TypeHangul.type('#target');</script>
                                </Helmet>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="photo-wrapper">
                            <div className="content">
                                ???? ???????????? ?????? ?????? ????
                            </div>
                            <div className="photo-box">
                                <img
                                    className="diary_img"
                                    src={data.selectedImage}
                                    height="240"
                                    width="380"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </MainBlock>
        </>
    );
}

export default DiaryDetail;
