-- CreateTable
CREATE TABLE "views" (
    "ip" VARCHAR(15) NOT NULL,
    "articleId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "views.ip_unique" ON "views"("ip");

-- AddForeignKey
ALTER TABLE "views" ADD FOREIGN KEY ("articleId") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
