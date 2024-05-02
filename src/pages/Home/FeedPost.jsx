import { Box, Image } from "@chakra-ui/react";

import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import PostHeader from "./PostHeader";
import PostFooter from "../profile components/PostFooter";
import { styled } from "styled-components";

const StyledDiv=styled.div`
/* background-color: var( --color-grey-0); */
border-radius: 1rem;
padding: 1rem;


`

const FeedPost = ({ post }) => {
	const { userProfile } = useGetUserProfileById(post.createdBy);

	return (
		<StyledDiv>
			<PostHeader post={post} creatorProfile={userProfile} />
			<Box my={2} borderRadius={4} overflow={"hidden"} mb={4} >
				<Image src={post?.imageURL} alt={"FEED POST IMG"} maxH={{base:'250px',md:'600px'}} objectFit={'cover'} minW={{base:'350px',lg:'800px'}}/>
			</Box>
			<PostFooter post={post} creatorProfile={userProfile} />
		</StyledDiv>
	);
};

export default FeedPost;