import { Layout, Typography } from "antd";
const { Title } = Typography;

const Header = () => {
  return (
    <Layout.Header
      style={{
        height: 70,
        display: "flex",
        alignItems: "start",
        background: "#00335A",
        paddingLeft: "calc((100% - 1280px)/2)",
      }}
    >
      <Title
        level={3}
        style={{
          color: "#2B74AC",
          marginTop: 18,
          marginLeft: 20,
        }}
      >
        Free to play games
      </Title>
    </Layout.Header>
  );
};

export default Header;
