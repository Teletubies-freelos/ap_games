import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export const Title = ({ children }: PropsWithChildren)=> (<Typography fontWeight={'bolder'} fontSize={'1.2em'}>
  {children}
</Typography>)


interface InfoBannerProps {
  title: string;
  content?: string;
}

export const InfoBanner = ({title, content}:InfoBannerProps)=>(
  <Box sx={{
    padding: 2,
    backgroundColor:'background.paper'
  }}>
  <Title>
    {title}
  </Title>
  <Typography color='InactiveCaption'>
    {content}
  </Typography>
  </Box>
)
