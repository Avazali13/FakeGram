import PostFormCard from "../ui/PostFormCard";
// import FeedPost from "./FeedPost";
import FeedPosts from "../components/Home/FeedPosts";

// import FeedPost from "./FeedPost";

function Dashboard() {
  console.log(Date.now());
  return (
    <div className="flex mt-4 gap-4  md:mx-2 ">
      <div className="grow">
        {/* <PostFormCard /> */}
        <FeedPosts />
      </div>
    </div>
  );
}

export default Dashboard;
