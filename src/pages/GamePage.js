import { Layout } from "antd";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import GameInfo from "../components/GameInfo/GameInfo";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getCurrentGame } from "../store/actions";
import { useParams } from "react-router-dom";
import Preloader from "../components/Preloader/Preloader";
import Cookies from "js-cookie";
import { getCurrentGameAction } from "../store/gameReducer";
import BackButton from "../components/BackButton/BackButton";

const GamePage = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.currentGame);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  const { id } = useParams();
  const savedGame = Cookies.get(id);

  useEffect(() => {
    let controller = new AbortController();

    if (savedGame) {
      dispatch(getCurrentGameAction(JSON.parse(savedGame)));
    } else {
      getCurrentGame(id, dispatch, controller);
    }

    return () => {
      controller.abort();
    };
  }, [savedGame, id, dispatch]);

  return (
    <Layout
      style={{
        background: "#112D43",
        color: "#4E83AC",
        minHeight: "100vh",
      }}
    >
      <Header>
        <BackButton />
      </Header>
      <Layout.Content
        style={{ padding: "40px 20px", maxWidth: 1280, margin: "0 auto" }}
      >
        {isLoading ? (
          <Preloader />
        ) : (
          <GameInfo currentGame={currentGame} error={error}></GameInfo>
        )}
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default GamePage;
