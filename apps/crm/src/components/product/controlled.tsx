import { Box, InputAdornment, TextField } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

interface ProductData{
  name: string;
  price: string;
  priceOffer?: string;
  description?: string;
}



export const Product = ()=>{
  const { control, handleSubmit } = useForm<ProductData>()

  const onSubmit: SubmitHandler<ProductData> = (data)=>{
    console.log(data)
  }

  return(
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)} >
      <Controller
        name={'name'} 
        control={control}
        rules={{ required: true }}
        render={({field})=> <TextField label='Nombre' {...field}/>}
      />
      <Controller 
        name={'description'} 
        control={control}
        rules={{ required: true }}
        render={({field})=> <TextField label='Descripción' {...field}/>}
      />

      <Controller 
        name={'price'}
        control={control}
        render={({ field })=> <TextField  
          label='Precio' 
          InputProps={{
            startAdornment: <InputAdornment position="start" >S/.</InputAdornment>
          }}
          {...field}
        />}
      />

      <Controller 
        name={'priceOffer'}
        control={control}
        render={({ field })=> <TextField
          InputProps={{
            startAdornment: <InputAdornment position="start" >S/.</InputAdornment>
          }}
          label='Precio Oferta'
          {...field}
        /> }
      />
    </Box>
  )
}
