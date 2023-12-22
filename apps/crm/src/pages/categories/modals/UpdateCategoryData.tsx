import { Box, Button, Chip, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { setModalState } from "../../../observables";
import { useQueryCategory } from "../../../hooks/useQueryCategory";
import { CustomInputField } from "../../../../../../packages/ui/src";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { ICategory, ISubCategory } from "../../../services/Categories";

export interface IFormUpdateCategoryData {
    name: string;
};

export const UpdateCategoryData = ({ data }: { data: ICategory }) => {
    const { handleSubmit, reset, control, formState: { errors } } = useForm<IFormUpdateCategoryData>({
        defaultValues: {
            name: data.name
        }
    });

    const [selections, setSelections] = useState<string[]>(data?.sub_categories?.map(({ name }) => name) ?? []);
    const [newestSelections, setNewestSelections] = useState<string[]>([]);
    const [inputText, setInputText] = useState<string>('');


    const { mutateUpdate } = useQueryCategory({ reset });

    const sub_categories_to_delete: ISubCategory[] = data.sub_categories?.filter(
        (subCategory) => !selections.includes(subCategory.name)
    ) || [];

    const handleFinish = async (info: IFormUpdateCategoryData) => {

        const newData: ICategory = {
            ...data,
            name: info.name,
            // @ts-ignore
            sub_categories_to_create: newestSelections.map((name) => ({
                name,
                category_id: data.category_id
            })),
            sub_categories_to_delete
        }
        try {
            await mutateUpdate(newData);
        } catch (error) {
            
        }
        finally {
            setModalState(undefined);
        }
    };

    const handleTextValidationAndAddition = (text: string) => {
        const isTextAlreadySelected = selections.includes(text);

        if (!isTextAlreadySelected) {
            setSelections((prevSelections) => [...prevSelections, text]);
            setNewestSelections((prevSelections) => [...prevSelections, text])
        }

        // Clear the input field
        setInputText('');
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleTextValidationAndAddition(inputText);
        }
    };

    const onDelete = (value: string) => () => {
        setSelections((prevSelections) => prevSelections.filter((item) => item !== value));
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
            <CustomInputField
                name="name"
                control={control}
                width='100%'
                label='Ingresa un nombre para identificarlo'
                data-testid='text'
                type='text'
                inputMode='text'
                error={!!errors.name}
                helperText={errors.name?.message}
                rules={{ required: 'Ingresar nombre' }}
            />
            <TextField
                sx={{ backgroundColor: 'background.default' }}
                placeholder="Ingresa un nombre para la subcategoria"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Box
                sx={{
                    '& > :not(:last-child)': { mr: 1, mb: 1 },
                    '& > :last-child': { mb: 1 },
                }}
            >
                {selections.map((text) => (
                    <Chip
                        key={text}
                        label={text}
                        onDelete={onDelete(text)}
                        deleteIcon={<ClearIcon />}
                    />
                ))}
            </Box>
            <Button variant="contained" type="submit">Actualizar Categoría</Button>
        </Box>
    );
}
