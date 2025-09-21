import avatar from "./avatar/avatar.jpg";

const user = {
  name: "Іван Даркін",
  imageUrl: avatar,
  imageSize: 200,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Фото " + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}
