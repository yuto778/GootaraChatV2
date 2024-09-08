-- Enable the uuid-ossp extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create User table
CREATE TABLE "User" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  find_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  avatar TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Friends table
CREATE TABLE "Friends" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "friendId" UUID NOT NULL,
  request BOOLEAN,
  FOREIGN KEY ("userId") REFERENCES "User"(id),
  FOREIGN KEY ("friendId") REFERENCES "User"(id)
);

-- Create ChatRoom table
CREATE TABLE "ChatRoom" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  "icon" TEXT,
  type TEXT NOT NULL CHECK (type IN ('direct', 'group')),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ChatRoomMember" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "chatroomId" UUID NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "User"(id),
  FOREIGN KEY ("chatroomId") REFERENCES "ChatRoom"(id)
);

-- Create Message table
CREATE TABLE "Message" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "userId" UUID NOT NULL,
  "roomId" UUID NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "User"(id),
  FOREIGN KEY ("roomId") REFERENCES "ChatRoom"(id)
);

-- Create ReadStatus table
CREATE TABLE "ReadStatus" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  "messageId" UUID NOT NULL,
  "readAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("userId", "messageId"),
  FOREIGN KEY ("userId") REFERENCES "User"(id),
  FOREIGN KEY ("messageId") REFERENCES "Message"(id)
);

-- Create Reaction table
CREATE TABLE "Reaction" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  emoji TEXT NOT NULL,
  "userId" UUID NOT NULL,
  "messageId" UUID NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("userId", "messageId", emoji),
  FOREIGN KEY ("userId") REFERENCES "User"(id),
  FOREIGN KEY ("messageId") REFERENCES "Message"(id)
);

-- Create TemplateMessage table
CREATE TABLE "TemplateMessage" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "userId" UUID NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  FOREIGN KEY ("userId") REFERENCES "User"(id)
);



INSERT INTO storage.buckets (id, name, public)
VALUES ('avatar', 'avatar', true);


CREATE POLICY "Allow authenticated access to avatar bucket" ON storage.objects
FOR ALL TO authenticated
USING (bucket_id = 'avatar');