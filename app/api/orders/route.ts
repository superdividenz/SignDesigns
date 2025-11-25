import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { Order } from '../../../lib/types';

export async function POST(request: NextRequest) {
  try {
    const { userId, items, total, stripeSessionId } = await request.json();

    // Create new order in Supabase
    const { data: newOrder, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        items,
        total,
        status: 'pending',
        stripe_session_id: stripeSessionId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving order:', error);
      return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }

    return NextResponse.json({ orderId: newOrder.id });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    // If userId is provided, filter by user (for user dashboard)
    if (userId) {
      query = query.eq('user_id', userId);
    }
    // If no userId, return all orders (for admin dashboard)

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}