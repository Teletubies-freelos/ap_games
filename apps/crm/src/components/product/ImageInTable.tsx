import { ReactNode } from 'react';

interface ImageInTableProps{
    renderedCellValue:ReactNode
}

const ImageInTable = ({renderedCellValue}:ImageInTableProps)=>{
    return renderedCellValue ? <img style={{height:"80px", width:'80px'}} src={renderedCellValue as string}  /> : 'No'
}
export default ImageInTable