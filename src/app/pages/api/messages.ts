// src/pages/api/messages.ts
import { NextApiRequest, NextApiResponse } from 'next';

let messages = [
  { sender: 'user', message: 'Hello!', timestamp: '2024-11-14 10:00 AM' },
  { sender: 'other', message: 'Hi there!', timestamp: '2024-11-14 10:01 AM' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const { sender, message, timestamp } = req.body;
    messages.push({ sender, message, timestamp });
    res.status(201).json({ message: 'Message sent' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
