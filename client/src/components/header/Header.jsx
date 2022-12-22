import { AppBar,Toolbar, Typography, styled } from "@mui/material";

const Component = styled(AppBar)`
background: #fff;
color: #000;
`

const Header = () => {
    return (
        <Component>
            <Toolbar>
                <Typography>Home</Typography>
            </Toolbar>
        </Component>
    )
}

export default Header;