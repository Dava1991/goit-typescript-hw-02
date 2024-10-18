import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";
export default function Loader() {
  return (
    <div style={styles.loaderContainer}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
}
const styles = {
  loaderContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // This makes the container take up the full height of the viewport
  },
};