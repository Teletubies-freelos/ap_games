import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { IFormDeliveryCostData } from "./DeliveryCostData";
import { DropDown, LoadingPage } from "../../../../../../../packages/ui/src";
import { IDeliveryCosts, IDeliveryCostsDetail } from "../../../../services/DeliveryCosts";
import { useCreateOne, useGetList } from "data_providers";
import { AsyncProviderNames } from "../../../../types/providers";
import { useDebounce } from "use-debounce";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEventHandler, useMemo, useState } from "react";
import { GeolocationPathEnum, IGeolocation, SubPath } from "../../../../services/Geolocation";
import { useQueryCategory } from "../../../../hooks/useQueryCategory";
import { setModalState } from "../../../../observables";
import FilterChips from "../../../../components/common/FilterChips";

export interface IFormDeliveryCostDetail extends IFormDeliveryCostData {
    department_id: number;
    province_id: number;
    category_id: number;
    sub_category_id: number;
    price: number;
}

export const DeliveryCostDetailData = ({ data }: { data: IFormDeliveryCostData }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { register, handleSubmit, watch, reset } = useForm<IFormDeliveryCostDetail>({
        defaultValues: {
            type: data.type,
            description: data.description,
            category_id: -1,
            sub_category_id: -1
        }
    });

    const { data: categories } = useQueryCategory({});

    const geolocationService = useGetList<IGeolocation>(AsyncProviderNames.GEOLOCATION);
    const createOneDeliveryCosts = useCreateOne<any>(AsyncProviderNames.DELIVERY_COSTS);

    const [deparmentSelections, setDeparmentsSelections] = useState<any[]>([]);
    const [provinceSelections, setProvicesSelections] = useState<any[]>([]);
    const [districtSelections, setDistrictsSelections] = useState<any[]>([]);

    const [department, setDepartment] = useState<string>();
    const [province, setProvince] = useState<string>();
    const [district, setDistrict] = useState<string>();

    const handleDeparmentSearchChange: ChangeEventHandler<HTMLInputElement> = (event: any) => {
        setDepartment(event.target.value)
    }
    const handleProvinceSearchChange: ChangeEventHandler<HTMLInputElement> = (event: any) => {
        setProvince(event.target.value)
    }
    const handleDistrictSearchChange: ChangeEventHandler<HTMLInputElement> = (event: any) => {
        setDistrict(event.target.value)
    }

    const [deparmentDebounced] = useDebounce(department, 500);

    const { data: departments } = useQuery(['search_deparments', deparmentDebounced], {
        queryFn: async () => {
            return await geolocationService({
                filter: {
                    search: department,
                },
            }, {
                path: GeolocationPathEnum.GET_DEPARMENT,
                subPath: SubPath.GET_FILTERED
            })
        },
        enabled: !!deparmentDebounced
    })
    const { data: allDepartments } = useQuery(['search_deparments_all'], {
        queryFn: async () => {
            return await geolocationService({
                filter: {
                    search: "",
                },
            }, {
                path: GeolocationPathEnum.GET_DEPARMENT,
                subPath: SubPath.GET_FILTERED
            })
        }
    })
    const [allProvinces, setAllProvinces] = useState<IGeolocation[]>();

    useMemo(async () => {
        const all = await geolocationService({
            filter: {
                deparments: deparmentSelections.map(({ value }) => value),
                search: ""
            },
        }, {
            path: GeolocationPathEnum.GET_PROVINCE,
            subPath: SubPath.GET_FILTERED
        })
        setAllProvinces(all);
    }, [deparmentSelections, province])

    const [allDistricts, setAllDistricts] = useState<IGeolocation[]>();
    useMemo(async () => {
        const all = await geolocationService({
            filter: {
                deparments: deparmentSelections.map(({ value }) => value),
                provinces: provinceSelections.map(({ value }) => value),
                search: "",
            },
        }, {
            path: GeolocationPathEnum.GET_DISTRICTS,
            subPath: SubPath.GET_FILTERED
        })
        setAllDistricts(all);
    }
        , [provinceSelections, district])

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

    let categoriesDropDown = categories?.map(({ category_id, name }) => ({ label: name, value: category_id })) || [];
    categoriesDropDown = [{ label: 'Todos', value: 0 }, ...categoriesDropDown];

    let subCategories = categories?.find(({ category_id }) => category_id === watch("category_id"))?.sub_categories?.map(({ sub_category_id, name }) => ({
        label: name,
        value: sub_category_id
    })) || [];

    if (watch("category_id") != 0) {
        subCategories = [{ label: 'Todos', value: 0 }, ...subCategories];
    }
    else if (watch("category_id") == 0) {
        subCategories = [{ label: 'Consolas', value: 1 }, { label: 'Videojuegos', value: 2 }, { label: 'Accesorios', value: 3 }, { label: 'Coleccionables', value: 4 }];
    }

    const handleFinish = async (data: IFormDeliveryCostDetail) => {
        try {
            setIsLoading(true);

            const permutations: IDeliveryCostsDetail[] = [];
            for (const { value: deparmentValue } of deparmentSelections) {
                for (const { value: provinceValue } of (provinceSelections.length > 0 ? provinceSelections : [{ value: 0 }])) {
                    for (const { value: districtValue } of (districtSelections.length > 0 ? districtSelections : [{ value: 0 }])) {
                         var newDetail: IDeliveryCostsDetail = {
                            delivery_costs_id: 0,
                            department_id: deparmentValue,
                            district_id: districtValue,
                            province_id: provinceValue,
                            category_id: data?.category_id,
                            sub_category_id: data?.sub_category_id,
                        };

                        permutations.push(newDetail);
                    }
                }
            }

            let newValue: IDeliveryCosts = {
                delivery_costs_id: 0,
                price: data?.price,
                description: data?.description,
                type: data?.type,
                delivery_costs_details: permutations
            }
            await mutateAsync(newValue);
        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingPage minHeight={"50rem"} />
    }
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
            <TextField {...register("price")} type="number" sx={{ backgroundColor: 'background.default' }} placeholder="Ingresar precio" />
            <FilterChips
                values={department != "" && department != undefined ? departments : allDepartments}
                selections={deparmentSelections}
                handleSelections={setDeparmentsSelections}
                debounceValueSearch={department}
                handleSearchChange={handleDeparmentSearchChange}
                placeholder={"Buscar por departamento"}
                disabled={false}
            />
            <FilterChips
                values={[{ label: "Todos", value: 0 },...(allProvinces ?? []) ]}
                selections={provinceSelections}
                handleSelections={setProvicesSelections}
                debounceValueSearch={province}
                handleSearchChange={handleProvinceSearchChange}
                placeholder={"Buscar por provincia"}
                disabled={deparmentSelections.length <= 0}
            />
            <FilterChips
                values={[{ label: "Todos", value: 0 },...(allDistricts ?? []) ]}
                selections={districtSelections}
                handleSelections={setDistrictsSelections}
                debounceValueSearch={district}
                handleSearchChange={handleDistrictSearchChange}
                placeholder={"Buscar por distrito"}
                disabled={provinceSelections.length <= 0}
            />
            <Typography>Asigna la categoría y subcategoría del costo de envío (Si no seleccionas ninguno aplicará a todos)</Typography>
            <DropDown textFieldProps={register('category_id')} items={categoriesDropDown} placeHolder="Categorias" />
            <DropDown textFieldProps={register('sub_category_id')} items={subCategories} placeHolder="Sub Categorias" disabled={watch("category_id") == -1} />
            <Button variant="contained" type="submit">Agregar</Button>
        </Box>
    )
}