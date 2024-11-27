import { Hourglass } from "react-loader-spinner";
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="spinning_container">
         <div className="sub_spinning_container">
            <p>Loading...</p>
            <Hourglass
              visible={true}
              height="120"
              width="120"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass="svg_edit"
              colors={["#000", "#ddcbb7"]}
            />
          </div>
    </div>
  )
}

export default LoadingSpinner