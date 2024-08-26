-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "birthday" DATE NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);
