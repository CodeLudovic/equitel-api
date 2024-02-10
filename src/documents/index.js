/* prettier-ignore */

const pdfTemplate = (data, totalSales) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                }
                /* Resto de estilos */
            </style>
        </head>
        <body>

        <h1 style="text-align: center;"> Reporte de Ventas Diaria</h1>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">
                <tbody>
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 4px 5px;">ID</th>
                        <th style="padding: 4px 5px;">Producto</th>
                        <th style="padding: 4px 5px;">Cantidad</th>
                        <th style="padding: 4px 5px;">Valor Unitario</th>
                        <th style="padding: 4px 5px;">Valor Monto</th>
                    </tr>
                    ${data?.map((sale, index) => (
                        `<tr key=${index}>
                            <td style="border: 1px solid #ddd; padding: 4px 5px; font-size: 12px">${sale?.id}</td>
                            <td style="border: 1px solid #ddd; padding: 4px 5px; font-size: 12px">${sale?.producto}</td>
                            <td style="border: 1px solid #ddd; padding: 4px 5px;font-size: 13px">${sale?.cantidad}</td>
                            <td style="border: 1px solid #ddd; padding: 4px 5px;font-size: 13px">$ ${sale?.precio_unidad}</td>
                            <td style="border: 1px solid #ddd; padding: 4px 5px;font-size: 13px">$ ${sale?.precio_unidad * sale?.cantidad}</td>
                        </tr>`
                    )).join('')}
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 4px 5px;">Total Ventas:</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>$ ${totalSales}</th>
                    </tr>
                </tbody>
            </table>
        </body>
        </html>
    `;
};

module.exports = { pdfTemplate };
