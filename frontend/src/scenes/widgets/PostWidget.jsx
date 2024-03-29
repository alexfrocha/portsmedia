import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteBorderOutlines,
    FavoriteOutlined,
    ShareOutlined,
    DeleteOutlined
} from '@mui/icons-material'
import {Box, Divider, IconButton, Typography, useTheme} from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import Friend from 'components/Friend'
import WidgetWrapper from 'components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setPost } from 'state'

const PostWidget = ({
    key,
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    isProfile
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch()
    const friends = useSelector((state) => state.user.friends)
    const token = useSelector((state) => state.token)
    const loggedInUserId = useSelector((state) => state.user._id)
    const isLiked = Boolean(likes[loggedInUserId])
    const likeCount = Object.keys(likes).length
    const user = useSelector((state) => state.user)

    const {palette} = useTheme()
    const main = palette.neutral.main
    const primary = palette.primary.medium

    const patchLike = async () => {
        const response = await fetch(`https://api-portsmedia.herokuapp.com/posts/${postId}/like`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: loggedInUserId })
        })
        const updatedPost = await response.json()
        dispatch(setPost({ post: updatedPost }))
    }

    const deletePost = async () => {
        const response = await fetch(`https://api-portsmedia.herokuapp.com/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
    }

    return (
        <WidgetWrapper m='2rem 0'>
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}    
                isProfile={isProfile}
            />
            <Typography color={main} sx={{ mt: '1rem' }}>
                {description}
            </Typography>
            {picturePath && (
                <img 
                    width='100%' 
                    height='auto' 
                    alt='post' 
                    style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
                    src={`https://api-portsmedia.herokuapp.com/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt='0.25rem'>
                <FlexBetween gap='1.5rem'>
                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={patchLike}>
                            

                        {isLiked ? (
                            <FavoriteOutlined sx={{color: primary}} />
                        ): (
                            <FavoriteBorderOutlined />
                        )}


                            
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>
                    <FlexBetween gap='0.3rem'>
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>
                            {comments.length}
                        </Typography>
                    </FlexBetween>
                </FlexBetween>
                
                <FlexBetween>
                { loggedInUserId == postUserId && (
                    <IconButton onClick={deletePost}>
                        <DeleteOutlined sx={{
                            color: '#FF3737'
                        }} />
                    </IconButton>
                    )}
                <IconButton>
                    <ShareOutlined />
                </IconButton>
                </FlexBetween>
            </FlexBetween>

            

            {isComments && (
                <Box mt='0.5rem'>
                    {comments.map((comment, i) => (
                        <Box key={`${name}=${i}`}>
                            <Divider />
                            <Typography sx={{color: main, m: '0.5rem 0', pl: '1rem'}}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}
        </WidgetWrapper>
    )

}

export default PostWidget