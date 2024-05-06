function Avatar({ size, src }) {
  let width = "w-24 h-24";
  if (size === "lg") {
    width = "w-44 md:w-[15rem] h-44 md:h-[15rem]";
  }

  return (
    <div className={`${width} overflow-hidden rounded-full bg-gray-500`}>
<div  className="w-full h-full" >
<img className="w-full h-full object-cover" alt="avatar" src={`${src}` || `../../public/default-user.jpg`} />
</div>
    </div>
  );
}

export default Avatar;
