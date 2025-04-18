import Image from "next/image";

const JojoLogo = ({ width = 18, height = 18 }) => {
  return (
    <div className="dark:invert">
      <Image
        src="assets/jojo_logo.svg"
        alt="Jojo logo"
        width={width}
        height={height}
        loader={() => "assets/jojo_logo.svg"}
        unoptimized
      />
    </div>
  );
};

export default JojoLogo;
