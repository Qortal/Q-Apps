import { SVGProps } from './interfaces'

export const BoldSVG: React.FC<SVGProps> = ({ color, height, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 96 960 960"
      width={width}
    >
      <path
        fill={color}
        d="M335 856q-25 0-42.5-17.5T275 796V356q0-25 17.5-42.5T335 296h168q66 0 114.5 42T666 444q0 38-21 70t-56 49v6q43 14 69.5 50t26.5 81q0 68-52.5 112T510 856H335Zm26-76h144q38 0 66-25t28-63q0-37-28-62t-66-25H361v175Zm0-247h136q35 0 60.5-23t25.5-58q0-35-25.5-58.5T497 370H361v163Z"
      />
    </svg>
  )
}
