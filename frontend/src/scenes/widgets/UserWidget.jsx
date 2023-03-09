import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from '@mui/icons-material'
import {Box, Typography, Divider, useTheme} from '@mui/material'
import UserImage from 'components/UserImage'
import FlexBetween from 'components/FlexBetween'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WidgetWrapper from 'components/WidgetWrapper'

const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const {palette} = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main
    const loggedInUser = useSelector((state) => state.user)

    const getUser = async () => {
        const response = await fetch(`https://api-portsmedia.herokuapp.com/users/${userId}`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`}
            }
        )
        const data = await response.json()
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [userId])

    if(!user) return null;

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    } = user;

    return (
        <WidgetWrapper>
            <FlexBetween
                gap='0.5rem'
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap='1rem'>
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant='h4'
                            color={dark}
                            fontWeight='500'
                            sx={{
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            {firstName} {lastName}
                        </Typography>
                        <Typography>
                            {friends.length} amigos
                        </Typography>
                    </Box>
                </FlexBetween>
                    { userId == loggedInUser._id && <ManageAccountsOutlined /> }
                </FlexBetween>
                
                <Divider />

                <Box p="1rem 0">
                    <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                        <LocationOnOutlined fontSize='large' sx={{ color: main }} />
                        <Typography color={medium}>{location}</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
                        <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
                        <Typography color={medium}>{occupation}</Typography>
                    </Box>
                </Box>

                <Divider />

                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Pessoas que viram o perfil</Typography>
                        <Typography color={main} fontWeight="500">
                            {viewedProfile}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween mb="0.5rem">
                        <Typography color={medium}>Impressões das suas postagens</Typography>
                        <Typography color={main} fontWeight="500">
                            {impressions}
                        </Typography>
                    </FlexBetween>
                </Box>

                <Divider />

                <Box p="1rem 0">
                    <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
                        Redes Sociais
                    </Typography>

                    <FlexBetween gap='1rem' mb='0.5rem'>
                        <FlexBetween gap='1rem' >
                            <img src='../assets/twitter.png' alt='twitter' />
                            <Box>
                                <Typography color={main} fontWeight='500'>
                                    Twitter
                                </Typography>
                                <Typography color={medium}>Rede Social</Typography>
                            </Box>
                        </FlexBetween>
                        { userId == loggedInUser._id && <EditOutlined sc={{ color: main }} /> }
                        
                    </FlexBetween>

                    <FlexBetween gap='1rem'>
                        <FlexBetween gap='1rem' >
                            <img src='../assets/linkedin.png' alt='linkedin' />
                            <Box>
                                <Typography color={main} fontWeight='500'>
                                    Linked in
                                </Typography>
                                <Typography color={medium}>Plataforma de Trabalho</Typography>
                            </Box>
                        </FlexBetween>
                        { userId == loggedInUser._id && <EditOutlined sc={{ color: main }} /> }
                    </FlexBetween>

                </Box>

        </WidgetWrapper>
    )
}

export default UserWidget