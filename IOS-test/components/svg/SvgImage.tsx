import Svg, { Image } from "react-native-svg";
import { Dimensions } from "react-native";

type SVGImageProps = {
  path: string;
  height?: number;
  width?: number;
};

export const SvgImage: React.FC<SVGImageProps> = ({
  path,
  height = 20,
  width = 20,
}) => (
  <Svg width={width} height={height}>
    <Image width={width} height={height} href={'../../assets/icon.png'} />
  </Svg>
);

export default SvgImage;
