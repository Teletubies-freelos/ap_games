import { useForm } from "react-hook-form";
import { Autocomplete, Box, Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { IFormDeliveryCostData } from "./DeliveryCostData";
import { DropDown } from "../../../../../../../packages/ui/src";
import CustomAccordion from "../../../../components/common/CustomAccordion";
import { DeliveryCostsTypes, IDeliveryCosts, IDeliveryCostsDetail, deliveryCostsTypesText } from "../../../../services/DeliveryCosts";
import { useCreateOne, useGetList } from "data_providers";
import { AsyncProviderNames } from "../../../../types/providers";
import { useDebounce } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEventHandler, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { GeolocationPathEnum, IGeolocation } from "../../../../services/Geolocation";
import { useQueryCategory } from "../../../../hooks/useQueryCategory";
import { setModalState } from "../../../../observables";

interface IFormDeliveryCostDetail extends IFormDeliveryCostData {
    department_id: number;
    district_id: number;
    category_id: number;
    sub_category_id: number;
    price: number;
}


export const DeliveryCostDetailData = ({ data }: { data: IFormDeliveryCostData }) => {
    const [deliveryCostType, _] = useState<DeliveryCostsTypes>(data?.type as DeliveryCostsTypes);
    const [selections, setSelections] = useState<any[]>([]);
    const { data: categories } = useQueryCategory({});

    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, reset } = useForm<IFormDeliveryCostDetail>({
        defaultValues: {
            type: data.type,
            description: data.description,
            department_id: 0,
            district_id: 0,
            category_id: 0,
            sub_category_id: 0
        }
    });

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event: any) => {
        setSearch(event.target.value)
    }

    const [search, setSearch] = useState<string>();
    const searchDepartments = useGetList<IGeolocation>(AsyncProviderNames.GEOLOCATION)
    const searchDistrictsInLima = useGetList<IGeolocation>(AsyncProviderNames.GEOLOCATION)
    const createOneDeliveryCosts = useCreateOne<any>(AsyncProviderNames.DELIVERY_COSTS)

    const [valueDebounced] = useDebounce(search, 1000);

    const { data: foundProducts } = useQuery(['search_geolocation', valueDebounced], {
        queryFn: async () => {
            if (deliveryCostType == DeliveryCostsTypes.CONFIG_BY_DEPARTMENT) {
                return await searchDepartments({
                    filter: {
                        search: valueDebounced,
                    },
                }, {
                    path: GeolocationPathEnum.BY_DEPARTMENT
                })
            }
            return await searchDistrictsInLima({
                filter: {
                    search: valueDebounced,
                },
            }, {
                path: GeolocationPathEnum.ONLY_DISTRICTS_LIMA
            })
        },
        enabled: !!valueDebounced
    })

    const onDelete = (value: any) => () => {
        setSelections((prev) => {
            return [
                ...prev.filter((item, i) => item.value != value)
            ]
        })
    };
    const { mutateAsync } = useMutation(
        ['create_delivery_cost'],
        async (payload: IDeliveryCosts) => {
            return await createOneDeliveryCosts(payload);
        },
        {
            onSuccess: (newDeliveryCost) => {
                queryClient.invalidateQueries(
                    ['all_delivery_costs_table'],
                    newDeliveryCost?.delivery_costs_id
                );
                reset();
                setModalState(undefined);
            },
        }
    );
    const categoriesDropDown = categories?.map(({ category_id, name }) => ({ label: name, value: category_id }));
    const subCategories = categories?.find(({ category_id }) => category_id == watch("category_id"))?.sub_categories?.map(({ sub_category_id, name }) => ({ label: name, value: sub_category_id }));

    const handleFinish = async (data: IFormDeliveryCostDetail) => {
        let newValue: IDeliveryCosts = {
            delivery_costs_id: 0,
            price: data?.price,
            description: data?.description,
            type: data?.type,
            detail: selections.map(({ value }) => {
                let newDetail: IDeliveryCostsDetail = {
                    category_id: data?.category_id,
                    sub_category_id: data?.sub_category_id,
                    department_id: 0,
                    district_id: 0,
                    delivery_costs_id: 0
                };

                if (deliveryCostType == DeliveryCostsTypes.CONFIG_BY_DEPARTMENT) {
                    newDetail.department_id = value;
                }
                else if (deliveryCostType == DeliveryCostsTypes.ONLY_LIMA) {
                    newDetail.department_id = 15;
                    newDetail.district_id = value;
                }

                return newDetail;
            })
        }
        await mutateAsync(newValue);
    };

    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit(handleFinish)}
            display='flex'
            flexDirection='column'
            gap='.75rem'
            padding='1.4rem'
        >
            <TextField {...register("description")} sx={{ backgroundColor: 'background.default' }} placeholder="Ingresa un nombre para identificarlo" />
            <CustomAccordion
                header={
                    <Typography>Tipo de Costo</Typography>
                }
                content={
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        padding='.5rem 0'>
                        <Typography>Tipo</Typography>
                        <Typography>{deliveryCostsTypesText[data.type as DeliveryCostsTypes]}</Typography>
                    </Box>
                } />
            <TextField {...register("price")} type="number" sx={{ backgroundColor: 'background.default' }} placeholder="Ingresar precio" />
            <Autocomplete
                options={foundProducts?.map(({ label, value }) => ({ label, value })) ?? []}
                freeSolo
                sx={{
                    width: {
                        xs: '90vw',
                        md: 'unset'
                    },
                    backgroundColor: "background.default",
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
                            placeholder: 'Buscar',
                            startAdornment: (<InputAdornment position="start" sx={{ paddingLeft: '0.5rem' }} children={<SearchIcon />} />)
                        }}
                    />
                )}
                getOptionLabel={(option: any) => {
                    if (typeof option === 'string') {
                        return option;
                    } else {
                        return option.label || '';
                    }
                }}
                onChange={(_, value) => {
                    // @ts-ignore
                    if (selections.find(({ value: r }) => r == value?.value) == null) {
                        // @ts-ignore
                        setSelections(prev => [...prev, { label: value?.label, value: value?.value }])
                    }
                }}
            />
            <Box
                sx={{
                    '& > :not(:last-child)': { mr: 1, pt: '0.1rem' },
                    '& > *': { mr: 1, mt: 1 },
                }}
            >
                {
                    selections.map(({ value, label }) => <Chip key={value} label={label} onDelete={onDelete(value)} />)
                }
            </Box>
            <Typography>Asigna la categoría y subcategoría del costo de envío</Typography>
            <DropDown textFieldProps={register('category_id')} items={categoriesDropDown} placeHolder="Categorias" />
            <DropDown textFieldProps={register('sub_category_id')} items={subCategories} placeHolder="Sub Categorias" disabled={watch("category_id") == 0} />
            <Button variant="contained" type="submit">Agregar</Button>
        </Box>
    )
}