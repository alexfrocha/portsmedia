import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme()
    const dark = palette.neutral.dark
    const main = palette.neutral.main
    const medium = palette.neutral.medium

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant='h5' fontWeight='500'>
                    Patrocinado
                </Typography>
                <Typography color={medium}>
                    Criar Anúncio
                </Typography>
            </FlexBetween>

            <img
                width='100%'
                height='auto'
                alt="advert"
                src="https://api-portsmedia.herokuapp.com/assets/info4.jpeg"
                style={{ borderRadius: '0.75rem', margin: '0.75rem 0'}}    
            />
            <FlexBetween>
                <Typography color={main}>MikaCosméticos</Typography>
                <Typography color={medium}>mikacosmeticos.com</Typography>
            </FlexBetween>
            <Typography color={medium} m='0.5rem 0'>
            Seu caminho para uma beleza deslumbrante e imaculada e garante que sua pele esteja brilhando como a luz.
            </Typography>

        </WidgetWrapper>
    )


}

export default AdvertWidget