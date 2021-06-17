class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        this.items = items;
    }
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (
                this.items[i].name !== "Aged Brie" &&
                this.items[i].name !== "Backstage passes to a TAFKAL80ETC concert"
            ) {
                // On diminue la qualité de tous les produits sauf "Aged Brie", "Backstage passes to a TAFKAL80ETC concert" et "Sulfuras, Hand of Ragnaros"
                if (this.items[i].quality > 0) {
                    if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
                        this.items[i].quality = this.items[i].quality - 1;
                    }
                    // Les objets "Conjured" se dégradent 2 fois plus vite que les objets normaux
                    if (this.items[i].name === "Conjured Mana Cake" && this.items[i].quality > 0) {
                        this.items[i].quality = this.items[i].quality - 1;
                    }
                }
            } else {
                // Dans une limite de 50, on augmente de 1 "Aged Brie" 
                // et de 2 "Backstage passes to a TAFKAL80ETC concert" quand il reste 10 jours ou moins, puis de 3 quand il reste 2 jours ou moin
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1;
                    if (
                        this.items[i].name === "Backstage passes to a TAFKAL80ETC concert"
                    ) {
                        if (this.items[i].sellIn < 11 && this.items[i].quality < 50) {
                            this.items[i].quality = this.items[i].quality + 1;
                        }
                        if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
                            this.items[i].quality = this.items[i].quality + 1;
                        }
                    }
                }
            }

            // On diminue de 1 le nombre de jours restant pour tous les objets autres que "Sulfuras, Hand of Ragnaros" 
            if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }

            // Date de péremption dépassée
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name !== "Aged Brie") {
                    if (
                        this.items[i].name !== "Backstage passes to a TAFKAL80ETC concert"
                    ) {
                        if (this.items[i].quality > 0 && this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
                            this.items[i].quality = this.items[i].quality - 1;
                        }
                    } else {
                        // Après la date de péremption, la qualité de "Backstage passes to a TAFKAL80ETC concert" tombe à 0
                        this.items[i].quality = this.items[i].quality - this.items[i].quality;
                    }
                } else {
                    // "Aged Brie" augmente sa qualité plus le temps passe, dans une limite de 50
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1;
                    }
                }
            }
        }

        return this.items;
    }
}

module.exports = {
    Item,
    Shop
};
