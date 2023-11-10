import { IProduct } from "../hooks/useConfirmRequest";
import { UserInfo } from "../services/SessionStorage"

export function getWhatsappNumber(phoneNumber: Number): String {
    return `whatsapp:+51${phoneNumber}`
}

export function getWhatsappMessage(userInfo: UserInfo, products: IProduct[]): String {
    const numProductos = products.reduce(
        (total, product) => total + product.quantity,
        0
    );
    
    const precioTotal = products.reduce(
        (total, product) => total + (product.price * product.quantity),
        0
    );

    const mensaje = `
        Hola, se ha generado un pedido por *${userInfo?.client_name}* con el número ${userInfo?.phone},
        Correo: ${userInfo?.email}
        Tipo de Pedido: ${userInfo?.address ? "Delivery" : "Recojo en Tienda"}
        
        Detalles de tu pedido:
        - Número de productos: ${numProductos}
        - Precio total: S/. ${precioTotal?.toFixed(2)}
        
        Productos:
        ${products
                .map(
                    (product, index) =>
                        `\n\t${index + 1}. ${product?.name} - S/. ${product?.price?.toFixed(2)}`
                )}
        
        Comentario: ${userInfo?.comment}
        ${
            userInfo.address ?
            `Dirección: ${userInfo.address}
             Referencia: ${userInfo.reference}` : ""
        }
    `;

    return mensaje;
}