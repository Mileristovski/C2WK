/* eslint-disable no-underscore-dangle */
import {
    Component, OnInit, OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
    catchPhrase: string = '';

    subscription:Subscription = new Subscription();

    priceRange:number = 50000;

    maxPriceRange:number = 50000;

    searchString:string = '';

    productList:Product[] = [];

    resultList:Product[] = [];

    images: any = {};

    constructor(
        private product_service: ProductsService,
    ) { }

    ngOnInit(): void {
        this.setRandomCatchPhrase();
        this.product_service.getAllProducts()
            .subscribe((response:Product[]) => {
                this.productList = response;
                this.resultList = this.productList;
                this.sortByAscendingPrice();
                this.maxPriceRange = Number(this.getMaxPrice().toPrecision(1));
                this.priceRange = this.maxPriceRange;
                this.setImages();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    setRandomCatchPhrase() {
        const randomNumber = Math.floor(Math.random() * 10);
        const randomCatchPhrases:string[] = ['What color is your Bugatti? 😎', 'When Lambo? How about now? 🚀', 'Drive it like you stole it 🚨', 'Just pick one, they all make the same sound 🔔', 'Harder, Better, Fastest, Stronger 🏎️', 'Do you feel the need? 🚦', 'You can\'t handle the thrust 🏁', 'There\'s no place like home, but a McLaren comes close 🏠'];
        const randomIndex = randomNumber % randomCatchPhrases.length;
        this.catchPhrase = randomCatchPhrases[randomIndex];
    }

    setImages() {
        for (const product of this.productList) {
            const index = (parseInt(product._id, 16) % 25) + 1;
            const image = `voiture (${index}).jpg`;
            this.images[product._id] = image;
        }
    }

    getMaxPrice(): number {
        let maxPrice = 0;
        for (let i = 0; i < this.productList.length; i += 1) {
            if (this.productList[i].price > maxPrice) {
                maxPrice = this.productList[i].price;
            }
        }
        return maxPrice / 100;
    }

    sortByAscendingPrice():void {
        this.resultList.sort((a, b) => a.price - b.price);
    }

    sortByDescendingPrice() {
        this.resultList.sort((a, b) => b.price - a.price);
    }

    updateResult() {
        this.resultList = this.productList.filter((product) => {
            const name = product.name.toLowerCase();
            const description = product.description.toLowerCase();
            const search = this.searchString.toLowerCase();
            return (name.includes(search) || description.includes(search))
            && product.price / 100 <= this.priceRange;
        });
    }
}