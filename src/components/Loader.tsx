import { Spinner } from "reactstrap";
interface ILoader {
  color?: "primary" | "success" | "secondary";
  size?: "sm" | "lg";
  className?: string;
}
const Loader = (props: ILoader) => {
  const { color = "primary", size = "lg", className } = props;
  return <Spinner color={color} className={className} size={size} />;
};

export default Loader;
