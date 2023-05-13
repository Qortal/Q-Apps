import { SVGProps } from './interfaces'

export const UnderlineSVG: React.FC<SVGProps> = ({ color, height, width }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 96 960 960"
      width={width}
    >
      <path
        fill={color}
        d="M230 916q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T230 856h500q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 916H230Zm250-140q-100 0-156.5-58.5T267 559V257q0-16.882 12.527-28.941Q292.055 216 309.027 216 326 216 338 228.059T350 257v302q0 63 34 101t96 38q62 0 96-38t34-101V257q0-16.882 12.527-28.941Q635.055 216 652.027 216 669 216 681 228.059T693 257v302q0 100-56.5 158.5T480 776Z"
      />
    </svg>
  )
}
