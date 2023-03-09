import {Box, Divider, Typography, useTheme} from '@mui/material'
import Friend from 'components/Friend'
import WidgetWrapper from 'components/WidgetWrapper'
import { useEffect } from 'react'
import { useDispatch, useSelector } from'react-redux'
import { useNavigate } from 'react-router-dom'
import { setFriends } from 'state'

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const friends = useSelector((state) => state.user.friends)

    const getFriends = async () => {
        const response = await fetch(
            `https://api-portsmedia.herokuapp.com/users/${userId}/friends`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data = await response.json()
        dispatch(setFriends({ friends: data }))
    }

    useEffect(() => {
        getFriends()
    }, [userId])

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant='h5'
                fontWeight='500'
                sx={{ mb: '1rem' }}
            >
                Amigos
            </Typography>
            <Divider sx={{ mb: '1rem' }} />
            <Box display='flex' flexDirection='column' gap='1.5rem'>
                {friends.map((friend) => (
                    <Friend
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    )

}

export default FriendListWidget