

import { Box, Typography, styled } from '@mui/material';

import Welcome from '../Assets/Images/welcome.jpg';


const Header = styled(Box)`
    margin: 50px;
    & > div {
        margin-top: 50px;
    }
`;

const Image = styled('img')({
    width: '100%',
    height: '30%'
});

const CodeForInterview = () => {

    return (
        <Header>
            <Typography variant="h4" sx={{alignText:"center",justifyContent:"center"}}>WELCOME TO PRODUCT MASTER</Typography>

            
            <Box style={{display: 'flex'}}>
                <Image src={Welcome} />
               
            </Box>
        </Header>
    )
}

export default CodeForInterview;