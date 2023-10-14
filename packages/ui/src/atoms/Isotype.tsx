import { UnsetSvg, UnsetSvgProps } from "../helpers/UnsetSvg";

export default function Isotype({ sx }: UnsetSvgProps) {
  return (
    <UnsetSvg sx={sx}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="46"
        viewBox="0 0 45 46"
        fill="none"
      >
        <path
          d="M15.5018 10.7628L8.56585 24.2713H34.902L28.5552 9.40455L21.6228 21.643H15.6852L24.2052 0.609375H32.3654L44.692 30.0713H0L15.5018 10.7628Z"
          fill="url(#paint0_linear_9322_7712)"
        />
        <path
          d="M10.9683 32.1562L5.8916 45.4848L17.2692 32.1562H10.9683Z"
          fill="url(#paint1_linear_9322_7712)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_9322_7712"
            x1="39.954"
            y1="6.20823"
            x2="14.4681"
            y2="40.7503"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2193CE" />
            <stop offset="1" stop-color="#7339FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_9322_7712"
            x1="15.2301"
            y1="30.6533"
            x2="4.85439"
            y2="44.7157"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#2193CE" />
            <stop offset="1" stop-color="#7339FF" />
          </linearGradient>
        </defs>
      </svg>
    </UnsetSvg>
  );
}
