-- CreateTable
CREATE TABLE "categories" (
    "label" VARCHAR(40) NOT NULL,
    "ticker" BOOLEAN NOT NULL DEFAULT false,
    "emoji" VARCHAR(3),
    "quote" DECIMAL(9,2),

    PRIMARY KEY ("label")
);

-- CreateTable
CREATE TABLE "_ArticleToCategory" (
    "A" INTEGER NOT NULL,
    "B" VARCHAR(40) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToCategory_AB_unique" ON "_ArticleToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToCategory_B_index" ON "_ArticleToCategory"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD FOREIGN KEY ("B") REFERENCES "categories"("label") ON DELETE CASCADE ON UPDATE CASCADE;
