import { useForm } from "react-hook-form";
import { Autocomplete, Box, Button, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import { DropDown } from "../../../../../../../packages/ui/src";
import { DeliveryCostsTypes, IDeliveryCosts, IDeliveryCostsDetail, deliveryCostsTypesText } from "../../../../services/DeliveryCosts";
import { useCreateOne, useGetList } from "data_providers";
import { AsyncProviderNames } from "../../../../types/providers";
import { useDebounce } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEventHandler, useMemo, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { GeolocationPathEnum, IGeolocation, SubPath } from "../../../../services/Geolocation";
import { useQueryCategory } from "../../../../hooks/useQueryCategory";
import { setModalState } from "../../../../observables";
import { IFormDeliveryCostDetail } from "./DeliveryCostDetailData";
import { getFirstElement } from "../../../../utils";
import { useDeliveryCosts } from "../../../../hooks/useDeliveryCosts";


export const DeliveryCostUpdate = ({ data }: { data: IDeliveryCosts }) => {

    const { mutateDelete } = useDeliveryCosts({});
    const { register, handleSubmit, watch, reset } = useForm<IFormDeliveryCostDetail>({
        defaultValues: {
            type: data.type,
            description: data.description,
            department_id: 0,
            district_id: 0,
            price: data.price,
            category_id: getFirstElement(data.delivery_costs_details)?.category_id,
            sub_category_id: getFirstElement(data.delivery_costs_details)?.sub_category_id
        }
    });


    const searchDistrictsInLima = useGetList<IGeolocation>(AsyncProviderNames.GEOLOCATION)
    const searchDepartments = useGetList<IGeolocation>(AsyncProviderNames.GEOLOCATION)
    const [deliveryCostType, _] = useState<DeliveryCostsTypes>(data?.type as DeliveryCostsTypes);
    const [selections, setSelections] = useState<any[]>([]);
    const { data: categories } = useQueryCategory({});

    useMemo(async () => {
        if (data) {
            if (deliveryCostType == DeliveryCostsTypes.CONFIG_BY_DEPARTMENT) {
                const departmentIds = data?.delivery_costs_details?.map(({ department_id }) => department_id) || [];

                setSelections(await searchDepartments({
                    filter: {
                        values: departmentIds,
                    },
                }, {
                    path: GeolocationPathEnum.BY_DEPARTMENT,
                    subPath: SubPath.GET_ALL
                }))
            } else {
                const districtIds = data?.delivery_costs_details?.map(({ district_id }) => district_id) || [];
                setSelections(await searchDistrictsInLima({
                    filter: {
                        values: districtIds,
                    },
                }, {
                    path: GeolocationPathEnum.ONLY_DISTRICTS_LIMA,
                    subPath: SubPath.GET_ALL
                }))
            }
        }
    }, [data])

    const queryClient = useQueryClient();

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event: any) => {
        setSearch(event.target.value)
    }

    const [search, setSearch] = useState<string>();
    const createOneDeliveryCosts = useCreateOne<any>(AsyncProviderNames.DELIVERY_COSTS)

    const [valueDebounced] = useDebounce(search, 1000);

    const { data: locations } = useQuery(['search_geolocation', valueDebounced], {
        queryFn: async () => {
            if (deliveryCostType == DeliveryCostsTypes.CONFIG_BY_DEPARTMENT) {
                return await searchDepartments({
                    filter: {
                        search: valueDebounced,
                    },
                }, {
                    path: GeolocationPathEnum.BY_DEPARTMENT,
                    subPath: SubPath.GET_FILTERED
                })
            }
            return await searchDistrictsInLima({
                filter: {
                    search: valueDebounced,
                },
            }, {
                path: GeolocationPathEnum.ONLY_DISTRICTS_LIMA,
                subPath: SubPath.GET_FILTERED
            })
        },
        enabled: !!valueDebounced
    })


    const onDelete = (value: any) => () => {
        setSelections((prev) => {
            return [
                ...prev.filter((item, _) => item.value != value)
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

    const categoriesDropDown = categories?.map(({ category_id, name }) => ({ label: name, value: category_id })) || [];
    let subCategories = categories?.find(({ category_id }) => category_id === watch("category_id"))?.sub_categories?.map(({ sub_category_id, name }) => ({
        label: name,
        value: sub_category_id
    })) || [];

    if (watch("category_id") != 0) {
        subCategories = [{ label: 'Todos', value: 0 }, ...subCategories];
    }

    const handleFinish = async (newData: IFormDeliveryCostDetail) => {
        let newValue: IDeliveryCosts = {
            delivery_costs_id: 0,
            price: newData?.price,
            description: newData?.description,
            type: newData?.type,
            delivery_costs_details: selections.map(({ value }) => {
                let newDetail: IDeliveryCostsDetail = {
                    category_id: newData?.category_id,
                    sub_category_id: newData?.sub_category_id,
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
        if (data.delivery_costs_id) {
            await mutateDelete(data.delivery_costs_id);
            await mutateAsync(newValue);
        }
    };

    const deliveryCostTypes = Object.values(DeliveryCostsTypes).map((key, _) => ({
        value: key,
        label: deliveryCostsTypesText[key as DeliveryCostsTypes],
    }))

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
            <DropDown textFieldProps={register('type')} defaultValue={watch('type')} items={deliveryCostTypes} placeHolder="Elige un tipo de costo" />
            <TextField {...register("price")} type="number" sx={{ backgroundColor: 'background.default' }} placeholder="Ingresar precio" />
            <Autocomplete
                options={locations?.map(({ label, value }) => ({ label, value })) ?? []}
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
                            placeholder: deliveryCostType == DeliveryCostsTypes.CONFIG_BY_DEPARTMENT ? 'Buscar por departamento' : 'Buscar por distritos',
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
                    if (value.value && selections.find(({ value: r }) => r == value?.value) == null) {
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
            <DropDown textFieldProps={register('category_id')} defaultValue={watch('category_id')} items={categoriesDropDown} placeHolder="Categorias" />
            <DropDown textFieldProps={register('sub_category_id')} defaultValue={watch('sub_category_id')} items={subCategories} placeHolder="Sub Categorias" disabled={watch("category_id") == 0} />
            <Button variant="contained" type="submit">Agregar</Button>
        </Box>
    )
}