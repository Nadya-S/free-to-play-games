import { Layout } from "antd";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FilterContainer from "../components/FilterContainer/FilterContainer";
import CardList from "../components/CardList/CardList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getGames } from "../store/actions";
import Preloader from "../components/Preloader/Preloader";
import { setCardLimit } from "../store/gameReducer";

const MainPage = () => {
  const dispatch = useDispatch();
  const lastElement = useRef();
  const observer = useRef();
  const games = useSelector((state) => state.games);
  const platform = useSelector((state) => state.platform);
  const genre = useSelector((state) => state.genre);
  const sort = useSelector((state) => state.sort);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const cardLimit = useSelector((state) => state.cardLimit);

  useEffect(() => {
    if (error || games.length === 0) return;
    if (observer.current) observer.current.disconnect();
    var callback = function (entries, observer) {
      if (entries[0].isIntersecting && games.length > cardLimit && !isLoading) {
        dispatch(setCardLimit(cardLimit + 3));
      }
    };
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
  }, [cardLimit, games, error, isLoading, dispatch]);

  useEffect(() => {
    let controller = new AbortController();
    getGames(dispatch, platform, genre, sort, controller);

    return () => {
      dispatch(setCardLimit(12));
      controller.abort();
    };
  }, [dispatch, platform, genre, sort]);

  return (
    <Layout
      style={{
        background: "#112D43",
        color: "#4E83AC",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Layout.Content
        style={{
          padding: "0 20px",
          maxWidth: 1280,
          margin: "0 auto",
          width: "100vw",
        }}
      >
        <FilterContainer />
        {isLoading ? (
          <Preloader />
        ) : (
          <CardList data={games.slice(0, cardLimit)} error={error} />
        )}
        <div ref={lastElement} style={{ height: 20 }}></div>
      </Layout.Content>

      <Footer />
    </Layout>
  );
};

export default MainPage;
