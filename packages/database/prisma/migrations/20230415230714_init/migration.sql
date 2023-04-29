-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
