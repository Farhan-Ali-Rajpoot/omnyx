import React from 'react';
import ProductCard from '@/components/UI/ProductCard';
import wireLessMouse from '@/data/product-card-data/wireless-mouse.json';
import wirelessAirHumidifier from '@/data/product-card-data/wireless-air-humidifier.json';
import wirelessTwsEarbuds from '@/data/product-card-data/wireless-tws-earbuds.json';


const Products = () => {

    const products = [wireLessMouse, wirelessAirHumidifier, wirelessTwsEarbuds,];

    return (
        <>
            <div className="flex flex-col my-20">
                <div className="max-w-2xl">
                    <h1 className="text-6xl font-bold text-gray-900 leading-tighter">
                        Discover Products That Make Life Better
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                        Handpicked top-value items from trusted brands. Shop smarter with quality you can count on.
                    </p>
                </div>


                <div className="flex flex-wrap gap-6 w-full mt-14">
                    {
                        products.map((obj, i) => {
                            return (
                                <ProductCard
                                    key={i}
                                    href={obj.href}
                                    discount={obj.discount}
                                    image={obj.image}
                                    name={obj.name}
                                    price={obj.price}
                                    rating={obj.rating}
                                    shipping={obj.shipping}
                                    sold={obj.sold}
                                    total-price={obj['total-price']}
                                />
                            )
                        })
                    }
                </div>
            </div>


        </>
    )
}

export default Products
