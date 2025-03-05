import Image from "next/image";

const JojoTitleLogo = ({ width = 30, height = 30 }) => {
  return (
      <Image
        src="/jojo_title_logo.svg"
        alt="Jojo Title logo"
        width={width}
        height={height}
        loader={() => "/jojo_title_logo.svg"}
      />
  );
};

export default JojoTitleLogo;
