import {useTheme, Theme} from "@mui/material/styles";

type PaletteColorKey = "primary" | "secondary"; // more custom
type ShadeKey = 'main' | 'light' | 'dark';

const useActionColors = (colorKey :`${PaletteColorKey}.${ShadeKey}` = 'secondary.main') =>{
    const theme = useTheme();
    const [color, shade] = colorKey.split('.') as [PaletteColorKey, ShadeKey];

    const baseColor = (theme.palette[color][shade]  || theme.palette.grey[500]);



    return {
        ...theme,
        action: {

            hover: `${baseColor}99`,  // 60
            active: `${baseColor}66`,  // 40
        }
    }
    

}