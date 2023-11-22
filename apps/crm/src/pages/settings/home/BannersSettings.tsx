import { Autocomplete, Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IFeaturedProduct } from '../../../services/FeaturedProducts';
import { ChangeEvent, ChangeEventHandler, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCreateOne, useDeleteOne, useGetList, useUpdateOne } from 'data_providers';
import { AsyncProviderNames } from '../../../types/providers';
import { env } from '../../../config';
import axios from 'axios';
import { ActionsEnum } from '../../../utils';
import { useDebounce } from 'use-debounce';
import SearchIcon from '@mui/icons-material/Search';

interface ISearchBarQuery {
    name: string;
    product_id: number;
}

const BannnerImage = ({ url, title, onClick }: { url: string, title: string, onClick: any }) => (
    <Box
        display="flex"
        height="9rem"
        width="25rem"
        alignItems="center"
        borderRadius={2.5}
        position="relative"
    >
        <IconButton
            sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.5);'
            }}
            onClick={onClick}
            children={<KeyboardArrowUpIcon />}
        />
        <img
            src={url}
            srcSet={url}
            alt={url}
            style={{
                height: "100%",
                width: "100%",
                contain: "fit",
            }}
            loading="lazy"
        />
    </Box>
);

export const BannerSettings = () => {
    const queryClient = useQueryClient();
    const [selectedFeaturedId, setSelectedFeatureId] = useState(0);
    const [fileName, setFileName] = useState<string>("");
    const getAllFeatured = useGetList<IFeaturedProduct>(AsyncProviderNames.FEATURED);
    const updateFeatured = useUpdateOne(AsyncProviderNames.FEATURED);
    const deleteFeatured = useDeleteOne(AsyncProviderNames.FEATURED);
    const createFeatured = useCreateOne(AsyncProviderNames.FEATURED);
    const [search, setSearch] = useState<string>()
    const searchProduct = useGetList<ISearchBarQuery>(AsyncProviderNames.PRODUCTS)
    const [valueDebounced] = useDebounce(search, 1000);
    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event: any) => {
        setSearch(event.target.value)
    }
    const inputFile = useRef(null);

    const { data: featuredProducts } = useQuery(
        ['all_featured_table'],
        async () => await getAllFeatured()
    );

    const { data: foundProducts } = useQuery(['search_products', valueDebounced], {
        queryFn: async () => await searchProduct({
            filter: {
                name: valueDebounced,
                isAlike: true
            },
        }),
        enabled: !!valueDebounced
    })

    const { watch, register, handleSubmit, reset, setValue } = useForm<IFeaturedProduct>({
        defaultValues: {
            is_offer: false,
            featured_id: 0,
            product_id: 0,
            offer_price: 0,
            price: 0,
            banner_img_url: "",
            description: "",
            title: ""
        },
    });

    useMemo(() => {
        const foundFeatured = featuredProducts?.find(({ featured_id }) => selectedFeaturedId === featured_id);
        if (foundFeatured) {
            setValue("is_offer", foundFeatured?.is_offer);
            setValue("featured_id", foundFeatured?.featured_id);
            setValue("product_id", foundFeatured?.product_id);
            setValue("offer_price", foundFeatured?.offer_price);
            setValue("price", foundFeatured?.price);
            setValue("banner_img_url", foundFeatured?.banner_img_url);
            setValue("description", foundFeatured?.description);
            setValue("title", foundFeatured?.title);
        }
    }, [selectedFeaturedId]);

    const { mutateAsync } = useMutation(
        ['update_product'],
        async ({ payload, action }: { payload: any, action: ActionsEnum }) => {
            if (action == ActionsEnum.DELETE) {
                return await deleteFeatured(payload);
            }
            if (selectedFeaturedId != 0) {
                return await updateFeatured(payload);
            }
            return await createFeatured(payload);
        },
        {
            onSuccess: (newFeatured) => {
                queryClient.invalidateQueries(
                    ['all_featured_table'],
                    newFeatured?.featured_id
                );
                reset();
                setSelectedFeatureId(0);
                setFileName("");
                setSearch("");
            },
        }
    );

    const onSubmit = async (featuredProduct: IFeaturedProduct) => {
        await mutateAsync({ payload: featuredProduct, action: ActionsEnum.CREATE });
    };

    const handleChange = async (
        event: ChangeEvent<HTMLInputElement>,
        imageKey: string
    ) => {
        const [file] = event.target.files ?? [];

        const formData = new FormData();

        formData.append('file', file);

        const { data } = await axios.post(
            `${env.PHOTO_UPLOAD_URL}/index.php`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        setFileName(data);
        setValue("banner_img_url", `${env.PHOTO_UPLOAD_URL}/${data}`);
    };

    const handleDeleteFeatured = async () => {
        mutateAsync({ payload: selectedFeaturedId, action: ActionsEnum.DELETE });
    }

    return (
        <Stack gap={'1rem'} padding={'2rem'}>
            <Box sx={{ backgroundColor: 'background.paper' }} borderRadius={2.5}>
                <Typography variant='h2' padding='2rem' fontWeight={600} fontSize={'1.5rem'}>Banners</Typography>
                <Box display="flex" paddingX={"2rem"} paddingBottom={"2rem"} gap="1.5rem">
                    {
                        featuredProducts?.map(({ banner_img_url, featured_id, title }) => (
                            <BannnerImage url={banner_img_url} title={title} onClick={() => setSelectedFeatureId(featured_id)} />
                        ))
                    }
                </Box>
                <Box sx={{ backgroundColor: "background.default" }} borderRadius={2.5} marginX={"2rem"} marginBottom={"2rem"}>
                    <Stack direction={"row"} width={"100%"} padding={'2rem'} gap={10}>
                        <Box width={"40%"}>
                            <Typography variant='h3' >{watch('title') ?? 'Imagen'}</Typography>
                            {
                                watch("banner_img_url") && <img
                                    src={watch("banner_img_url")}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "contain",
                                    }} />
                            }
                        </Box>
                        <Box width={"60%"}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box paddingX={"1rem"} paddingBottom={"1rem"}>
                                    <Typography variant='h2' fontSize={'1rem'} paddingBottom={1}>Imagen</Typography>
                                    <Stack direction={"row"} gap={2} alignItems={"center"}>
                                        <input
                                            hidden
                                            type='file'
                                            accept='image/*'
                                            onChange={(e) => handleChange(e, 'imgUrl')}
                                            ref={inputFile}
                                        />
                                        <Button
                                            sx={{ borderStyle: 'solid', width: '7rem', border: '1px solid' }}
                                            onClick={() => {
                                                // @ts-ignore
                                                inputFile?.current.click()
                                            }}
                                        >
                                            <Typography fontSize={'0.7rem'} fontWeight={500} lineHeight={"15px"} letterSpacing={"-0.2px"} >Subir Imagen</Typography>
                                        </Button>
                                        <Typography variant='h2' fontSize={'0.5rem'}>{fileName}</Typography>
                                    </Stack>
                                </Box>
                                <Box padding={"1rem"}>
                                    <Typography variant='h2' fontSize={'1rem'} paddingBottom={1}>Título</Typography>
                                    <TextField
                                        multiline
                                        sx={{ backgroundColor: "background.paper" }}
                                        type='text'
                                        fullWidth
                                        {...register('title')}
                                    />
                                </Box>
                                <Box padding={"1rem"}>
                                    <Typography variant='h2' fontSize={'1rem'} paddingBottom={1}>Descripción</Typography>
                                    <TextField
                                        multiline
                                        sx={{ backgroundColor: "background.paper" }}
                                        type='text'
                                        fullWidth
                                        {...register('description')}
                                    />
                                </Box>
                                <Box padding={"1rem"}>
                                    <Typography variant='h2' fontSize={'1rem'} paddingBottom={1}>Producto</Typography>
                                    <Autocomplete
                                        options={foundProducts?.map(({ product_id, name }) => ({ name, product_id })) ?? []}
                                        freeSolo
                                        sx={{
                                            width: {
                                                xs: '90vw',
                                                md: 'unset'
                                            },
                                            backgroundColor: "background.paper",
                                            borderRadius: ".25rem",
                                            "& .MuiAutocomplete-endAdornment": {
                                                display: 'none'
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                onChange={handleSearchChange}
                                                value={search}
                                                InputProps={{
                                                    ...params.InputProps,
                                                    type: 'search',
                                                    startAdornment: (<InputAdornment position="start" sx={{ paddingLeft: '0.5rem' }} children={<SearchIcon />} />)
                                                }}
                                            />
                                        )}
                                        getOptionLabel={(option: any) => {
                                            if (typeof option === 'string') {
                                                return option;
                                            } else {
                                                return option.name || '';
                                            }
                                        }}
                                        // @ts-ignore
                                        onChange={(_, value) => setValue("product_id", value!.product_id)}
                                    />
                                </Box>
                                <Box width={"100%"}>
                                    {
                                        selectedFeaturedId != 0 ?
                                            <>
                                                <Button sx={{ width: "50%" }} onClick={handleDeleteFeatured}>Eliminar Producto</Button>
                                                <Button sx={{ width: "50%" }} variant="contained" type='submit'>Guardar Producto</Button>
                                            </>
                                            : <Button sx={{ width: "100%" }} variant="contained" type='submit'>Crear Producto</Button>
                                    }
                                </Box>
                            </form>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Stack>
    );
};
