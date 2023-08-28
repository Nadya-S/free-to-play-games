import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button type="primary" ghost onClick={() => navigate(-1)}>
      Back to games
    </Button>
  );
};
export default BackButton;
