import { Metadata } from '@/actions/create-chekout'
import { connectToMongoDB, getCollection } from '@/config/mongodb'
import { stripe } from '@/config/stripe'
import { ObjectId } from 'mongodb'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  // Get the body
  const body = await req.text()

  // Get the headers
  const headersList = await headers()

  // Get the signature from the headers
  const sig = headersList.get('stripe-signature')

  // Verify the event by passing the secret
  if (!sig) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Get the webhook secret
  const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET

  // Check if the webhook secret is set
  if (!webHookSecret) {
    console.error('⚠️ Stripe webhook secret is not set.')
    return NextResponse.json({ error: 'Invalid secret' }, { status: 400 })
  }

  let event: Stripe.Event

  // Verify the event
  try {
    // Construct the event
    event = stripe.webhooks.constructEvent(body, sig, webHookSecret)
  } catch (error) {
    console.error('⚠️ Error verifying webhook signature :', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    // Get the session
    const session = event.data.object as Stripe.Checkout.Session
    try {
      // Create an order in Sanity
      await createBooking(session)
    } catch (error) {
      console.error('⚠️ Error creating order:', error)
      return NextResponse.json(
        { error: 'Error creating order' },
        { status: 500 }
      )
    }
  }
  return NextResponse.json({ received: true })
}

async function createBooking(session: Stripe.Checkout.Session) {
  const { id, metadata, payment_intent } = session

  const {
    clerkUserId,
    orderNumber,
    checkIn,
    checkOut,
    roomId,
    customerEmail,
    customerName,
    customerPhotoURL
  } = metadata as Metadata

  await connectToMongoDB()
  const collection = getCollection('bookings')

  const newBooking = await collection.insertOne({
    roomId: new ObjectId(roomId),
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    clerkUserId,
    checkIn: new Date(checkIn),
    bookingNumber: orderNumber,
    checkOut: new Date(checkOut),
    customerEmail,
    customerName,
    customerPhotoURL,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  return newBooking
}
