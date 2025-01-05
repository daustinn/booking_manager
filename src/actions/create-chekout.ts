'use server'

import { stripe } from '@/config/stripe'
import { Room } from '@/types/room'

export type State = {
  orderNumber: string
  checkIn: Date
  checkOut: Date
  room: Room
  clerkUserId: string
  customerName: string
  customerEmail: string
  customerPhotoURL: string
}

export type Metadata = {
  orderNumber: string
  clerkUserId: string
  roomId: string
  checkIn: string
  checkOut: string
  customerName: string
  customerEmail: string
  customerPhotoURL: string
}

export async function createCheckoutSession(data: State): Promise<string> {
  try {
    // Search for the customer by email
    const customers = await stripe.customers.list({
      email: data.customerEmail,
      limit: 1
    })

    let customerId: string | undefined

    // If the customer exists, use their ID
    if (customers.data.length > 0) {
      customerId = customers.data[0].id
    }

    // If the customer doesn't exist, create a new one
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : 'always',
      customer_email: !customerId ? data.customerEmail : undefined,
      metadata: {
        orderNumber: data.orderNumber,
        clerkUserId: data.clerkUserId,
        roomId: data.room._id,
        checkIn: data.checkIn.toISOString(),
        checkOut: data.checkOut.toISOString(),
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhotoURL: data.customerPhotoURL
      },
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&order_number=${data.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      line_items: [
        {
          price_data: {
            currency: 'pen',
            unit_amount: data.room.type!.price * 100,
            product_data: {
              name: data.room.name,
              description: data.room.description,
              images: [data.room.image]
            }
          },
          quantity: 1
        }
      ]
    })

    // If the session doesn't have a URL, throw an error
    if (!session.url) {
      throw new Error('No session URL returned')
    }

    // Return the URL
    return session.url
  } catch (error) {
    console.error('Error creating checkout session', error)
    throw error
  }
}
