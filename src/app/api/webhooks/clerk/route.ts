import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { UserService } from '@/lib/userService';

export async function POST(req: NextRequest) {
  try {
    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // Basic header validation
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.log('Missing webhook headers');
      
return new Response('Error occurred -- no svix headers', {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    
    // For now, we'll skip signature verification and just process the webhook
    // TODO: Add proper signature verification with svix package
    console.log('Received webhook:', payload.type);

    // Handle the webhook
    const eventType = payload.type;
    
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(payload.data);
        break;
      case 'user.updated':
        await handleUserUpdated(payload.data);
        break;
      case 'user.deleted':
        await handleUserDeleted(payload.data);
        break;
      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    
return new Response('Error processing webhook', { status: 500 });
  }
}

async function handleUserCreated(userData: any) {
  console.log('Creating user in database:', userData.id);
  
  const email = userData.email_addresses?.[0]?.email_address || '';
  const firstName = userData.first_name || '';
  const lastName = userData.last_name || '';
  
  await UserService.getOrCreateUser(userData.id, email, firstName, lastName);
}

async function handleUserUpdated(userData: any) {
  console.log('Updating user in database:', userData.id);
  
  const email = userData.email_addresses?.[0]?.email_address || '';
  const firstName = userData.first_name || '';
  const lastName = userData.last_name || '';
  
  // This will update if exists or create if doesn't exist
  await UserService.getOrCreateUser(userData.id, email, firstName, lastName);
}

async function handleUserDeleted(userData: any) {
  console.log('User deleted from Clerk:', userData.id);
  // Optionally handle user deletion in your database
  // For now, we'll keep the user data for analytics purposes
}