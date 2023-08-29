import { Layout } from "antd";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FilterContainer from "../components/FilterContainer/FilterContainer";
import CardList from "../components/CardList/CardList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGames } from "../store/actions";
import Preloader from "../components/Preloader/Preloader";

const MainPage = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games);
  const platform = useSelector((state) => state.platform);
  const genre = useSelector((state) => state.genre);
  const sort = useSelector((state) => state.sort);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    let controller = new AbortController();

    getGames(dispatch, platform, genre, sort, controller);

    return () => {
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
        {isLoading ? <Preloader /> : <CardList data={games} error={error} />}
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default MainPage;
