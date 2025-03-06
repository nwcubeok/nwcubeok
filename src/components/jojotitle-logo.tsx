import Image from "next/image";

const JojoTitleLogo = ({ width = 30, height = 30 }) => {
  return (
      <Image
        src="assets/jojo_title_logo.svg"
        alt="Jojo Title logo"
        width={width}
        height={height}
        loader={() => "assets/jojo_title_logo.svg"}
        unoptimized
      />
  );
};

export default JojoTitleLogo;
