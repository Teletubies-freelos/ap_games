import { useState } from "react";
import { Badge, Button, Link as MuiLink, Grid, List, ListItem, Menu, Stack, Typography, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';

interface NotificationsProps {
    notifications: any[],
    updateNotifications: React.Dispatch<React.SetStateAction<any[]>>
}

export function Notifications({ notifications, updateNotifications }: NotificationsProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: "25rem"
                    }
                }}
                sx={
                    {
                        "& .MuiMenu-paper":
                            { backgroundColor: "background.paper", },
                    }
                }
            >
                <Typography variant='h2' padding='1rem'>Notificaciones</Typography>
                <List>
                    {
                        notifications?.map((created_at) => (
                            <ListItem
                                key={created_at}
                                sx={{
                                    backgroundColor: "background.default",
                                    marginBottom: "0.3rem",
                                    paddingRight: "1rem",
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    paddingTop: '1.5rem'
                                }}>
                                <Grid container spacing={2} alignItems={"center"} >
                                    <Grid item xs={2} children={<NotificationsIcon />} />
                                    <Grid item xs={10} >
                                        <Typography fontWeight={"600"} variant="h3">¡Tienes 1 pedido nuevo!</Typography>
                                        <Typography color={"#9C9EAB"} marginTop={"0.5rem"}>Fecha: {(new Date(created_at).toDateString())}</Typography>
                                        <Typography color={"#9C9EAB"}>Hora: {(new Date(created_at).toLocaleTimeString())}</Typography>
                                    </Grid>
                                </Grid>
                                <MuiLink
                                    component={Link}
                                    sx={{ textDecoration: 'none' }}
                                    to='/orders'
                                >
                                    Ver Pedidos
                                </MuiLink>
                            </ListItem>
                        ))
                    }
                </List>
                <Stack direction={'row'} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"}>
                    <Button color="inherit" onClick={() => { updateNotifications([]) }}>Limpiar</Button>
                    <Button color="inherit" onClick={handleClose}>Cerrar</Button>
                </Stack>
            </Menu>
            <IconButton>
                <Badge badgeContent={notifications?.length} color="secondary" onClick={handleMenu}>
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </>
    )
}