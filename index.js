const express = require('express')
const port = 3004
const app = express();

app.use(express.json());

app.listen(3004, () =>
    console.log('Servidor iniciado na porta 3004')
);

var mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken("");//TOKEN DO MERCADO PAGO

app.get('/gerarpix/:valor', (req, res) => {
    const {valor} = req.params   ;

    var payment_data = {
        transaction_amount:  parseFloat(valor),
        description: 'Descrição',
        payment_method_id: 'pix',
        payer: {
            email: 'arielmota1997@gmail.com',
            first_name: 'Ariel',
            last_name: 'Oliveira da Mota',
            identification: {
                type: 'CPF',
                number: '05743045178'
            },
            address: {
                zip_code: '76200000',
                street_name: 'Rua mauá Q8 Lt29',
                street_number: '0',
                neighborhood: 'Aguas Claras',
                city: 'Iporá',
                federal_unit: 'GO'
            }
        }
    };

    mercadopago.payment.create(payment_data).then(function (data) {

        //console.log(data['response']['id'])
        return res.json({id:data['response']['id'], qr_code_base64: data['response']['point_of_interaction']['transaction_data']['qr_code_base64'],status:data['response']['status'],transaction_amount:data['response']['transaction_amount'] })


    }).catch(function (error) {
        console.log(error)


    })

}

);


app.get('/verificarstatuspix/:id', (req,res)=>{
    const {id} = req.params   ;
    

    mercadopago.payment.findById(id).then(function(data){
        console.log(data['response'])
        return res.json({id:data['response']['id'], qr_code_base64: data['response']['point_of_interaction']['transaction_data']['qr_code_base64'],status:data['response']['status'],transaction_amount:data['response']['transaction_amount']  });


    }).catch(function (error) {
        console.log(error)


    })



});

