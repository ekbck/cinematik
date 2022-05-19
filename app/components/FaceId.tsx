import { FunctionComponent } from "react";
import AnimatedLottieView from "lottie-react-native";

type FaceIdProps = {
  visible: boolean | false;
};

const FaceId: FunctionComponent<FaceIdProps> = ({ visible }) => {
  if (!visible) return null;
  return (
    <AnimatedLottieView
      autoPlay
      loop
      source={require("../assets/animations/face_Id.json")}
    />
  );
};

export default FaceId;
