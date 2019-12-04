import { Socket } from 'socket.io';


export const desconectar = ( cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

// Escuchar Mensajes
// export const mensaje = ( cliente: Socket ) => {
//     console.log('ESCUCHANDO MENSAJE');
//     cliente.on('mensaje', (payload: {de: string, cuerpo: string}) => {
//         console.log(payload, 'payload escuchando mensaje');
//     });
// }

export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {

    cliente.on('mensaje', (  payload: { de: string, cuerpo: string }  ) => {

        console.log('Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload);

    });

}
