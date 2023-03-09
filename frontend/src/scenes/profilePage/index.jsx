import {Box, useMediaQuery} from '@mui/material'
import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Navbar from 'scenes/navbar'
import FriendListWidget from 'scenes/widgets/FriendListWidget'
import PostsWidget from 'scenes/widgets/PostsWidget'
import UserWidget from 'scenes/widgets/UserWidget'


const ProfilePage = () => {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const token = useSelector((state) => state.token)
    const navigate = useNavigate()
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")

    const getUser = async () => {
        const response = await fetch(`https://api-portsmedia.herokuapp.com/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [userId])

    if(!user) return navigate('/home');

    return(
        <Box>
            <Navbar />
            <Box
                width='100%'
                padding='2rem 6%'
                display={isNonMobileScreens ? 'flex' : 'block'}
                gap='2rem'
                justifyContent='center'
            >
                <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
                    <UserWidget userId={userId} picturePath={user.picturePath} />
                    <Box m='2rem 0' />
                    <FriendListWidget userId={userId} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? '42%' : undefined}
                    mt={isNonMobileScreens ? '-2rem' : '2rem'}
                    >
                    <PostsWidget userId={userId} isProfile={true} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProfilePage