import {FallingLines} from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <div className="w-[70px] mx-auto">
      <FallingLines
        color="#0d9488"
        width="70"
        visible={true}
      />
    </div>
  );
}

export default LoadingSpinner;