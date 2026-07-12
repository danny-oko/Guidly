import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import {
  getTiptapManagementApiSecret,
  getTiptapServerSecret,
} from '@/lib/tiptap/server-config';

const MOCK_USER_IDS = [
  'user-alex-morgan',
  'user-jordan-lee',
  'user-sam-patel',
  'user-riley-chen',
];

function resolveMockUserId(): string {
  const index = Math.floor(Math.random() * MOCK_USER_IDS.length);
  return MOCK_USER_IDS[index];
}

export async function POST(request: NextRequest) {
  try {
    getTiptapManagementApiSecret();

    const body = (await request.json()) as { roomName?: string };
    const roomName = body.roomName?.trim();

    if (!roomName) {
      return NextResponse.json(
        { error: 'roomName is required' },
        { status: 400 },
      );
    }

    const secret = getTiptapServerSecret();
    const userId = resolveMockUserId();

    const token = jwt.sign(
      {
        userId,
        scopes: [roomName],
      },
      secret,
      {
        expiresIn: '8h',
      },
    );

    return NextResponse.json({ token });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unable to sign collaboration token';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
