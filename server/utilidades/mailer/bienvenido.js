const bienvenido = () => {
    return `
    <!DOCTYPE html>
    <html style="margin: 0; padding: 0;">
    
        <head>
            <title>One | Email template!</title>
        </head>
    
        <body style="margin: 0; padding: 0;">
            <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
                <tr>
                    <td style="background-color: #999592; margin: 0 auto;">
                        <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">¡Bievenido a Redemplear!</h1></td>
                </tr>
                <tr>
                    <td style="margin: 0 auto;">
                        <a href="/" style="box-sizing: border-box; color: #999592 !important; font-family: Arial, Helvetica, sans-serif; line-height: 1.4; margin: 0; text-decoration: none;"><img class="full-width" src="https://jornadasreasaragon.com/reasaragon/wp-content/uploads/sites/2/2019/02/semana-del-empleo-utebo-1.png" style="vertical-align: sub; width: 100%;"></a>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #999592; margin: 0 auto;">
                        <p style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;font-size:10px">
                                Deseamos que puedas encontrar o contratar trabajo. Ingresa a tu cuenta <a href="https://redemplear.herokuapp.com/perfil">aquí</a> y observa las oportunidades que te ofrece nuestro sitio.
                        </p></td>
                </tr>
            </table>
        </body>
    
    </html>
    `;
}

module.exports = { bienvenido }