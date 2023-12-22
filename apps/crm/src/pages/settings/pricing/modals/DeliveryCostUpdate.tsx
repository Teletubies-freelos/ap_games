import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
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
import { IFormDeliveryCostDetail } from "./DeliveryCostDetailData";
import { getFirstElement } from "../../../../utils";
import { useDeliveryCosts } from "../../../../hooks/useDeliveryCosts";
import FilterChips from "../../../../components/common/FilterChips";

export const DeliveryCostUpdate = ({ data }: { data: IDeliveryCosts }) => {
    console.log("🚀 ~ file: DeliveryCostUpdate.tsx:19 ~ DeliveryCostUpdate ~ data:", data)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: categories } = useQueryCategory({});
    const { mutateDelete } = useDeliveryCosts({});

    const geolocationService = useGetList<IGeolocation>(AsyncProviderNames.GEOLOCATION);
    const createOneDeliveryCosts = useCreateOne<any>(AsyncProviderNames.DELIVERY_COSTS);

    const { register, handleSubmit, watch, reset } = useForm<IFormDeliveryCostDetail>({
        defaultValues: {
            type: data.type,
            description: data.description,
            department_id: 0,
            province_id: 0,
            price: data.price,
            category_id: getFirstElement(data.delivery_costs_details)?.category_id,
            sub_category_id: getFirstElement(data.delivery_costs_details)?.sub_category_id
        }
    });

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

    useMemo(async () => {
        if (data) {
            const districtIds = data?.delivery_costs_details?.map(({ district_id }) => "0" + district_id?.toString()) || [];
            const departmentsIds = data?.delivery_costs_details?.map(({ department_id }) => "0" + department_id?.toString()) || [];
            const provincesIds = data?.delivery_costs_details?.map(({ province_id }) => "0" + province_id?.toString()) || [];
            // @ts-ignore
            const {
                // @ts-ignore
                deparments: departmentsObj = [],
                // @ts-ignore
                provinces: provincesObj = [],
                // @ts-ignore
                districts: districtsObj = []
            } = await geolocationService({
                filter: {
                    departmentsIds,
                    provincesIds,
                    districtIds
                },
            }, {
                path: GeolocationPathEnum.GET_ALL,
                subPath: SubPath.GET_FILTERED
            })

            setDeparmentsSelections(departmentsObj);
            setProvicesSelections(provincesObj);
            setDistrictsSelections(districtsObj);
        }
    }, [data])

    const queryClient = useQueryClient();


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

    const handleFinish = async (newData: IFormDeliveryCostDetail) => {
        try {
            setIsLoading(true);

            const permutations: IDeliveryCostsDetail[] = [];
            for (const { value: deparmentValue } of deparmentSelections) {
                for (const { value: provinceValue } of (provinceSelections.length > 0 ? provinceSelections : [{ value: 0 }])) {
                    for (const { value: districtValue } of (districtSelections.length > 0 ? districtSelections : [{ value: 0 }])) {
                        const newDetail: IDeliveryCostsDetail = {
                            delivery_costs_id: 0,
                            department_id: deparmentValue,
                            district_id: districtValue,
                            province_id: provinceValue,
                            category_id: newData?.category_id,
                            sub_category_id: newData?.sub_category_id,
                        };

                        permutations.push(newDetail);
                    }
                }
            }

            let newValue: IDeliveryCosts = {
                delivery_costs_id: 0,
                price: newData?.price,
                description: newData?.description,
                type: newData?.type,
                delivery_costs_details: permutations
            };

            if (data.delivery_costs_id) {
                await mutateDelete(data.delivery_costs_id);
                await mutateAsync(newValue);
            }
        } 
        catch (error) 
        {
            console.error(error)
        }
        finally
        {
            setIsLoading(false);
        }
    };

    if(isLoading){
        return <LoadingPage minHeight={"50rem"}/>
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
            {/* <DropDown textFieldProps={register('type')} defaultValue={watch('type')} items={deliveryCostTypes} placeHolder="Elige un tipo de costo" /> */}
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
            <Typography>Asigna la categoría y subcategoría del costo de envío</Typography>
            <DropDown textFieldProps={register('category_id')} defaultValue={watch('category_id')} items={categoriesDropDown} placeHolder="Categorias" />
            <DropDown textFieldProps={register('sub_category_id')} defaultValue={watch('sub_category_id')} items={subCategories} placeHolder="Sub Categorias" disabled={watch("category_id") == -1} />           <Button variant="contained" type="submit">Actualizar</Button>
        </Box>
    )
}