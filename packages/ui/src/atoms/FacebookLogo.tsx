import { UnsetSvgProps, UnsetSvg } from "../helpers/UnsetSvg";

export default function FacebookLogo({ sx }: Readonly<UnsetSvgProps>) {
  return (
    <UnsetSvg sx={sx}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
        <g id="icon/facebook">
          <path id="Vector" d="M29.2263 16.0982C29.2263 8.75542 23.3107 2.80371 16.012 2.80371C8.71332 2.80371 2.79773 8.75542 2.79773 16.0982C2.79773 22.7353 7.62887 28.235 13.9471 29.2323V19.9418H10.5924V16.0973H13.9471V13.169C13.9471 9.83723 15.9195 7.99604 18.9385 7.99604C20.3833 7.99604 21.8968 8.25592 21.8968 8.25592V11.5278H20.2291C18.5879 11.5278 18.077 12.5532 18.077 13.6051V16.0982H21.7417L21.1559 19.9409H18.077V29.2323C24.3952 28.235 29.2263 22.7353 29.2263 16.0982Z" fill="#7339FF" />
        </g>
      </svg>
    </UnsetSvg>
  );
}
