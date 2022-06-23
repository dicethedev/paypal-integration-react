import { useRef, useEffect} from 'react'

export default function Paypal() {

     const paypal = useRef()

     useEffect(() => {
        window.paypal.Buttons({
             createOrder: (data, actions, err) => {
               return actions.order.create({
                    //creating start here
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                         description: "Beautiful looking T-shirt",
                         amount: {
                              currency_code: "CAD",
                              value: 400.00
                         },
                    },
                  ], 
               })
                //creating ends here
             },
             onApproved: async (data, actions) => {
                 const order = await actions.order.capture()
                 console.log(order)
             },
             onError: (err) => {
               console.log(err)
             }
        }).render(paypal.current)
     }, [])

     return (
          <div>
               <div ref={paypal}></div>
          </div>
     )
}