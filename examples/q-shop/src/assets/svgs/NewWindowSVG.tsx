interface NewWindowSVGProps {
  color: string
  height: string
  width: string
}

export const NewWindowSVG: React.FC<NewWindowSVGProps> = ({
  color,
  height,
  width
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 96 960 960"
    >
      <path
        d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h300v60H180v600h600V576h60v300q0 24-18 42t-42 18H180Zm480-420V396H540v-60h120V216h60v120h120v60H720v120h-60Z"
        fill={color}
      />
    </svg>
  )
}
