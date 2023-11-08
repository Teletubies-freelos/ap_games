import { Stack, Typography } from "@mui/material"
import { Notifications } from "../notifications/Notifications"
import { useChannel } from "ably/react";
import { useMemo, useRef, useState } from "react";
import { IOrders } from "../../services/Orders";
import { useGetList } from "data_providers";
import { AsyncProviderNames } from "../../types/providers";
import { useQuery } from "@tanstack/react-query";

interface NavBarProps {
    name: string
}

export function NavBar({ name }: NavBarProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [notifications, updateNotifications] = useState<any[]>([]);
    const getAllOrders = useGetList<IOrders>(AsyncProviderNames.ORDERS);

    const queryData = useQuery(
        ['all_orders_limited'],
        async () => await getAllOrders({ pagination: { limit: 10 } })
    );

    const lastOrders = (queryData?.data ?? []).sort((a: IOrders, b: IOrders) => {
        return (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime()
    }).slice(0, 4).map(({ created_at }) => {
        return created_at
    })
    
    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    useMemo(() => {
        updateNotifications([...notifications, ...lastOrders])
    }, [queryData?.data])


    useChannel("orders", (message: any) => {
        const { data: { created_at } } = message ?? {}
        playSound();
        updateNotifications([created_at, ...notifications])
    });

    return (
        <Stack gap='1rem' direction="row" display={"flex"} justifyContent={"space-between"} padding={5}>
            <Typography variant='h1' padding='1rem'>
                {name}
            </Typography>
            <Notifications notifications={notifications} updateNotifications={updateNotifications} />
            <audio ref={audioRef}>
                <source src="https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=short-success-sound-glockenspiel-treasure-video-game-6346.mp3" type="audio/mpeg" />
            </audio>
        </Stack>
    )
}