-- CreateTable
CREATE TABLE "Employees" (
    "employeeid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "forename" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" INTEGER NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shifts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "employeeid" INTEGER NOT NULL,
    CONSTRAINT "Shifts_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "Employees" ("employeeid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_password_key" ON "Employees"("password");
