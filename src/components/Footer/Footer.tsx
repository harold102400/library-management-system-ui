import "./Footer.css";
import "../../index.css";
const Footer = () => {
    var currYear = new Date().getFullYear();
  return (
    <footer>
        <div>
            <p>Harold.Dev</p>
        </div>
        <div>
        <p>Copyright @ {currYear}</p>
        </div>
    </footer>
  )
}

export default Footer