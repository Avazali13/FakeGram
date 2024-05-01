
function Avatar({ size,src }) {
  let width = "w-24 h-24";
  if (size === "lg") {
    width = "w-44 md:w-52";
  }


  return (
    <div className= {`${width} rounded-full overflow-hidden`}>
      <img
        alt="avatar"
        src={`${src}` || `../../public/default-user.jpg`}
      />
    </div>
  );
}

export default Avatar;
