import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const { movie } = Object.assign({}, location);
  const { video: urlVideo } = Object.assign({}, movie);
  console.log(urlVideo)
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress type="video/mp4" controls src={urlVideo} />
    </div>
  );
}
